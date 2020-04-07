
Q&A
=====

区别: STATIC_URL, STATIC_ROOT AND STATICFILES_DIRS
----------------------------------------------------------------

.. image:: imgs/django_static.png

.. image:: imgs/django_static2.png


reference:

- https://stackoverflow.com/questions/8687927/difference-between-static-static-url-and-static-root-on-django
- https://stackoverflow.com/questions/24022558/differences-between-staticfiles-dir-static-root-and-media-root

`STATIC_ROOT`
~~~~~~~~~~~~~~

在 **development** 环境下, `STATIC_ROOT` 完全不起作用; Django 会在各个 app 的文件夹中搜索静态文件

在 **deployment** 环境下, 使用 `manage.py collectstatic` 命令后, 所有静态文件都会被存储到 `STATIC_ROOT` 所指定的文件夹中; 前提是

`django.contrib.staticfiles` 被登录在 `INSTALLED_APP` 中

deployment 环境下, Django 负责动态内容, 而静态文件交由更高效的 Nginx 提供; 只需在 Nginx 中设置 `STATIC_ROOT` 所指定的文件夹

`STATICFILES_DIRS`
~~~~~~~~~~~~~~~~~~~

除了每个 app 内的 static 文件夹之外, 额外存储静态文件的文件夹

`STATIC_URL`
~~~~~~~~~~~~~~~

`STATIC_ROOT` 中的静态文件被伺服时的 URL