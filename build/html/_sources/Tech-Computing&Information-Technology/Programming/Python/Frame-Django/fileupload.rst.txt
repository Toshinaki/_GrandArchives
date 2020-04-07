Django File Upload & Storage
=============================

Upload Basics
-------------

上传
~~~~~~~~~~

- files 作为 form 数据的一部分被上传, 可以使用类字典对象
- 请求必须使用 `POST` 方法提交 `request.FILES`
- form 必须设置 `enctype="multipart/form-data"`, 否则 `request.FILES` 为空
- `request.FILES` 中的 `key` 为 form 中文件所对应的 input 的 `name` 属性

    .. code-block:: html

        <input type="file" name="fieldname">

- `request.FILES` 中的值为 `UploadedFile` 实例

Model
~~~~~

- Django 的 model 中可以使用 `FileField` 和 `ImageField` 字段来处理文件上传
- 通过上述字段上传的文件不会被保存到数据库中, 而是会保存到文件系统 (filesystem) 中
- `FileField` 和 `ImageField` 在数据库中会被创建为字符串字段 (通常是 `VARCHAR`), 并保存了实际文件的引用
- 删除包含 `FileField` 和 `ImageField` 的 model 实例时, 实际文件并不会被删除

`settings.py` 设置
~~~~~~~~~~~~~~~~~~~~~~~

当使用本地测试服务器时, 可以通过设定 `MEDIA_ROOT` 和 `MEDIA_URL` 来指定上传文件的本地存储位置和访问路径

.. code-block:: python

    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    MEDIA_URL= '/media/'

之后将 MEDIA_URL 添加到全局 URL 设置中即可访问上传后的本地文件:

.. code-block:: python

    from django.conf import settings
    from django.conf.urls.static import static

    urlpatterns = [
        # Project url patterns...
    ] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

若需要在 template 中使用 `MEDIA_URL`, 则需要在 `settings.py` 中添加:

.. code-block:: python

    context_processors = [
        ...
        'django.template.context_processors.media', # set this explicitly
    ]

上传方法
---------

使用 `FileSystemStorage`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- `template/upload.html`
    .. code-block:: html

        {% extends 'base.html' %}
        {% load static %}
        {% block content %}
          <form method="post" enctype="multipart/form-data">
            {% csrf_token %}
            <input type="file" name="myfile">
            <button type="submit">Upload</button>
          </form>
          {% if uploaded_file_url %}
            <p>File uploaded at: <a href="{{ uploaded_file_url }}">{{ uploaded_file_url }}</a></p>
          {% endif %}
          <p><a href="{% url 'home' %}">Return to home</a></p>
        {% endblock %}
- `views.py`
    .. code-block:: python

        from django.shortcuts import render
        from django.conf import settings
        from django.core.files.storage import FileSystemStorage

        def upload(request):
            if request.method == 'POST' and request.FILES['myfile']:
                myfile = request.FILES['myfile']
                fs = FileSystemStorage()
                filename = fs.save(myfile.name, myfile)
                uploaded_file_url = fs.url(filename)
                return render(request, 'template/upload.html', {
                    'uploaded_file_url': uploaded_file_url
                })
            return render(request, 'template/upload.html')

使用 Model Form
~~~~~~~~~~~~~~~~

- `models.py`
    .. code-block:: python

        from django.db import models

        class File(models.Model):
            name = models.CharField(max_length=255)
            file = models.FileField(upload_to='files/')

- `forms.py`
    .. code-block:: python

        from django import forms
        from models import File

        class FileForm(forms.ModelForm):
            class Meta:
                model = File
                fields = ('name', 'file')

- `views.py`
    .. code-block:: python

        def model_form_upload(request):
            if request.method == 'POST':
                form = FileForm(request.POST, request.FILES)
                if form.is_valid():
                    form.save()
                    return redirect('home')
            else:
                form = FileForm()
            return render(request, 'template/model_form_upload.html', {
                'form': form
            })

- `template/model_form_upload.html`
    .. code-block:: html

        {% extends 'base.html' %}
        {% block content %}
          <form method="post" enctype="multipart/form-data">
            {% csrf_token %}
            {{ form.as_p }}
            <button type="submit">Upload</button>
          </form>
          <p><a href="{% url 'home' %}">Return to home</a></p>
        {% endblock %}

`FileField` 的 `upload_to` 参数
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

此属性可用于设置上传文件夹和文件名, 其值被传递至 `Storage.save()` 方法

有两种设置方式:

1. 指定路径的字符串值或 `Path` 对象, 可包含能被日期时间替换的 `strftime()` 格式

    - 上述例子中 `file = models.FileField(upload_to='files/')`, 上传的文件会被保存在 `MEDIA_ROOT/files/` 文件夹下
    - 若设置为 `file = models.FileField(upload_to='files/%Y/%m/%d/')`, 则文件会被保存至当前日期的文件夹内

2. 返回保存路径的可调用对象; 需要接收 2 个参数 (instance: 包含当前文件的 model 实例; filename: 初始文件名) 并返回 Unix-style 的路径

    如:

    .. code-block:: python

        def user_directory_path(instance, filename):
            # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
            return 'user_{0}/{1}'.format(instance.user.id, filename)

        class MyModel(models.Model):
            upload = models.FileField(upload_to=user_directory_path)

使用 REST API
~~~~~~~~~~~~~~~~

.. code-block:: javascript

    let formData = new FormData(form);
    formData.append('file', 'filename', file);
    api.post(url, formData);


存储方法
----------

使用 `django-storage`
~~~~~~~~~~~~~~~~~~~~~~

Google Cloud Storage
^^^^^^^^^^^^^^^^^^^^
1. 安装: `pip install django-storages[google]`
2. 认证 authentication (GAE 环境中不需要认证)

    有 2 种认证方式:

    - 指定证书文件

        1. 创建一个 service account. (Google Getting Started Guide)
        2. 创建 key, 下载 *project-name-key.json* 文件
        3. 确保 service account 有适当的权限并能够访问 bucket
        4. key 需要挂载到 django app 上 (json keyfile 将用于所有不处于 Google 基础架构内的开发/测试等环境)
        5. 设置环境变量 `GOOGLE_APPLICATION_CREDENTIALS` 指向 json 文件

    - 在 `settings.py` 中设置 `GS_CREDENTIALS` 指向认证文件

        .. code-block:: python

            from google.oauth2 import service_account

            GS_CREDENTIALS = service_account.Credentials.from_service_account_file('path/to/credentials.json')
3. 使用

    设置 `settings.py`:

    .. code:: python

        DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
        GS_BUCKET_NAME = 'BUCKET-NAME'

    这样 django 的默认存储就被设置为 Google Cloud Storage, 任何 `FileField` 和 `ImageField` 的文件都会被上传至指定 bucket