
ORM
======

Why:

1. 不需要写 SQL 语句, 数据库操作更加简单
2. 开发效率高
3. 同样的代码可以操作不同类型的数据库

How:

1. 创建数据库
2. 在 `settings.py` 中配置数据库信息
3. 使用第三方 libraries 连接数据库
4. 在 app 下的 `models.py` 中创建数据库对象

Model
--------

模型准确且唯一的描述了数据, 包含了储存的重要字段和行为; 每一个模型都映射一张数据库表

- 每个模型都是一个 Python 的类, 这些类继承 `django.db.models.Model`

- 模型类的每个属性都相当于一个数据库的字段

- 利用这些, Django 提供了一个自动生成访问数据库的 API

定义模型
~~~~~~~~~~~~~

.. code-block:: python

    from django.db import models

    class Person(models.Model):
        first_name = models.CharField(max_length=30)
        last_name = models.CharField(max_length=30)


模型的定义会被转换为 SQL 语句:

.. code-block:: sql

    CREATE TABLE myapp_person (
        "id" serial NOT NULL PRIMARY KEY,
        "first_name" varchar(30) NOT NULL,
        "last_name" varchar(30) NOT NULL
    );

- 表名根据 app 自动创建
- 主键的 id 字段会被自动添加
- SQL 语句由 `settings.py` 中配置的数据库后端决定

使用模型
~~~~~~~~~~~~

模型定义后需要注册才能被使用

1. 在 `settings.py` 中注册模型所在的 app

    .. code-block:: python

        INSTALLED_APPS = [
            #...
            'myapp',
            #...
        ]

2. 迁移并同步数据库

    .. code-block:: console

        $ python manage.py makemigrations
        $ python manage.py migrate

Field
---------

模型中每一个字段都应该是某个 Field 类的实例, 这些字段能够:

1. 指定数据库数据类型
2. 在渲染表单字段时使用默认的 HTML 视图

通用字段参数
~~~~~~~~~~~~~~~

- `help_text`:
    Provides a text label for HTML forms (e.g. in the admin site), as described above.
- `verbose_name`:
    A human-readable name for the field used in field labels. If not specified, Django will infer the default verbose name from the field name.
- `default`:
    The default value for the field. This can be a value or a callable object, in which case the object will be called every time a new record is created.
- `null`:
    If True, Django will store blank values as NULL in the database for fields where this is appropriate (a CharField will instead store an empty string). The default is False.
- `blank`:
    If True, the field is allowed to be blank in your forms. The default is False, which means that Django's form validation will force you to enter a value. This is often used with null=True , because if you're going to allow blank values, you also want the database to be able to represent them appropriately.
- `choices`:
    A group of choices for this field. If this is provided, the default corresponding form widget will be a select box with these choices instead of the standard text field.
- `primary_key`:
    If True, sets the current field as the primary key for the model (A primary key is a special database column designated to uniquely identify all the different table records). If no field is specified as the primary key then Django will automatically add a field for this purpose.

字段类型
~~~~~~~~~~~

.. list-table::

    * - `AutoField(**options)`
      - int 自增列; 当 model 中没有自增列时会自动会创建一个列名为 id 的列
    * - `BigAutoField`
      - 64 bit int, 类似 AutoField
    * - `IntegerField(**options)`
      - int
    * - `SmallIntegerField`
      - 较小的整数
    * - `BigIntegerField`
      - 64 bit int, 类似 IntegerField
    * - `PositiveIntegerField(**options)`
      - 非负整数, 类似 IntegerField
    * - `PositiveSmallIntegerField`
      - 较小的非负整数
    * - `DecimalField`
      - 定长小数
    * - `FloatField(max_digits=None, decimal_places=None, **options)`
      - 浮点数

        `max_digits` 包括整数和小数, 不包括符号的总位数

        `decimal_places` 小数位数
    * - `BinaryField`
      - 存储二进制数据; 默认不可修改; 必须有一个参数 maxlength
    * - `BooleanField(**options)`
      - true/false
    * - `NullBooleanField(**options)`
      - null/true/false
    * - `CharField(max_length=None, **options)`
      - 字符串字段, 用于较短的字符串; 必须有一个参数 maxlength
    * - `TextField(**options)`
      - 容量很大的文本字段
    * - `EmailField(max_length=75, **options)`
      - 带有检查Email合法性的 CharField
    * - `URLField(verify_exists=True, max_length=200, **options)`
      - 用于保存 URL 的 CharField; 带有 URL 校验
    * - `DateField(auto_now=False, auto_now_add=False, **options)`
      - 日期字段; 日期格式为 "YYYY-MM-DD"

        `auto_now=False` 指定对象被保存时是否自动更新为当前时间

        `auto_now_add=False` 对象首次被创建时是否自动设置为当前时间
    * - `DateTimeField(auto_now=False, auto_now_add=False, **options)`
      - 日期时间字段; 日期格式为 "YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ]"; 类似于 DateField
    * - `TimeField(auto_now=False, auto_now_add=False, **options)`
      - 时间字段
    * - `DurationField`
      - 时间段字段
    * - `FileField(upload_to=None, max_length=100, **options)`
      - 文件上传字段

        `upload_to`, 用于保存上载文件的本地文件系统路径, 必须包含 `strftime` 格式化字符串

        如 `upload = models.FileField(upload_to='uploads/%Y/%m/%d/')`
    * - `FilePathField(path=None, match=None, recursive=False, max_length=100, **options)`
      - 字符串, Django Admin 以及 ModelForm 中提供读取文件夹下文件的功能
    * - `ImageField(upload_to=None, height_field=None, width_field=None, max_length=100, **options)`
      - 类似FileField, 不过要校验上传对象是否是一个合法图片
    * - `GenericIPAddressField`
      - IPv4/IPv6 地址字符串
    * - `SlugField(max_length=50, **options)`
      - 字符串, Django Admin 以及 ModelForm 中提供验证
    * - `UUIDField`
      - universally unique identifiers 存储字段

关联关系字段
~~~~~~~~~~~~~~~~

- `ForeignKey(to, on_delete, **options)`
    - to
        设置要关联的表
    - to_field
        设置要关联的表的字段
    - related_name
        反向操作时, 使用的字段名, 用于代替原反向查询时的 "表名_set"。

        .. admonition:: 例

            class Classes(models.Model):
                name = models.CharField(max_length=32)

            class Student(models.Model):
                name = models.CharField(max_length=32)
                theclass = models.ForeignKey(to="Classes", related_name="students")
    - related_query_name
        反向查询操作时, 使用的连接前缀, 用于替换表名
    - on_delete
        当删除关联表中的数据时, 当前表与其关联的行的行为

        有效的值有:

        - models.CASCADE 删除关联数据, 与之关联也删除
        - models.DO_NOTHING 删除关联数据, 引发错误IntegrityError
        - models.PROTECT 删除关联数据, 引发错误ProtectedError
        - models.SET_NULL 删除关联数据, 与之关联的值设置为null（前提FK字段需要设置为可空）
        - models.SET_DEFAULT 删除关联数据, 与之关联的值设置为默认值（前提FK字段需要设置默认值）
        - models.SET 删除关联数据,

            1. 与之关联的值设置为指定值, 设置: models.SET(值)
            2. 与之关联的值设置为可执行对象的返回值, 设置: models.SET(可执行对象)

    - db_constraint
        是否在数据库中创建外键约束, 默认为True

- `ManyToManyField(to, **options)`
    用于表示多对多的关联关系, 在数据库中通过第三张表来建立关联关系

    - to
        设置要关联的表
    - related_name
        同ForeignKey字段
    - related_query_name
        同ForeignKey字段
    - symmetrical
        仅用于多对多自关联时, 指定内部是否创建反向操作的字段; 默认为True
    - through
        在使用ManyToManyField字段时, Django将自动生成一张表来管理多对多的关联关系

        也可以手动创建第三张表来管理多对多关系, 此时就需要通过through来指定第三张表的表名
    - through_fields
        设置关联的字段
    - db_table
        默认创建第三张表时, 数据库中表的名称

- `OneToOneField(to, on_delete, parent_link=False, **options)`
    通常一对一字段用来扩展已有字段, 多用在当一张表的不同字段查询频次差距过大的情况下, 将本可以存储在一张表的字段拆开放置在两张表中, 然后将两张表建立一对一的关联关系

    .. admonition:: 例

        class Author(models.Model):
            name = models.CharField(max_length=32)
            info = models.OneToOneField(to='AuthorInfo')


        class AuthorInfo(models.Model):
            phone = models.CharField(max_length=11)
            email = models.EmailField()

    - to
        设置要关联的表

    - to_field
        设置要关联的字段

    - on_delete
        同 ForeignKey 字段

