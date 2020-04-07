Google Cloud Tasks
=======================

Cloud Tasks 是一项全托管式服务, 用于:

- 管理大量分布式任务的执行, 调度和交付
- 在用户请求之外异步执行工作 (称为任务, task)
- 在 App Engine 或任意 HTTP 端点上执行任务

准备工作
-----------

1. `创建或选择一个 GCP 项目 <https://console.cloud.google.com/projectselector/appengine/create>`_
2. 将 App Engine 应用添加到项目中
3. `启用结算功能 <https://console.cloud.google.com/projectselector/billing>`_
4. `启用 Cloud Tasks API <https://console.cloud.google.com/apis/library/cloudtasks.googleapis.com>`_
5. 为 API 设置身份验证
6. 安装并设置 `Cloud SDK <https://cloud.google.com/sdk/docs/initializing>`_, 以在本地使用 `gcloud` 工具

Cloud Tasks Overview
-------------------------

典型用例包括:

- 通过将可能缓慢的后台操作 (如数据库更新) 委派给工作器, 加快用户响应时间
- 在发生意外生产事件的情况下, 保留请求
- 从主用户流中移除并非面向用户的任务, 以帮助顺利应对流量高峰

任务组成
~~~~~~~~~~~~~~

- 唯一名称
- 配置信息
- 处理请求时所需的初始请求数据 (称为*负载*, payload; optional)

    由于负载是在请求正文 (request content) 中发送的, 因此这些包含负载的任务必须使用 POST 或 PUT 方法

工作流程
~~~~~~~~~~~

1. 创建一个工作器 (handlers) 来处理任务
2. 开发者创建队列 (queue), 由 Cloud Tasks 服务管理
3. 代码创建任务, 并将其添加到队列中来分流工作
4. Cloud Tasks 服务会向源应用返回 `OK`; 这表示任务已成功写入 Cloud Task 存储区, 使创建任务请求具有高可用性和持久性
5. 任务传递给工作器
6. 工作器在后台异步处理这些任务
7. 任务完成后, 工作器向 Cloud Tasks 服务返回一个 2xx 成功状态码

任务处理
~~~~~~~~~~~~

使用 HTTP targets
^^^^^^^^^^^^^^^^^^^^^

对于通用 HTTP targets, Cloud Tasks 服务会根据任务配置方式将任务请求转发给位于通用 HTTP 端点上的工作器 (如 Cloud Functions, Cloud Run, GKE, Compute Engine, 甚至是本地 Web 服务器)

- 使用 HTTP targets 的队列会以可靠且可配置的速率调度请求, 并且确保任务得到可靠执行
- 任务成功完成后, 所有工作器必须在 10 分钟的截止时间之前向 Cloud Tasks 服务发送一个 HTTP 响应码 (200-299)
- 如果发送了不同的响应, 或者没有响应, 系统会重试该任务

.. image:: ./imgs/http-target-task-diagram.png

HTTP targets 必须管理工作器的扩缩, 并在任务完成后执行清理工作

使用 App Engine targets
^^^^^^^^^^^^^^^^^^^^^^^^^^

对于 App Engine targets, Cloud Tasks 服务会根据任务配置方式 (或者队列本身的配置方式; 不常见) 将任务请求转发给位于 App Engine 中的工作器

- 使用 App Engine targets 的队列会以可靠且可配置的速率调度请求, 并且确保任务得到可靠执行
- 任务成功完成后, 所有工作器必须在截止时间 (取决于服务的实例扩缩类型: 自动扩缩为 10 分钟, 手动扩缩最长为 24 小时) 之前向此实例中的 Cloud Tasks 服务发送一个 HTTP 响应代码 (200-299)
- 如果发送了不同的响应, 或者没有响应, 系统会重试该任务

.. image:: ./imgs/app-engine-task-diagram.png

由于此处理程序是 App Engine 的组成部分, 因此 Cloud Tasks 服务本身能处理任务的大部分流程管理事务, 可根据流量扩缩工作器, 以及在任务完成后删除任务

创建和配置 Cloud Tasks 队列
-------------------------------

使用 `gcloud` 命令创建和配置队列
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. 创建队列

    .. code-block:: console

        gcloud tasks queues create [QUEUE_ID]

    - `QUEUE_ID` 是队列的唯一标识符

    新创建的队列可能需要几分钟才能使用

2. 使用 describe 验证队列创建成功

    .. code-block:: console

        gcloud tasks queues describe [QUEUE_ID]

    输出如下则表示队列成功创建::

        appEngineHttpQueue: {}
        name: projects/[PROJECT_ID]/locations/[LOCATION_ID]/queues/[QUEUE_ID]
        rateLimits:
          maxBurstSize: 100
          maxConcurrentDispatches: 1000
          maxDispatchesPerSecond: 500.0
        retryConfig:
          maxAttempts: 100
          maxBackoff: 3600s
          maxDoublings: 16
          minBackoff: 0.100s
        state: RUNNING

    如果没有以上输出, 可尝试以下操作:

    - 等待至少一分钟, 以便队列进行初始化
    - 确保不存在有相同 ID 的队列

        使用此命令查看项目中的所有队列

        .. code-block:: console

            gcloud tasks queues list
    - `检查是否已达到队列上限 <https://console.cloud.google.com/apis/api/cloudtasks.googleapis.com/overview>`_


配置 Cloud Tasks 队列
~~~~~~~~~~~~~~~~~~~~~~~~~~~

队列配置将应用于该队列中的所有任务

配置路由 (仅适用于 App Engine 队列)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

队列需要知道包含工作器的服务的名称和版本 (称为目标, target)

设置目标有以下三种方式:

1. 不明确设置目标

    在这种情况下, 队列将使用默认服务
2. 在任务中明确声明目标
3. 在队列中明确声明目标

    此方法将覆盖任务中设置的任何路由

    .. code-block:: console

        gcloud tasks queues update [QUEUE_ID] --routing-override=service:[SERVICE],version:[VERSION]

    - `SERVICE` 是 App Engine 工作器服务, 负责任务处理
    - `VERSION` 是应用版本

配置路由后查看队列可以得到以下输出::

    appEngineHttpQueue:
      appEngineRoutingOverride:
        host: [SERVICE].[PROJECT_ID].appspot.com
        service: [SERVICE]
    name: projects/[PROJECT_ID]/locations/[LOCATION_ID]/queues/[QUEUE_ID]
    rateLimits:
      maxBurstSize: 100
      maxConcurrentDispatches: 1000
      maxDispatchesPerSecond: 500.0
    retryConfig:
      maxAttempts: 100
      maxBackoff: 3600s
      maxDoublings: 16
      minBackoff: 0.100s
    state: RUNNING

建立速率限制
^^^^^^^^^^^^^^^^^^

设置队列可调度的并发任务的最大速率和数量

.. code-block:: console

    gcloud tasks queues update-app-engine-queue [QUEUE_ID] --max-dispatches-per-second=[DISPATCH_RATE] --max-concurrent-dispatches=[MAX_RUNNING]

- `DISPATCH_RATE` 是队列调度其任务的最大速率
- `MAX_RUNNING` 是队列中可同时运行的任务的最大数量

设置重试参数
^^^^^^^^^^^^^^^^^^^

如果任务未成功完成, Cloud Tasks 将根据重试参数, 使用指数退避算法 (Exponential Backoff) 重试该任务

.. code-block:: console

    gcloud tasks queues update-app-engine-queue [QUEUE_ID] --max-attempts=[MAX_ATTEMPTS] --min-backoff=[MIN_INTERVAL] --max-backoff=[MAX_INTERVAL] --max-doublings=[MAX_DOUBLINGS] --max-retry-duration=[MAX_RETRY_DURATION]

- `MAX_ATTEMPTS` 是任务可以尝试的最大次数, 包括第一次尝试

    可以设置为 `unlimited` 以允许进行无限次数的重试
- `MIN_INTERVAL` 是重试尝试之间的最短等待时间; 必须是以 "s" 结尾的字符串
- `MAX_INTERVAL` 是重试尝试之间的最长等待时间; 该值必须是以 "s" 结尾的字符串
- `MAX_DOUBLINGS` 是在增加量变为常量之前, 失败任务重试之间的时间间隔将加倍的最大次数
- `MAX_RETRY_DURATION` 是重试失败任务的最长时间; 该值必须是以 "s" 结尾的字符串

日志记录功能
~~~~~~~~~~~~~~~~~~~~

启用和停用
^^^^^^^^^^^^^

.. code-block:: console

    gcloud beta tasks queues create/update [QUEUE_ID] --log-sampling-ratio=1.0

- log-sampling-ratio 值表示队列上被记录的操作的百分比

    将其设置为介于 1.0 和 0.0 之间的任何值即可记录对应比例的操作

停用:

.. code-block:: console

    gcloud beta tasks queues update [QUEUE_ID] --log-sampling-ratio=0.0


被记录的操作
^^^^^^^^^^^^^^^^

- 任务操作
    - CreateTask
    - DeleteTask
- 尝试操作
    - AttemptDispatch
    - AttemptResponse

查看日志
^^^^^^^^^^^^^^

前往 GCP Console 中的 `Stackdriver Logging > 日志 (日志查看器) <https://console.cloud.google.com/logs/viewer>`_ 页面

创建任务和处理程序
----------------------

创建 HTTP Target 任务
~~~~~~~~~~~~~~~~~~~~~~~~

创建 App Engine 任务
~~~~~~~~~~~~~~~~~~~~~~~~

在代码中创建 App Engine 任务, 并将其置于 Cloud Tasks 队列中

可以明确指定用于处理任务的服务和处理程序, 并且可以选择将用于特定任务的数据传递给处理程序

可以根据需求使用 HTTP 请求的形式创建任务, 也可以使用 `Google Cloud 客户端库 <https://cloud.google.com/apis/docs/cloud-client-libraries>`_ 来管理与服务器进行低层级通信的细节, 包括使用 Google 进行身份验证

.. code-block:: python

    """Create a task for a given queue with an arbitrary payload."""

    from google.cloud import tasks_v2
    from google.protobuf import timestamp_pb2

    # 创建 client.
    client = tasks_v2.CloudTasksClient()

    # 替换下列值为项目对应值
    project = 'my-project-id'
    queue = 'my-appengine-queue'
    location = 'us-central1'
    payload = 'hello'

    # 构造标准队列名
    parent = client.queue_path(project, location, queue)

    # 构造请求主体
    task = {
            'app_engine_http_request': {  # 指定 request 类型
                'http_method': 'POST',
                'relative_uri': '/example_task_handler'
            }
    }
    if payload is not None:
        # API 接收 bytes 类型的数据
        converted_payload = payload.encode()

        # 添加数据到 request 中
        task['app_engine_http_request']['body'] = converted_payload

    if in_seconds is not None:
        # Convert "seconds from now" into an rfc3339 datetime string.
        d = datetime.datetime.utcnow() + datetime.timedelta(seconds=in_seconds)

        # Create Timestamp protobuf.
        timestamp = timestamp_pb2.Timestamp()
        timestamp.FromDatetime(d)

        # 添加时间戳到 tasks 中
        task['schedule_time'] = timestamp

    # 使用 client 来构建并发送 task
    response = client.create_task(parent, task)

    print('Created task {}'.format(response.name))
    return response

创建 App Engine 任务处理程序
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

例如在 Flask 中:

.. code-block:: python

    from flask import Flask, request
    app = Flask(__name__)

    @app.route('/example_task_handler', methods=['POST'])
    def example_task_handler():
        """Log the request payload."""
        payload = request.get_data(as_text=True) or '(empty payload)'
        print('Received task with payload: {}'.format(payload))
        return 'Printed task payload: {}'.format(payload)

超时
~~~~~~~~~

App Engine 任务有特定的超时限制, 取决于运行服务的扩缩类型

- 对于在标准环境中运行的工作器:

    - 自动扩缩: 任务处理必须在 10 分钟内完成
    - 手动和基本扩缩: 请求最长可运行 24 小时

- 对于在柔性环境中运行的工作器:

    所有类型任务的超时限制均为 60 分钟

如果处理程序的运行时间超出限制, 则队列会认为任务失败并重试

request headers
~~~~~~~~~~~~~~~~~

Cloud Tasks 队列发送给处理程序的请求有特殊的 headers, 其中包含处理程序可能希望使用的特定于任务的信息

- Cloud Tasks 的请求始终包含以下 headers:

    .. list-table::
        :header-rows: 1

        * - header
          - description
        * - X-AppEngine-QueueName
          - 队列名称
        * - X-AppEngine-TaskName
          - 任务的 "短" 名称, 或者系统为任务生成的唯一 ID (如果在创建时未指定任务名称)

            这是完整任务名称中 `my-task-id` 部分的值, 即 `task_name = projects/my-project-id/locations/my-location/queues/my-queue-id/tasks/my-task-id`
        * - X-AppEngine-TaskRetryCount
          - 此任务已经重试的次数

            对于第一次尝试, 该值为 0

            此数字包括由于缺少可用实例导致任务失败而从未到达执行阶段的尝试次数
        * - X-AppEngine-TaskExecutionCount
          - 任务从处理程序收到响应的总次数
            由于 Cloud Tasks 在收到成功响应后会删除任务, 因此所有先前的处理程序响应都是失败的

            此数字不包括由于缺少可用实例而导致的失败次数
        * - X-AppEngine-TaskETA
          - 任务的计划运行时间, 以 1970 年 1 月 1 日以来的秒数指定

- Cloud Tasks 的请求可能包含以下 headers:

    .. list-table::
        :header-rows: 1

        * - header
          - description
        * - X-AppEngine-TaskPreviousResponse
          - 来自上一次重试的 HTTP 响应代码
        * - X-AppEngine-TaskRetryReason
          - 重试任务的原因
        * - X-AppEngine-FailFast
          - 表示任务在现有实例不可用时快速失败

目标路由
~~~~~~~~~~~~

在 App Engine 任务中, 队列和任务处理程序在同一个 GCP 项目中运行. 流量在传输过程中被加密, 不会离开 Google 数据中心. 由于此流量通过 Google 内部的通信机制传输, 因此您无法明确设置协议 (例如, HTTP 或 HTTPS). 但是, 对处理程序的请求表现为使用了 HTTP 协议.

任务可被分派到安全的任务处理程序, 不安全的任务处理程序, 以及受 `login: admin` 限制的 URI. 由于并非任何用户身份都可以运行任务, 因此无法将其分派到受 `login: required` 限制的 URI. 任务调度也不遵循重定向.

管理队列和任务
----------------------

从队列中删除任务
~~~~~~~~~~~~~~~~~~

1. 在控制台打开 `Cloud Tasks 页面 <https://console.cloud.google.com/cloudtasks?tab=push>`_
2. 选择包含要移除任务的队列
3. 选择要删除的任务并删除

从队列中完全清除所有任务
~~~~~~~~~~~~~~~~~~~~~~~~~~

1. 在控制台打开 `Cloud Tasks 页面 <https://console.cloud.google.com/cloudtasks?tab=push>`_
2. 选择要清空的队列
3. 完全清除队列

暂停/继续队列
~~~~~~~~~~~~~

1. 在控制台打开 `Cloud Tasks 页面 <https://console.cloud.google.com/cloudtasks?tab=push>`_
2. 选择要暂停/继续的队列
3. 暂停/继续

删除队列
~~~~~~~~~~~~

1. 在控制台打开 `Cloud Tasks 页面 <https://console.cloud.google.com/cloudtasks?tab=push>`_
2. 选择要删除的队列
3. 删除

如果从 GCP Console 中删除队列, 必须等待 7 天才能重新创建同名队列
