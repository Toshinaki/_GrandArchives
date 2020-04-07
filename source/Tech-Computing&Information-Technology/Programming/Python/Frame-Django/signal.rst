Django 信号
==================

Django 自带一套信号机制用来在框架的不同位置之间传递信息; 也就是说, 当某一事件发生时, 信号系统可以允许一个或多个发送者 (senders) 将通知或信号 (signals) 发送给一组接受者 (receivers)

.. note::

    信号及其处理函数是同步的

信号系统包含以下三要素：

- 发送者: 信号的发出方
- 信号: 信号本身
- 接收者: 信号的接受者

监听信号
----------------

1. 使用 `Signal.connect()` 方法注册一个接收器用于接收信号; 当信号发送后, 接收器会被调用

    .. code-block:: python

        Signal.connect(receiver, sender=None, weak=True, dispatch_uid=None)

    args:

    - receiver

        当前信号连接的回调函数, 也就是处理信号的函数; 接收一个 `sender` 参数和一个 `**kwargs` 通配符参数

    - sender

        指定从哪个发送方接收信号

    - weak

        是否弱引用

    - dispatch_uid

        信号接收器的唯一标识符, 以防信号多次发送

2. 也可以使用装饰器注册:

    .. code-block:: python

        from django.dispatch import receiver
        from django.db.models.signals import pre_save

        # 回调函数只有在 SomeModel 实例保存时才会被调用
        @receiver(pre_save, sender=SomeModel)
        def handler(sender, **kwargs):
            # ...

发送信号
--------------

使用 `Signal.send(sender, **kwargs)` 或 `Signal.send_robust(sender, **kwargs)` 发送信号

返回 `[(receiver, response), ...]` 的列表

断开信号
-------------

.. code-block:: python

    Signal.disconnect(receiver=None, sender=None, dispatch_uid=None)

如果接收器成功断开, 则返回True; 否则返回False


Django 内置信号
-------------------

内置信号不需要显式调用 `send()` 方法; 当相应事件发生时信号会自动触发

.. list-table:: Django 内置信号
    :widths: auto
    :header-rows: 1
    :stub-columns: 1

    * - **Model signals**
      -
    * - `pre_init`
      - Django 中的 model 对象执行其构造方法前触发
    * - `post_init`
      - Django 中的 model 对象执行其构造方法后触发
    * - `pre_save`
      - Django 中的 model 对象保存前触发
    * - `post_save`
      - Django 中的 model 对象保存后触发
    * - `pre_delete`
      - Django 中的 model 对象删除前触发
    * - `post_delete`
      - Django 中的 model 对象删除后触发
    * - `m2m_changed`
      - Django 中的 model 对象使用 m2m 字段操作数据库的第三张表 (add, remove, clear, update) 触发
    * - `class_prepared`
      - 程序启动时, 检测到已注册的 model 类, 对于每一个类触发
    * - **Management signals**
      -
    * - `pre_migrate`
      - 执行 `migrate` 命令前触发
    * - `post_migrate`
      - 执行 `migrate` 命令后触发
    * - **Request/response signals**
      -
    * - `request_started`
      - 请求到来前触发
    * - `request_finished`
      - 请求结束后触发
    * - `got_request_exception`
      - 请求异常时触发
    * - **Test signals**
      -
    * - `setting_changed`
      - 配置文件改变时触发
    * - `template_rendered`
      - 模板执行渲染操作时触发
    * - **Datebase Wrappers**
      -
    * - `connection_created`
      - 创建数据库连接时触发

自定义信号
-------------

任何信号都是 `django.dispatch.Signal` 的实例, 需要传入参数名的列表至 `providing_args` 参数

.. code-block:: python

    # 1. 新建信号
    simple_signal = django.dispatch.Signal(providing_args=["arg1", "arg2"])

    # 2. 注册信号
    def handler(sender, **kwargs):
        # ...

    simple_signal.connect(handler)

    # 3. 触发信号
    simple_signal.send(sender=...)

初始化信号
---------------

信号的注册可以另外新建一个文件 `signals.py` 来实现, 并在 app 文件夹中的 `app.py` 文件中导入

- 使用 `conncet()`

    - test/signals.py

        .. code-block:: python

            def handler(sender, ...):
                # ...
    - test/apps.py

        .. code-block:: python

            from .signals import handler

            class TestConfig(AppConfig):
                name = 'test'
                verbose_name = 'a test app'

                def ready(self):
                    Signal.connect(handler, ...)
    - test/__init__.py

        .. code-block:: python

            default_app_config = 'test.apps.TestConfig'

- 使用装饰器

    - test/signals.py

        .. code-block:: python

            @receiver(Signal, ...)
            def handler(sender, ...):
                # ...
    - test/apps.py

        .. code-block:: python

            class TestConfig(AppConfig):
                name = 'test'
                verbose_name = 'a test app'

                def ready(self):
                    # 只需导入文件即可
                    import test.signals
    - test/__init__.py

        .. code-block:: python

            default_app_config = 'test.apps.TestConfig'