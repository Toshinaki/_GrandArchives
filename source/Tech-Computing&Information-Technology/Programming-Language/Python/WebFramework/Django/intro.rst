
Django Basics
===============

MVC & MVT
----------

https://www.cnblogs.com/yangmingxianshen/p/8305697.html

DTL 模板语言
---------------

Django Template Language (DTL), Django 默认的模板语言

模板的目的是*可视化*, 将数据按照一定的布局格式输出; 模板不是为了数据处理, 所以一般不会有复杂的处理逻辑

模板的引入实现了业务逻辑和显示格式的分离

语法
~~~~~~

变量
^^^^^^^

- 普通变量
    .. code-block:: html

        {{ name }}

- 对象变量
    使用点号 "." 访问对象属性和方法, 方法不加括号

    .. code-block:: html

        {{ book.id }}

    解析顺序:

    1. 当做一个字典处理
    2. 属性或者方法查询 (方法不用带小括号)
    3. 当做列表或者元组查询, 把 id 当做索引
    4. 在模板中调用方法不能传递参数, 因为模板里面不能写小括号

tag 标签
^^^^^^^^^^^^

- if 标签
    { %if ...%}
        逻辑1
    { %elif ...%}
        逻辑2
    { %else%}
        逻辑3
    { %endif%}

- 相等判断
    x, y可以是变量, 字符串, 整数, 小数; 变量不需要加 `{{}}`

    字符串可以是单/双引号引起的硬编码, 但列表, 字典, 布尔值不能硬编码, 可以使用标签变量赋值

    .. code-block:: html

        {% ifequal x y %}
        {% else %}
        {% endifequal %}

        {% ifnotequal x y %}
        {% else %}
        {% endifnotequal %}

- for 标签
    .. code-block:: html

        { %for ... in ...%}
            循环逻辑
        { %empty%}
            给出的列表为空或列表不存在时, 执行此处
        { %endfor%}

        # 反向迭代
        {% for item in items reversed %}
        {% endfor %}

        # 迭代字典
        {% for k, v in data.items %}
        {% endfor %}

    `for` 标签中自带 `forloop` 对象:

    - `forloop.counter` 从 1 开始计数
    - `forloop.counter0` 从 0 开始计数
    - `forloop.revcounter` 逆向计数, 最后一个数是 1
    - `forloop.revcounter0` 逆向计数, 最后一个数是 0
    - `forloop.first` boolean, 第一次循环时为 True
    - `forloop.last` boolean, 最后一次循环时为 True
    - `forloop.parentloop` 引用父级循环的 forloop 对象

- commnent
    .. code-block:: html

        {# 单行注释 #}

        {% comment %}
            多行注释
        {% endcomment %}

自定义 tag
^^^^^^^^^^^^^

// TODO

filter 过滤器
^^^^^^^^^^^^^^^^

{{ 变量|过滤器 }}

使用管道符号 (|) 来应用过滤器, 通过使用过滤器来改变变量的计算结果

可以在if标签中使用过滤器结合运算符

.. list-table::
    :widths: auto
    :header-rows: 1
    :stub-columns: 1

    * - 过滤器
      - 说明
    * - {{ name|lower }}
      - 全小写
    * - {{ name|upper }}
      - 全大写
    * - {{ name|title }}
      - 首字母大写
    * - {{ users_list|first }}
      - 第一个元素
    * - {{ users_list|last }}
      - 最后一个元素
    * - {{ value|yesno:"True,False,None" }}
      - 判断变量 boolean, 返回对应值; None 可选, 默认返回 False 对应的值
    * - {{ value|add:val }}
      - 加法, 参数是负数则为减法; 若是列表则合并
    * - {{ value|divisibleby:"3" }}
      - boolean, 能否被 3 整除
    * - {{ users_list|join:"," }}
      - 用 "," 连接所有元素
    * - {{ sentence|truncatewords:"5" }}
      - 字符串截断, 以空格区分(所以中文无效); 取前五个单词, 多余的词用 "..." 省略; 数字必须放在双引号内
    * - {{ sentence|slice:"4" }}
      - 字符串切分, 可以用于中文; 多余的词没有任何标识
    * - {{ sentence|addslashes}}
      - 在反斜线, 单引号, 双引号前面加一个斜线, 可用于转义字符串
    * - {{ word_or_list:length }}
      - 返回长度
    * - {{ value|default:"default_value" }}
      - 变量为 False 时使用默认值
    * - {{ value|default_if_none:"default_value" }}
      - 变量为 None 时使用默认值
    * - {{ birthday|data:"F j, y" }}
      - 格式化 date 或 datatime 对象

自定义 filter
^^^^^^^^^^^^^^^^^

自定义的过滤器就是一些有一到两个参数的 Python 函数

如在过滤器 `{{ var|foo:"bar" }}` 中, 变量 `var` 和参数 `bar` 会传递给过滤器 `foo`, 第一个参数是要过滤的对象, 第二个参数才是自定义的参数; 最多只能有两个参数

由于模板语言没有提供异常处理, 任何从过滤器中抛出的异常都将会显示为服务器错误

自定义 filter 有两种方式:

1. 在 app 中新建 `templatetags` 文件夹, 并创建一个单独的 py 文件

    1. 在 app 中新建 `templatetags` 文件夹
    2. 新建 py 文件 (`test.py`)
    3. 定义过滤器函数并用 `@register.filter` 装饰器

        .. code-block:: python

            from django import template
            register = template.Library()

            # filter_name 可以省略, 使用时直接使用函数名
            @register.filter(name='filter_name')
            def custom_filter(value):
                return ...
    4. 使用时在模板中引入定义文件

        .. code-block:: html

            {% load test.py %}
            {{ var | custom_filter }}

2. 单独创建一个 app 用来存放项目中所有的自定义过滤器

    1. 在 app 中新建 `templatetags` 文件夹
    2. 在 `settings.py` 中导入 `templatetags`
    3. 其他同上

模板引用
^^^^^^^^^^^

引用其他模板的全部内容, 常用于页面中多次出现的组件

.. code-block:: html

    {% include url %}

url可以是双引号字符串硬编码, 也可以是变量

模板继承
^^^^^^^^^^^

- 父模板使用 `block` 标签表示可以被子模板修改的块

    {% block block_name %}{% endblock %}

- 子模板在文件第一行使用 `extends` 标签继承父模板, 并同样使用 `block` 标签修改父模板中的同名块

    .. code-block:: html

        {% extends parent_url %}

        {% block block_name %}
            新的内容
        {% endblock %}

- 继承树中的任何模板都能访问上下文中的每一个模板变量

静态文件路径
^^^^^^^^^^^^^^

.. code-block:: html

    {% load static %}

1. 使用内置 `static` 方法拼接静态文件路径
2. 使用内置 `get_static_prefix` 获取静态文件路径别名
3. 多次用到的路径可以使用 `as` 保存至变量

设计理念
~~~~~~~~~~

1. 表现与逻辑分离

    模板系统用于控制表现及与其相关的逻辑, 仅此而已

    超出这一基本目标的功能都不应该支持

2. 避免重复

    大多数动态网站都使用某种全站通用的设计, 例如通用的页头, 页脚, 导航栏, 等等

    Django 模板系统应该为此提供便利的方式, 把这些元素存储在一个位置, 减少重复的代码

    模板继承背后就是这个理念

3. 与 HTML 解耦

    模板系统不应该只能输出 HTML, 还要能够生成其他基于文本的格式 (也就是纯文本)

4. XML 不应该作为模板语言

    如果使用 XML 引擎解析模板, 编辑模板时可能引入大量人为错误, 而且处理模板有很多额外消耗

5. 不要求具备设计能力

    模板系统不应该必须在 WYSIWYG 编辑器 (如 Dreamweaver) 中才能写出; 这样有太多局限, 句法不够灵活

    Django 的目标是让模板编写人员能直接编辑 HTML

6. 透明处理空格

    模板系统不应该特殊处理空格

    模板中的空格就是空格, 要像文本那样显示出来

    不在模板标签中的空格都应该显示

7. 不重造一门编程语言

    模板系统一定不能允许:

    - 为变量赋值
    - 编写高级的逻辑

    也就是不能重造一门编程语言

    模板系统的目标是提供适量的编程功能, 例如分支和循环, 足够做表现相关的判断就行

    Django 模板系统知道模板最常由设计师编写, 而不是程序员, 因此不要求具备 Python 知识

8. 安全保障

    模板系统默认应该禁止包含恶意代码, 例如删除数据库记录的命令

    这是模板系统不允许随意使用Python 代码的另一个原因

9. 可扩展

    模板系统应该认识到, 高级模板编写人员可能想扩展功能

    这是自定义模板标签和过滤器背后的理念


ORM
---

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
~~~~~~

模型准确且唯一的描述了数据, 包含了储存的重要字段和行为; 每一个模型都映射一张数据库表

- 每个模型都是一个 Python 的类, 这些类继承 `django.db.models.Model`

- 模型类的每个属性都相当于一个数据库的字段

- 利用这些, Django 提供了一个自动生成访问数据库的 API

定义模型
^^^^^^^^^

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
^^^^^^^^^^

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
~~~~~~~~

模型中每一个字段都应该是某个 Field 类的实例, 这些字段能够:

1. 指定数据库数据类型
2. 在渲染表单字段时使用默认的 HTML 视图

字段类型
^^^^^^^^^^^

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
^^^^^^^^^^^^^^

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


