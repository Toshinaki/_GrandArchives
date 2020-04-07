
urllib
=======

Python 内置的 HTTP 请求库, 包含 4 个模块:

- **request**: 最基本的 HTTP 请求模块, 可以用来模拟发送请求
- **error**: 异常处理模块, 如果出现请求错误, 可以捕获异常, 然后进行重试或其他操作以保证程序不会意外终止
- **parse**: 一个工具模块, 提供了许多 URL 处理方法, 比如拆分, 解析, 合并等
- **robotparser**: 主要用来识别网站的 robots.txt 文件, 然后判断哪些网站可以爬, 哪些网站不可以爬; 用得比较少

request
--------

urllib.request 模块提供了最基本的构造 HTTP 请求的方法, 利用它可以模拟浏览器的一个请求发起过程, 同时它还带有处理授权验证（authentication) , 重定向（redirection), 浏览器 Cookies 以及其他内容

urlopen
~~~~~~~~

`urllib.request.urlopen(url, data=None, [timeout, ]*, cafile=None, capath=None, cadefault=False, context=None)`
    打开 URL 或 `Request` 对象; urllib.request 模块使用 HTTP/1.1 并在 HTTP 头中包括了 Connection:close

    PARAMS:
        - `url`: URL 或 `Request` 对象
        - `data`: 发送给服务端的数据; 未指定则使用 GET, 否则使用 POST; 必须为 bytes 类型

            .. code-block:: python

                data = bytes(urllib.parse.urlencode({'word': 'hello'}), encoding='utf8')
                response = urllib.request.urlopen('http://httpbin.org/post', data=data)
                print(response.read())

        - `timeout` (optional): 指定了阻塞操作 (如尝试连接) 的以秒为单位的 timeout; 只对 HTTP, HTTPS & FTP 连接有效; 默认为 `socket._GLOBAL_DEFAULT_TIMEOUT`; 超时则抛出 `urllib.error.URLError` 异常

            .. code-block:: python

                try:
                    response = urllib.request.urlopen('http://httpbin.org/get', timeout=0.1)
                except urllib.error.URLError as e:
                    if isinstance(e.reason, socket.timeout):
                        print('TIME OUT')

        - `context`: `ssl.SSLContext` 实例, 用于指定 SSL 设置
        - `cafile` & `capath` (optional): 指定了用于 HTTPS 请求的 CA certificates; `cafile` 包含了 CA certificates 的文件路径; `capath` 指向含有 hashed certificate 文件的路径
        - `cadefault`: 已弃用

    RETURN:
        返回 `http.client.HTTPResponse` 对象 (类文件句柄对象), 可用作 context manager
		
		属性和方法:

            - `status`: 状态码
            - `geturl()`: 返回资源的 URL, 可用于判断是否有重定向
            - `info()`: return the meta-information of the page, such as headers, in the form of an email.message_from_string() instance
            - `getheaders()`: 返回所有 headers
            - `getheader(str)`: 返回指定 header
            - `getcode()`: 返回 HTTP 状态码
            - `read(size)`
            - `readline()`
            - `readlines()`

Request
~~~~~~~~

`urllib.request.Request(url, data=None, headers={}, origin_req_host=None, unverifiable=False, method=None)`
    构造 `Reques` 对象

    PARAMS:
        - `url`: 请求的 URL
        - `data`: 发送给服务端的数据; 必须为 bytes 类型
        - `headers`: a dict; 请求头; 也可通过 `add_header()` 方法添加
        - `origin_req_host`: 请求方的 host 名称或者 IP 地址
        - `unverifiable`: 请求是否是无法验证的
        - `method`: 请求使用的方法

BaseHandler
~~~~~~~~~~~~

`urllib.request.BaseHandler`
    Handlers 是对应各种复杂操作的处理器, BaseHandler 类是所有其他 Handler 的父类, 提供了最基本的方法

OpenerDirector
~~~~~~~~~~~~~~

`urllib.request.OpenerDirector`
    用于实现更加底层的操作, 也可以称为 Opener; `urlopen` 就是 `urllib` 提供的一个 Opener

.. admonition:: 例

    - **验证**

        网站在打开时就会弹出提示框, 提示输入用户名和密码, 验证成功后才能查看页面

        .. code-block:: python

            from urllib.request import HTTPPasswordMgrWithDefaultRealm, HTTPBasicAuthHandler, build_opener
            from urllib.error import URLError

            username = 'username'
            password = 'password'
            url = 'http://test.com'

            p = HTTPPasswordMgrWithDefaultRealm()
            # 添加用户名和密码
            p.add_password(None, url, username, password)
            # 实例化
            auth_handler = HTTPBasicAuthHandler(p)
            # 构建 Opener
            opener = build_opener(auth_handler)

            try:
                result = opener.open(url)
                html = result.read().decode('utf-8')
                print(html)
            except URLError as e:
                print(e.reason)

    - **代理**

        .. code-block:: python

            from urllib.error import URLError
            from urllib.request import ProxyHandler, build_opener

            # 在本地 9743 端口上搭建了一个代理
            proxy_handler = ProxyHandler({
                'http': 'http://127.0.0.1:9743',
                'https': 'https://127.0.0.1:9743'
            })
            opener = build_opener(proxy_handler)
            try:
                response = opener.open('https://test.com')
                print(response.read().decode('utf-8'))
            except URLError as e:
                print(e.reason)

    - **Cookies**

        获取网站 Cookies:

        .. code-block:: python

            import http.cookiejar, urllib.request

            # 声明一个 CookieJar 对象
            cookie = http.cookiejar.CookieJar()
            # 构建 Handler
            handler = urllib.request.HTTPCookieProcessor(cookie)
            # 构建 Opener
            opener = urllib.request.build_opener(handler)
            response = opener.open('http://test.com')
            for item in cookie:
                print(item.name + '=' + item.value)

        以 Mozilla 浏览器的 Cookies 格式保存:

        .. code-block:: python

            filename = 'cookies.txt'
            cookie = http.cookiejar.MozillaCookieJar(filename)
            handler = urllib.request.HTTPCookieProcessor(cookie)
            opener = urllib.request.build_opener(handler)
            response = opener.open('http://test.com')
            cookie.save(ignore_discard=True, ignore_expires=True)

        以 libwww-perl(LWP) 格式保存:

        .. code-block:: python

            # ...
            cookie = http.cookiejar.LWPCookieJar(filename)
            # ...

        读取 libwww-perl(LWP) 格式的 cookie 文件

        .. code-block:: python

            cookie = http.cookiejar.LWPCookieJar()
            cookie.load('cookies.txt', ignore_discard=True, ignore_expires=True)
            handler = urllib.request.HTTPCookieProcessor(cookie)
            opener = urllib.request.build_opener(handler)
            response = opener.open('http://test.com')
            print(response.read().decode('utf-8'))

error
------

异常处理模块

URLError
~~~~~~~~

`urllib.error.URLError`
    `OSError` 的子类, 是 error 异常模块的基类, 由 request 模块产生的异常都可以通过捕获这个类来处理

    属性 reason 可以返回错误的原因, 也可能返回一个对象

    .. code-block:: python

        from urllib import request, error
        try:
            response = request.urlopen('https://cuiqingcai.com/index.htm')
        except error.URLError as e:
            print(e.reason)

        # 返回socket.timeout
        import socket

        try:
            response = request.urlopen('https://www.baidu.com', timeout=0.01)
        except error.URLError as e:
            print(type(e.reason))
            if isinstance(e.reason, socket.timeout):
                print('TIME OUT')

HTTPError
~~~~~~~~~~~~

`urllib.error.HTTPError`
    URLError 的子类, 专门用来处理 HTTP 请求错误, 比如认证请求失败等

    属性:

    - `code`: 返回 HTTP 状态码
    - `reason`: 返回错误的原因
    - `headers`: 返回请求头

parse
------

定义了处理 URL 的标准接口, 如实现 URL 各部分的抽取, 合并以及链接转换

支持如下协议的 URL 处理: file, ftp, gopher, hdl, http, https, imap, mailto,  mms, news, nntp, prospero, rsync, rtsp, rtspu, sftp,  sip, sips, snews, svn, svn+ssh, telnet 和 wais

urlparse & urlunparse
~~~~~~~~~~~~~~~~~~~~~~~~

`urllib.parse.urlparse(urlstring, scheme='', allow_fragments=True)`
    实现 URL 的识别和分段

    PARAMS:
        - `urlstring`: 待解析的 URL
        - `scheme`: 默认协议; 假如这个链接没有带协议信息, 会将这个作为默认的协议
        - `allow_fragments`: 是否忽略 fragment

    .. code-block:: python

        from urllib.parse import urlparse

        result = urlparse('http://www.baidu.com/index.html;user?id=5#comment')
        print(type(result), result)

        # 结果
        # <class 'urllib.parse.ParseResult'> ParseResult(scheme='http', netloc='www.baidu.com', path='/index.html', params='user', query='id=5', fragment='comment')

`urllib.parse.urlunparse(parts)`
    构造 URL

    parts 是长度必须为 6 的 iterable

urlsplit, urlunsplit & urljoin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`urllib.parse.urlsplit(urlstring, scheme='', allow_fragments=True)`
    类似于 `urlparse`, 但不单独解析 params, 只返回 5 个结果

    .. code-block:: python

        from urllib.parse import urlsplit

        result = urlsplit('http://www.baidu.com/index.html;user?id=5#comment')
        print(result)

        # 结果
        # SplitResult(scheme='http', netloc='www.baidu.com', path='/index.html;user', query='id=5', fragment='comment')

`urllib.parse.urlunsplit(parts)`
    类似于 `urlunparse`, parts 是长度必须为 5 的 iterable

`urllib.parse.urljoin(base, url, allow_fragments=True)`
    分析 `base_url` 的 scheme, netloc 和 path, 并对新链接 `url` 缺失的部分进行补充, 最后返回结果

urlencode, parse_qs & parse_qsl
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`urllib.parse.urlencode(query, doseq=False, safe='', encoding=None, errors=None, quote_via=quote_plus)`
    多用于构造 GET 参数

    .. code-block:: python

        from urllib.parse import urlencode

        params = {
            'name': 'germey',
            'age': 22
        }
        print(urlencode(params))

        # 结果
        # 'name=germey&age=22'

`urllib.parse.parse_qs(qs, keep_blank_values=False, strict_parsing=False, encoding='utf-8', errors='replace', max_num_fields=None)`
    解析参数为 dict

    .. code-block:: python

        from urllib.parse import parse_qs

        query = 'name=germey&amp;age=22'
        print(parse_qs(query))

        # 结果
        # {'name': ['germey'], 'age': ['22']}

`urllib.parse.parse_qsl(qs, keep_blank_values=False, strict_parsing=False, encoding='utf-8', errors='replace', max_num_fields=None)`
    将参数转化为元组组成的列表

    .. code-block:: python

        from urllib.parse import parse_qsl

        query = 'name=germey&amp;age=22'
        print(parse_qsl(query))

        # 结果
        # [('name', 'germey'), ('age', '22')]

quote & unquote
~~~~~~~~~~~~~~~~~~

`urllib.parse.quote(string, safe='/', encoding=None, errors=None)`
    将字符串转化为 URL 编码 (ASCII)

`urllib.parse.unquote(string, encoding='utf-8', errors='replace')`
    将 URL 编码解码为字符串

robots
-------

Robots 协议
~~~~~~~~~~~~~~~~~~

网络爬虫排除标准 (Robots Exclusion Protocol), 也称作爬虫协议, 机器人协议

用于告诉爬虫和搜索引擎哪些页面可以抓取, 哪些不可以抓取; 它通常是一个叫作 robots.txt 的文本文件, 一般放在网站的根目录下

当搜索爬虫访问一个站点时, 它首先会检查这个站点根目录下是否存在 robots.txt 文件, 如果存在, 搜索爬虫会根据其中定义的爬取范围来爬取; 如果没有找到这个文件, 搜索爬虫便会访问所有可直接访问的页面

.. admonition:: 例

    对所有爬虫只允许爬取 public 目录:

    .. code-block:: console

        User-agent: *
        Disallow: /
        Allow: /public/

    禁止所有爬虫访问任何目录:

    .. code-block:: console

        User-agent: *
        Disallow: /

    允许所有爬虫访问任何目录:

    .. code-block:: console

        User-agent: *
        Disallow:

    只允许某一个爬虫访问:

    .. code-block:: console

        User-agent: WebCrawler
        Disallow:
        User-agent: *
        Disallow: /

RobotFileParser
~~~~~~~~~~~~~~~~~~

`urllib.robotparser.RobotFileParser(url='')`
    根据网站的 robots.txt 文件来判断一个爬虫是否有权限来爬取这个网页

    常用方法:

    - `set_url()`: 用来设置 robots.txt 文件的链接; 如果在创建 RobotFileParser 对象时传入了链接, 就不需要使用这个方法设置
    - `read()`: 读取 robots.txt 文件并进行分析; 这个方法执行读取和分析操作, 如果不调用这个方法, 接下来的判断都会为 False; 不返回任何内容, 但是执行了读取操作
    - `parse()`: 用来解析 robots.txt 文件, 传入的参数是 robots.txt 某些行的内容, 它会按照 robots.txt 的语法规则来分析这些内容
    - `can_fetch()`: 该方法传入两个参数, 第一个是 User-agent, 第二个是要抓取的 URL; 返回的内容是该搜索引擎是否可以抓取这个 URL, 返回结果是 True 或 False
    - `mtime()`: 返回的是上次抓取和分析 robots.txt 的时间, 这对于长时间分析和抓取的搜索爬虫是很有必要的, 可能需要定期检查来抓取最新的 robots.txt
    - `modified()`: 同样对长时间分析和抓取的搜索爬虫很有帮助, 将当前时间设置为上次抓取和分析 robots.txt 的时间
