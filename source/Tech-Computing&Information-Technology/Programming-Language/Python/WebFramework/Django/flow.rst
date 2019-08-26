
Django project 创建步骤
==========================

1. 安装

    .. code-block:: console

        $ pip install django

2. 创建 project

    .. code-block:: console

        $ django-admin startproject <project_name> <project_base_dir>

    在指定的文件夹 `project_base_dir` 下创建 project_name

    .. code-block:: console

        project_base_dir
          └─ project_name
            └─ __init__.py
            └─ settings.py
            └─ urls.py
            └─ wsgi.py
          └─ manage.py

    - project_base_dir
        项目容器, 可指定任意目录; 未指定时使用 project_name 为文件夹名
    - project_name
        项目管理目录, 与项目容器同时生成; 用于存放项目的各种配置文件
    - manage.py
        当前项目的命令行工具

         app创建, 数据库迁移等操作都由此工具完成
    - settings.py
        当前项目的配置文件

        定义了路径, 应用, 模板, 缓存, 数据库, 时区, 语言等
    - urls.py
        URL 路径映射配置; 在这里配置 URL 正则, 将 URL 请求分发到 Views

        默认只有 `/admin` 的路由
    - wsgi.py
        Python Web Server Gateway Interface, 服务器部署相关的配置; 定义了 WSGI 接口信息

3. 配置数据库

    启动 app之前需要在 `settings.py` 中配置数据库

    1. 指定数据库地址

        .. code-block:: python

            # settings.py
            DATABASES = {
                'default': {
                    'ENGINE': 'django.db.backends.mysql',
                    'NAME': 'dbname',
                    'USER': 'admin',
                    'PASSWORD': 'admin',
                    'HOST': 'url.to.db',
                    'PORT': 'xxxx',
                    'OPTIONS': {
                        ...
                    },
                }
            }

    2. 安装对应的驱动

        .. code-block:: console

            $ pip install mysqlclient

4. 创建 app

    1. 创建
        .. code-block:: console


            $ python manage.py startapp appname

        在当前文件夹下创建 app

        .. code-block:: console

            project_base_dir
              └─ project_name
                ...
              └─ appname
                └─ migrations
                  └─ __init__.py
                └─ __init__.py
                └─ admin.py
                └─ apps.py
                └─ models.py
                └─ tests.py
                └─ views.py
              └─ manage.py

        - admin.py
            管理站点模型的声明文件; 将 blog 数据模型注册到 Django 后台数据管理
        - apps.py
             app 的信息定义文件
        - models.py
            数据库模型层 Model 类定义; 定义 blog 的数据模型, 构建 blog 应用相关数据表结构
        - tests.py
            自动化测试文件
        - views.py
            URL 响应函数定义
        - migrations
            数据迁移文件生成目录

    2. 注册 app

        为了在后台管理 admin 中反应 app, 或迁移 (migrate) 数据, 需要在 `project_base_dir/project_name/settings.py` 中注册新建的 app

        .. code-block:: python

            INSTALLED_APPS = [
                ...,
                'appname',
            ]

5. 迁移数据库

    1. 生成迁移文件
        .. code-block:: console

            $ python manage.py makemigrations

        在 `appname/migrations` 下生成迁移文件

    2. 执行迁移, 生成数据库表
        .. code-block:: console

            $ python manage.py migrate

6. 创建后台管理用的 superuser

    .. code-block:: console

        $ python manage.py createsuperuser

7. 启动测试服务器

    .. code-block:: console

        $ python manage.py runserver [port]

    默认在 127.0.0.1:8000 启动

8. 设置模板路径

    1. 在根目录 `project_base_dir` 下创建模板文件夹
        .. code-block:: console

            project_base_dir
              └─ project_name
                └─ ...
              └─ templates
                └─ ...
              └─ appname
                └─ ...
              └─ manage.py


    2. 在 `settings.py` 中设置模板路径

        .. code-block:: python

            TEMPLATES = [
                {
                    'BACKEND': 'django.template.backends.django.DjangoTemplates',
                    'DIRS': [path/to/template, ...],
                    ...
                }
            ]

9. 设置静态文件路径

    1. 在根目录 `project_base_dir` 下创建静态文件夹
        .. code-block:: console

            project_base_dir
              └─ project_name
                └─ ...
              └─ static
                └─ ...
              └─ templates
                └─ ...
              └─ appname
                └─ ...
              └─ manage.py


    2. 在 `settings.py` 中设置静态文件路径

        .. code-block:: python

            # 静态文件夹的别名
            STATIC_URL = '/static/'

            ...

            # 所有的静态文件夹都可以通过别名找到
            STATICFILES_DIRS = [
                os.path.join(BASE_DIR, 'static'),
                os.path.join(BASE_DIR, 'static2'),
                ...
            ]
