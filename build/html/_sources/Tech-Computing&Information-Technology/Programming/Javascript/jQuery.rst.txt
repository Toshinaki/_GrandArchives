
jQuery
=======

Javascript 库 (library), 封装好的方法和函数的集合

基础
-------

jQuery 入口函数
~~~~~~~~~~~~~~~~~~

DOM 加载完毕再执行代码:

.. code-block:: javascript

    // 1
    $(document).read(function() {
        ...
    });

    // 2
    $(function() {
        ...
    });

jQuery 顶级对象 `$`
~~~~~~~~~~~~~~~~~~~~~~~

- `$` 是 `jQuery` 的别称, 可以互相替换
- `$` 是 jQuery 的顶级对象, 相当于 Javascript 中的 window; 把元素用 `$` 包装成 jQuery 对象, 就可以调用 jQuery 方法

jQuery 对象和 DOM 对象
~~~~~~~~~~~~~~~~~~~~~~~~

- 用原生 JS 获取的对象是 DOM 对象

    只能使用原生 js 的属性和方法

- 用 jQuery 获取的对象是 jQuery 对象

    只能使用 jQuery 的属性和方法

转换:

.. code-block:: javascript

    // DOM -> jQuery
    $(DOM);

    // jQuery -> DOM
    $(selector)[index];
    $(selector).get(index);

jQuery 常用 API
------------------

jQuery 选择器
~~~~~~~~~~~~~~~

隐式迭代
    对选择器获取到的所有元素进行遍历, 执行相应的方法

操作 css
~~~~~~~~~~~

.. code-block:: javascript

    // 获取当前 css 样式
    $(selector).css(stylename);
    
    // 设置 css 样式
    $(selector).css(stylename, value);

    // 设置多个 css 样式
    $(selector).css({
        stylename1: value1,
        stylename2: value2,
        ...
    });

操作类
~~~~~~~~~~~~~

.. code-block:: javascript

    // 添加
    $(selector).addClass(classname);

    // 删除
    $(selector).removeClass(classname);

    // 切换
    $(selector).toggleClass(classname);

jQuery 效果
~~~~~~~~~~~~~

动画队列
    动画或效果一旦触发就会执行, 如果多次触发, 就会造成多个动画或效果排队执行

    使用 `stop()` 可以停止上一次的动画

.. code-block:: javascript

    // 显示 & 隐藏
    show([speed, [easing], [fn]]);
    hide([speed, [easing], [fn]]);
    toggle([speed, [easing], [fn]]);

    // 滑动
    slideDown([speed, [easing], [fn]]);
    slideUp([speed, [easing], [fn]]);
    slideToggle([speed, [easing], [fn]]);

    // 淡入淡出
    fadeIn([speed, [easing], [fn]]);
    fadeOut([speed, [easing], [fn]]);
    fadeToggle([speed, [easing], [fn]]);
    fadeTo([[speed], opacity, [easing], [fn]]);

    // 自定义动画
    animate(params, [speed], [easing], [fn]);

jQuery 属性
~~~~~~~~~~~~~~

.. code-block:: javascript

    // 获取 & 设置固有属性
    ele.prop(property_name);
    ele.prop(property_name, value);

    // 获取 & 设置自定义属性
    ele.attr(attribute_name);
    ele.attr(attribute_name, value);

    // data
    ele.data(name, value); // 数据存放在内存中
    ele.data(name); // 可用于获取 HTML5 的 data- 属性

jQuery 操作内容
~~~~~~~~~~~~~~~~~

.. code-block:: javascript

    // 获取 & 设置所有内容
    ele.html();
    ele.html(html);

    // 获取 & 设置文本内容
    ele.text();
    ele.text(text);

    // 获取 & 设置表单值
    ele.val();
    ele.val(value);

jQuery 操作元素
~~~~~~~~~~~~~~~~~

- 遍历

    .. code-block:: javascript

        $(selector).each(function(index, DOM_ele) {
            ...
        });

        $.each(collector, function(index, ele) {
            ...
        });

- 增删改元素

    .. code-block:: javascript

        // 放到子元素的最后
        ele.append(child);
        // 放到子元素的最前
        ele.prepend(child);

        // 放到元素后面
        ele.after(sibling);
        // 放到元素前面
        ele.before(sibling);

        // 删除元素自身
        ele.remove()
        // 删除元素所有子节点
        ele.empty()
        ele.html('')

jQuery 尺寸 & 位置
~~~~~~~~~~~~~~~~~~~~

- width() / height()

    content box

- innerWidth() / innerHeight()

    padding box

- outerWidth() / outerHeight()

    border box

- outerWidth(true) / outerHeight(true)

    margin box

- offset().top, offset().left

    元素相对于文档的偏移; 可以获取 & 设置

- position().top, position().left

    元素相对于定位父元素的偏移; 只能获取

- scrollTop(), scrollLeft()

    文档滚动的距离; 可以获取 & 设置


jQuery 事件
-------------

用 `on()` 绑定事件
~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

    $(selector).on({
        event1: function() {
            ...
        },
        event2: function() {
            ...
        }
    });

    $(selector).on('event1 event2', function() {
        ...
    });

事件委派
~~~~~~~~~~

.. code-block:: javascript

    // 可用于动态创建的元素
    $(parent).on('event', child, function() {
        ...
    });

用 `off()` 绑定事件
~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

    // 解除所有事件
    $(selector).off();
    // 解除特定事件
    $(selector).off('event')
    // 解除事件委托
    $(parent).off('event', child)


用 `one()` 触发事件一次
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

    $(selector).one('event', function() {
        ...
    });

`trigger()` 触发事件
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

    $(selector).event();

    $(selector).trigger('event');

    $(selector).triggerHandler('event'); // 不会触发元素默认行为

