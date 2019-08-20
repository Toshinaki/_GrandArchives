
Python Spider
==============

Introduction
--------------

什么是爬虫
~~~~~~~~~~~~~~

例子:

1. 搜索引擎
2. 数据分析
3. 咨询网站

web crawler/spider, 自动模拟网页请求抓取数据

- 通用爬虫: 搜索引擎抓取系统的重要组成部分, 主要用于将互联网上的网页下载到本地, 形成镜像备份
- 聚焦爬虫: 面向特定需求, 只抓取网页的指定部分

HTTP/HTTPS
~~~~~~~~~~~~~~

- HTTP: HyperText Transfer Protocol, 超文本传输协议, 用于发布和接收 HTML 网页; 服务器默认端口为 80
- HTTPS: 在 HTTP 的基础上加入了 SSL 层; 服务器默认端口是 443

.. image:: imgs/HTTP.jpg
    :scale: 80%

request methods
^^^^^^^^^^^^^^^^^

- GET
- POST
- HEAD
- PUT
- DELETE
- TRACE
- OPTIONS
- CONNECT
- PATCH

常见请求头
^^^^^^^^^^^^^^

.. image:: imgs/http_request.jpg

.. list-table::
    :widths: auto
    :header-rows: 1
    :stub-columns: 0

    * - Host
      - 接收请求的服务器地址
    * - User-Agent
      - 发送请求的应用程序名称

        爬虫里需要伪造
    * - Referer
      - 表明当前请求是从哪个页面过来的

        一般也用于反爬虫技术; 如果不是从指定页面过来的就不响应
    * - Cookie
      - 记录一些请求的状态

        例如爬虫访问需要登陆的网站就需要发送 cookie
    * - Connection
      - 指定与连接相关的属性, 如 Connection:Keep-Alive
    * - Accept-Charset
      - 通知服务端可以发送的编码格式
    * - Accept-Encoding
      - 通知服务端可以发送的数据压缩格式
    * - Accept-Language
      - 通知服务端可以发送的语言

.. admonition:: 例

    .. code-block::

        POST 　/index.php　HTTP/1.1 　　 请求行
        Host: localhost
        User-Agent: Mozilla/5.0 (Windows NT 5.1; rv:10.0.2) Gecko/20100101 Firefox/10.0.2　　请求头
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8
        Accept-Language: zh-cn,zh;q=0.5
        Accept-Encoding: gzip, deflate
        Connection: keep-alive
        Referer: http://localhost/
        Content-Length：25
        Content-Type：application/x-www-form-urlencoded
        　　空行
        username=aa&password=1234　　请求数据

常见响应状态码
^^^^^^^^^^^^^^^^^

.. list-table::
    :widths: auto
    :header-rows: 1
    :stub-columns: 0

    * - 状态码
      - 说明
    * - 200
      - 响应成功
    * - 301
      - 永久重定向
    * - 302
      - 临时重定向; 如重定向到登陆页面
    * - 400
      - 请求的 URL 在服务器上找不到
    * - 403
      - 服务器拒绝访问, 权限不够
    * - 500
      - 服务器内部错误

URL
~~~~~

Uniform Resource Locator, 统一资源定位符

**标准格式**:

`[schema]://[host]:[port]/[path]?[query]#[fragment]`

- schema: 传送协议
- 层级URL标记符号 (为[//],固定不变)
- authority: 访问资源需要的凭证信息 (可省略)
- host: 服务器, (通常为域名, 有时为IP地址)
- port: 端口号, (以数字方式表示, 若为默认值可省略)
- path: 路径, (以“/”字符区别路径中的每一个目录名称)
- query: 查询, (GET模式的窗体参数, 以“?”字符为起点, 每个参数以“&”隔开, 再以“=”分开参数名称与数据, 通常以UTF8的URL编码, 避开字符冲突的问题)
- fragment: 片段, 以 "#" 字符为起点

**完整格式**:

`[协议类型]://[访问资源需要的凭证信息]@[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]`

`scheme:[//authority]path[?query][#fragment]`

Python 爬虫库
-----------------

urllib
~~~~~~~~

