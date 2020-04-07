
Django 中间件
=================

中间件 (middleware) 是 Django 用来处理请求和响应的钩子框架 (framework of hooks)

它是一个轻量级的, 底层级的 "插件" 系统, 用于全局性地控制Django 的输入或输出; 每个中间件组件都负责实现一些特定的功能

.. image:: ./imgs/middleware.png

启用中间件
------------

向配置文件 `settings.py` 的 `MIDDLEWARE` 配置项列表中添加要启用的中间件

默认中间件为:

.. code-block:: python

    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware'
    ]

中间件的顺序
----------------

中间件的顺序很重要, 具有先后关系, 因为有些中间件会依赖其他中间件

例如 `AuthenticationMiddleware` 需要会话中间件中存储的经过身份验证的用户信息, 因此它必须在 `SessionMiddleware` 后面运行

- 请求阶段, 中间件按照设置中的顺序从上往下被调用, 直至视图
- 响应阶段, 中间件按照设置中的顺序从下往上被调用, 最终返回给用户
- 中间件调用时, 若某层中间件认为当前请求应该被拒绝, 或者抛出异常, 或者直接返回了一个响应, 则剩下的中间件都会被跳过

.. image:: ./imgs/middleware-order.png

Django 内置中间件
-----------------------

- Cache

    缓存中间件

    如果启用了该中间件, Django会以 `CACHE_MIDDLEWARE_SECONDS` 配置的参数进行全站级别的缓存

- Common

    通用中间件

    该中间件提供了一些便利的功能:

    - 禁止 `DISALLOWED_USER_AGENTS` 中的用户代理访问服务器
    - 自动为 URL 添加斜杠后缀和 www 前缀功能. 如果配置项 `APPEND_SLASH` 为True, 并且访问的 URL 没有斜杠后缀, 在 URLconf 中没有匹配成功, 将自动添加斜杠, 然后再次匹配, 如果匹配成功, 就跳转到对应的 url; `PREPEND_WWW` 的功能类似
    - 为非流式响应设置 `Content-Length` 头部信息

    source code:

    .. code-block:: python

        class CommonMiddleware(MiddlewareMixin):

            def process_request(self, request):
                # Check for denied User-Agents
                if 'HTTP_USER_AGENT' in request.META:
                    for user_agent_regex in settings.DISALLOWED_USER_AGENTS:
                        if user_agent_regex.search(request.META['HTTP_USER_AGENT']):
                            raise PermissionDenied('Forbidden user agent')

                # Check for a redirect based on settings.PREPEND_WWW
                host = request.get_host()
                must_prepend = settings.PREPEND_WWW and host and not host.startswith('www.')
                redirect_url = ('%s://www.%s' % (request.scheme, host)) if must_prepend else ''

                # Check if a slash should be appended
                if self.should_redirect_with_slash(request):
                    path = self.get_full_path_with_slash(request)
                else:
                    path = request.get_full_path()

                # Return a redirect if necessary
                if redirect_url or path != request.get_full_path():
                    redirect_url += path
                    return self.response_redirect_class(redirect_url)

            def should_redirect_with_slash(self, request):

                if settings.APPEND_SLASH and not request.path_info.endswith('/'):
                    urlconf = getattr(request, 'urlconf', None)
                    return (
                        not is_valid_path(request.path_info, urlconf) and
                        is_valid_path('%s/' % request.path_info, urlconf)
                    )
                return False

            def get_full_path_with_slash(self, request):

                new_path = request.get_full_path(force_append_slash=True)
                if settings.DEBUG and request.method in ('POST', 'PUT', 'PATCH'):
                    raise RuntimeError(
                        "You called this URL via %(method)s, but the URL doesn't end "
                        "in a slash and you have APPEND_SLASH set. Django can't "
                        "redirect to the slash URL while maintaining %(method)s data. "
                        "Change your form to point to %(url)s (note the trailing "
                        "slash), or set APPEND_SLASH=False in your Django settings." % {
                            'method': request.method,
                            'url': request.get_host() + new_path,
                        }
                    )
                return new_path

            def process_response(self, request, response):
                # If the given URL is "Not Found", then check if we should redirect to
                # a path with a slash appended.
                if response.status_code == 404:
                    if self.should_redirect_with_slash(request):
                        return self.response_redirect_class(self.get_full_path_with_slash(request))

                if settings.USE_ETAGS and self.needs_etag(response):
                    warnings.warn(
                        "The USE_ETAGS setting is deprecated in favor of "
                        "ConditionalGetMiddleware which sets the ETag regardless of "
                        "the setting. CommonMiddleware won't do ETag processing in "
                        "Django 2.1.",
                        RemovedInDjango21Warning
                    )
                    if not response.has_header('ETag'):
                        set_response_etag(response)

                    if response.has_header('ETag'):
                        return get_conditional_response(
                            request,
                            etag=response['ETag'],
                            response=response,
                        )
                # Add the Content-Length header to non-streaming responses if not
                # already set.
                if not response.streaming and not response.has_header('Content-Length'):
                    response['Content-Length'] = str(len(response.content))

                return response

            def needs_etag(self, response):
                """Return True if an ETag header should be added to response."""
                cache_control_headers = cc_delim_re.split(response.get('Cache-Control', ''))
                return all(header.lower() != 'no-store' for header in cache_control_headers)

- GZip

    内容压缩中间件

    用于减小响应体积, 降低带宽压力, 提高传输速度

    该中间件必须位于其它所有需要读写响应体内容的中间件之前

    如果存在下面情况之一, 将不会压缩响应内容:

    - 内容少于 200 bytes
    - 已经设置了 `Content-Encoding` 头部属性
    - 请求的 `Accept-Encoding` 头部属性未包含 gzip

    可以使用 `gzip_page()` 装饰器, 为视图单独开启 GZip 压缩服务

- Conditional GET

    有条件的 GET 访问中间件, 很少使用

- Locale

    本地化中间件

    用于处理国际化和本地化, 语言翻译

- Message

    消息中间件

    基于 cookie 或者会话的消息功能, 比较常用

- Security

    安全中间件

    `django.middleware.security.SecurityMiddleware` 中间件提供了一系列的网站安全保护功能, 主要包括下列所示, 可以单独开启或关闭：

    - `SECURE_BROWSER_XSS_FILTER`
    - `SECURE_CONTENT_TYPE_NOSNIFF`
    - `SECURE_HSTS_INCLUDE_SUBDOMAINS`
    - `SECURE_HSTS_PRELOAD`
    - `SECURE_HSTS_SECONDS`
    - `SECURE_REDIRECT_EXEMPT`
    - `SECURE_SSL_HOST`
    - `SECURE_SSL_REDIRECT`

- Session

    会话中间件, 非常常用

- Site

    站点框架, 可以让 Django 网站具备多站点支持的功能

    通过增加一个 `site` 属性, 区分当前 request 请求访问的对应站点

    无需多个 IP 或域名, 无需开启多个服务器, 只需要一个site属性, 就能搞定多站点服务

- Authentication

    认证框架

    Django最主要的中间件之一, 提供用户认证服务

- CSRF protection

    提供CSRF防御机制的中间件

- X-Frame-Options

    点击劫持防御中间件

自定义中间件
-----------------

中间件本质上是一个可调用的对象 (函数, 方法, 类), 它接受一个请求 (request), 并返回一个响应 (response) 或者 `None`, 就像视图一样

其初始化参数是一个名为 `get_response` 的可调用对象

推荐方法
~~~~~~~~~~~~

Django v2.2 的最新写法

1. 定义中间件类 (recommonded)

    .. code-block:: python

        # 定义一个可调用的类

        class SimpleMiddleware:

            def __init__(self, get_response):
                self.get_response = get_response
                # 配置和初始化

            def __call__(self, request):

                # 视图和后面的中间件被调用之前需要执行的代码
                # 等同于旧的 process_request() 方法

                response = self.get_response(request)

                # 视图调用后需要执行的代码
                # 等同于旧的 process_response() 方法

                return response

    .. note::

        - `__init__` 中只能包含 `get_response` 参数
        - `__init__` 只会在服务器重启后调用一次

2. 定义装饰器 (not recommonded)

    .. code-block:: python

        def simple_middleware(get_response):

            def middleware(request):

                # 视图和后面的中间件被调用之前需要执行的代码

                response = get_response(request)

                # 视图调用后需要执行的代码

                return response

            return middleware

传统方法
~~~~~~~~~~~~

传统方法需要定义一个类, 包含以下 5 个钩子函数中至少一个函数:

- `process_request(self, request)`
- `process_response(self, request, response)`
- `process_view(self, request, view_func, *view_args, **view_kwargs)`
- `process_exception(self, request, exception)`
- `process_template_response(self,request,response)`

.. image:: ./imgs/middleware-funcs.png

应用实例
--------------

IP 拦截
~~~~~~~~~~~~~

.. code-block:: python

    from django.http import HttpResponseForbidden
    from django.conf import settings

    class BlackListMiddleware():

        def __init__(self, get_response):
            self.get_response = get_response

        def __call__(self, request):

            # 如果访问 IP 在 settings.py 里设置的 BLACKLIST 中, 则拒绝访问
            if request.META['REMOTE_ADDR'] in getattr(settings, "BLACKLIST", []):
                return HttpResponseForbidden('<h1>该IP地址被限制访问！</h1>')

            response = self.get_response(request)

            return response

DEBUG 页面
~~~~~~~~~~~~~~~~~

- 普通访问者看到的是500错误页面
- 管理员看到的是错误详情Debug页面

.. code-block:: python

    import sys
    from django.views.debug import technical_500_response
    from django.conf import settings

    class DebugMiddleware():
        def __init__(self, get_response):
            self.get_response = get_response

        def __call__(self, request):

            response = self.get_response(request)

            return response

        def process_exception(self, request, exception):
            # 如果是管理员, 则返回一个特殊的响应对象, 也就是Debug页面
            # 如果是普通用户, 则返回None, 交给默认的流程处理
            if request.user.is_superuser or request.META.get('REMOTE_ADDR') in settings.ADMIN_IP:
                return technical_500_response(request, *sys.exc_info())