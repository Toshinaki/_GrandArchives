
requests
========

.. figure:: imgs/requests.png
    :scale: 50%
    :align: left

Install
--------

.. code-block:: console

    $ pip install requests

Basics
--------

发送请求
~~~~~~~~~~~~

.. code-block:: python

    # 导入 Requests 模块
    import requests

    # 发送 GET 请求
    r = requests.get('https://api.github.com/events')
    # 返回 Response 对象

    # 其他请求
    r = requests.post('http://httpbin.org/post', data = {'key':'value'})
    r = requests.put('http://httpbin.org/put', data = {'key':'value'})
    r = requests.delete('http://httpbin.org/delete')
    r = requests.head('http://httpbin.org/get')
    r = requests.options('http://httpbin.org/get')

传递 URL 参数
~~~~~~~~~~~~~~~~

使用 `params` 关键字传递参数

.. code-block:: python

    payload = {'key1': 'value1', 'key2': 'value2', 'key3': None}
    r = requests.get("http://httpbin.org/get", params=payload)

    print(r.url)
    # http://httpbin.org/get?key2=value2&key1=value1
    # 字典里值为 None 的键都不会被添加到 URL 的查询字符串里

    # 也可以将一个列表作为值传入
    payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
    r = requests.get('http://httpbin.org/get', params=payload)

    print(r.url)
    # http://httpbin.org/get?key1=value1&key2=value2&key2=value3

Response
~~~~~~~~~~~

响应的编码
^^^^^^^^^^^^^^

每次访问 r.text 时, requests 都会基于 HTTP 头部对响应的编码作出推测, 并自动解码来自服务器的内容; 大多数 unicode 字符集都能被无缝地解码

.. code-block:: python

    r = requests.get('https://api.github.com/events')

    r.text
    # u'[{"repository":{"open_issues":0,"url":"https://github.com/...
    # 使用推测的编码来解码

    # 找出当前被使用的编码
    r.encoding
    # utf-8

    # 改变编码
    r.encoding = 'ISO-8859-1'

二进制响应内容
^^^^^^^^^^^^^^^^^

.. code-block:: python

    r.content
    # b'[{"repository":{"open_issues":0,"url":"https://github.com/...

JSON 响应内容
^^^^^^^^^^^^^^^^^

.. code-block:: python

    r = requests.get('https://api.github.com/events')
    r.json()
    # [{u'repository': {u'open_issues': 0, u'url': 'https://github.com/...

如果 JSON 解码失败, `r.json()` 就会抛出一个异常

.. note::

    成功调用 r.json() 并 **不** 意味着响应的成功

    有的服务器会在失败的响应中包含一个 JSON 对象 (比如 HTTP 500 的错误细节)

原始响应内容
^^^^^^^^^^^^^^

获取来自服务器的原始套接字响应; 需要在初始请求中设置 `stream=True`

.. code-block:: python

    r = requests.get('https://api.github.com/events', stream=True)
    r.raw
    # <requests.packages.urllib3.response.HTTPResponse object at 0x101194810>

    r.raw.read(10)
    # '\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03'

    # 推荐保存到文件
    with open(filename, 'wb') as fd:
        for chunk in r.iter_content(chunk_size):
            fd.write(chunk)

Request headers
~~~~~~~~~~~~~~~~~

