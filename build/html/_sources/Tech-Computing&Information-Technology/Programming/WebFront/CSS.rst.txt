
CSS
====

Cascading Style Sheets

一种 *样式表* 语言, 用来描述 HTML 或 XML 文档的呈现

CSS 描述了在屏幕, 纸质, 音频等其它媒体上的元素应该如何被渲染的问题

下载 :download:`CSS参考手册 <../../../_static/Tech-front/css.chm>`


CSS Selectors 选择器
--------------------------------

See `Selectors Cheat Sheet <../../../_static/Tech-front/selectors.html>`_


元素的渲染 - 属性值的计算过程
--------------------------------

按文档的树形目录结构, 依次对文档中的元素计算所有对于元素可用的属性值 (从无到有) 并渲染

**计算过程:**

1. 确定声明值

    参考样式表中没有冲突的声明作为属性值

2. 层叠冲突

    对样式表中有冲突的声明使用层叠规则, 确定属性值

3. 使用继承

    对仍然没有值的属性, 若可以继承, 则继承父元素的值

4. 使用默认值

    对仍然没有值的属性, 使用默认值


CSS Cascade 层叠
~~~~~~~~~~~~~~~~~~~~~

决定了哪些属性被应用到所选择的元素上

只有有冲突的属性才会发生高优先级的属性覆盖掉低优先级的属性

**3个决定因素:**

1. 重要性 Importance
    由样式表的形式决定

    以下优先级从高到低

    .. list-table::
        :widths: auto
        :header-rows: 1
        :stub-columns: 1

        * - precedence
          -
          - origin
        * - 1
          - Transition declarations
          - css transition
        * - 2
          - Important user agent declarations

            (`!important`)
          - user agent
        * - 3
          - Important user declarations

            (`!important`)
          - user
        * - 4
          - Important author declarations

            (`!important`)
          - author
        * - 5
          - Animation declarations
          - css animation
        * - 6
          - Normal author declarations
          - author
        * - 7
          - Normal user declarations
          - user
        * - 8
          - Normal user agent declarations
          - user agent

2. 专用性 Specificity
    选择器的特殊程度, 即有多少元素会被选择

    用4个数字来衡量: x x x x (0 ~ 255)

    1. Thousands
        1 for properties declared in **`style` attribute**, aka inline styles

        0 for no `style` declarations
    2. Hundreds
        1 for each **ID selector** contained inside the overall selector

        0 for no ID selector
    3. Tens
        1 for each **class selector**, **attribute selector**, or **pseudo-class** contained inside the overall selector.

        0 for no above selectors
    4. Ones
        1 for each **element selector** or **pseudo-element** contained inside the overall selector.

        0 for no above selectors

    .. admonition:: 例

        .. list-table::
            :widths: auto
            :header-rows: 1
            :stub-columns: 1

            * - Selectors
              - Thousands
              - Hundreds
              - Tens
              - Ones
              - Results
            * - `h1`
              - 0
              - 0
              - 0
              - 1
              - 0001
            * - `#identifier`
              - 0
              - 1
              - 0
              - 0
              - 0100
            * - `h1 + p::first-letter`
              - 0
              - 0
              - 0
              - 3
              - 0003
            * - `li > a[href*="zh-CN"] > .inline-warning`
              - 0
              - 0
              - 2
              - 2
              - 0022
            * - `style="..."`
              - 1
              - 0
              - 0
              - 0
              - 1000

3. 源代码中的顺序 Source order
    对于相同重要性和专用性的选择器, 后面的规则的属性值将被应用


CSS Inheritance 继承
~~~~~~~~~~~~~~~~~~~~~~~

有些属性可以被元素的子元素继承 (有些不行)

- **4 special universal property values** for specifying inheritance:

    1. inherit
        property value be the same as that of its **parent** element.
    2. initial
        property value be the same as the value set for that element in the **browser's default** style sheet.

        If no value is set by the browser's default style sheet and the property is naturally inherited, then the property value is set to inherit instead.
    3. unset
        Resets the property to its natural value,

        which means that if the property is naturally inherited it acts like inherit, otherwise it acts like initial.
    4. revert
        Reverts the property to the value it would have had if the current origin had not applied any styles to it.

        In other words, the property's value is set to the user stylesheet's value for the property (if one is set),

        otherwise, the property's value is taken from the user agent's default stylesheet.

- **reset**

    The CSS shorthand property `all` can be used to apply one of above inheritance values to (almost) all properties at once.


CSS Box Model 盒模型
------------------------

网页布局的基础

|  每个元素被表示为一个矩形的方框,
|  框的内容, 内边距, 边界和外边距像洋葱膜那样一层包着一层构建起来.

Box Types 盒类型
~~~~~~~~~~~~~~~~~~~

- `display: block;` 块盒
    独占一行; 可以设置宽高

    常见有容器元素, headers, `p` 等

- `display: inline;` 行盒
    - 不独占一行
    - 随着盒内文本内容延伸; 无法用 `width`, `height` 设置宽高; 应使用字体大小, 行高, 字体类型等间接调整
    - border, padding, margin 设置仅在水平方向上有效; 垂直方向上不占据实际的空间

    常见有 `a`, `img`, `span`, `video`, `audio` 等

- `display: inline-block;` 行块盒
    - 不独占一行
    - 块盒的所有尺寸设置都有效

- `display: none`
    完全隐藏元素

.. code-block:: html

    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <span class="inline">Mauris tempus turpis id ante mollis dignissim.</span>
        Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
    </p>

    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <span class="block">Mauris tempus turpis id ante mollis dignissim.</span>
        Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
    </p>

    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <span class="inline-block">Mauris tempus turpis id ante mollis dignissim.</span>
        Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
    </p>

.. code-block:: css

    p {
        padding : 1em;
        border  : 1px solid black;
    }

    span {
        padding : 0.5em;
        border  : 1px solid green;

        /* That makes the box visible, regardless of its type */
        background-color: yellow;
    }

    .inline       { display: inline;       }
    .block        { display: block;        }
    .inline-block { display: inline-block; }

.. raw:: html

    <style>
        #test-container p {
            padding : 1em;
            border  : 1px solid black;
        }

        #test-container span {
            padding : 0.5em;
            border  : 1px solid green;

            /* That makes the box visible, regardless of its type */
            background-color: yellow;
        }

        #test-container .inline       { display: inline;       }
        #test-container .block        { display: block;        }
        #test-container .inline-block { display: inline-block; }
    </style>
    <div id="test-container" style="border: 3px solid black; width: 400px; height: 550px;">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <span class="inline">Mauris tempus turpis id ante mollis dignissim.</span>
            Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
        </p>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <span class="block">Mauris tempus turpis id ante mollis dignissim.</span>
            Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
        </p>

        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <span class="inline-block">Mauris tempus turpis id ante mollis dignissim.</span>
            Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
        </p>
    </div>

Box Components 组成
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: imgs/box-model.svg

由内而外:

1. 内容 content
2. 填充 (内边距) padding
3. 边框 border
4. 外边距 margin

**margin 和 padding 的简写**

.. figure:: imgs/margin.svg
    :width: 400
    :align: right

|  `margin` 属性包含了四个属性: `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
|  使用 `margin` 简写时按顺时针
|  `padding` 相同

.. code-block:: css

    /* 10px on all four sizes of the box */
    margin: 10px;
    /* 10px top/bottom; 12px left/right */
    margin: 10px 12px;
    /* 10px top; 12px left/right; 14px bottom */
    margin: 10px 12px 14px;
    /* 10px top; 12px right; 14px bottom; 16px left */
    margin: 10px 12px 14px 16px;

使用 `box-sizing` 改变宽高适用范围
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: imgs/box-sizing.svg
    :scale: 50%
    :width: 350
    :align: right

`width` 和 `height` 的适用范围由 `box-sizing` 属性决定:

- `box-sizing: content-box`
    默认情况下, `width` 和 `height` 只能改变 content-box 的宽高
- `box-sizing: border-box`
    包括 border 在内

使用 `background-clip` 改变背景覆盖范围
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: html

    <p class="border-box">The background extends behind the border.</p>
    <p class="padding-box">The background extends to the inside edge of the border.</p>
    <p class="content-box">The background extends only to the edge of the content box.</p>
    <p class="text">The background is clipped to the foreground text.</p>

.. code-block:: css

    p {
        border: .8em darkviolet;
        border-style: dotted double;
        margin: 1em 0;
        padding: 1.4em;
        background: linear-gradient(60deg, red, yellow, red, yellow, red);
        font: 900 1.2em sans-serif;
        text-decoration: underline;
    }

    .border-box { background-clip: border-box; }
    .padding-box { background-clip: padding-box; }
    .content-box { background-clip: content-box; }

    .text {
        background-clip: text;
        -webkit-background-clip: text;
        color: rgba(0,0,0,.2);
    }

.. raw:: html

    <style>
        .contianer2-test {
            width: 300px;
            display: inline-block;
            font-size: smaller;
        }

        .contianer2-test p {
            border: .8em darkviolet;
            border-style: dotted double;
            margin: 1em 0;
            padding: 1.4em;
            background: linear-gradient(60deg, red, yellow, red, yellow, red);
            font: 900 1.2em sans-serif;
            text-decoration: underline;
        }

        .contianer2-test .border-box { background-clip: border-box; }
        .contianer2-test .padding-box { background-clip: padding-box; }
        .contianer2-test .content-box { background-clip: content-box; }

        .contianer2-test .text {
            background-clip: text;
            -webkit-background-clip: text;
            color: rgba(0,0,0,.2);
        }
    </style>

    <div class="contianer2-test">
        <p class="border-box">The background extends behind the border.</p>
        <p class="padding-box">The background extends to the inside edge of the border.</p>
    </div>
    <div class="contianer2-test">
        <p class="content-box">The background extends only to the edge of the content box.</p>
        <p class="text">The background is clipped to the foreground text.</p>
    </div>

可替换元素和非可替换元素
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- 非可替换元素

    页面的显示结果取决与元素内容
- 可替换元素

    页面的显示结果取决与元素属性 (img, video, audio 等)

大部分可替换元素默认 `display: inline`, 但却类似于 `inline-block`, 所有尺寸设置都有效


Block Format Context (BFC)
---------------------------

- Web页面的可视化CSS渲染的一部分
- 块盒的布局过程所发生的区域
- 浮动元素与其他元素交互的区域

块格式化上下文对浮动定位与清除浮动都很重要:

- 浮动定位和清除浮动时只会应用于同一个BFC内的元素
- 浮动不会影响其它BFC中元素的布局, 而清除浮动只能清除同一BFC中在它前面的元素的浮动
- Margin collapsing 只会发生在属于同一BFC的块级元素之间

BFC的创建
~~~~~~~~~~~~

- `<html>`
- `float` != `none`
- `position` == `absolute / fixed`
- `display: inline-block;`
- `display` in `(inline-block, table-cell, table-caption, table, table-row, table-row-group, table-header-group, table-footer-group, inline-table)`
- `display: flow-root;`
- `display` == `flex / inline-flex`
- `display` == `grid / inline-grid`
- `overflow` != `visible`
- `contain` in `(layout, content, strict)`
- `column-count / column-width` != `auto`
- `column-span: all;`


@-rules
-------

See `@ rules cheat sheet <../../../_static/Tech-front/at-rules.html>`_

Layout
-------

Normal flow
~~~~~~~~~~~~~~~~~~~~~~

|  常规流, 浏览器对 HTML 页面的默认排列
|  即块盒从上至下独占一行, 行盒从左至右依次排列

margin collapsing
^^^^^^^^^^^^^^^^^^^^^^

相邻块盒的 margin 若直接接触 (没有被 border 之类的分开), 则较大的 margin 保留, 较小的 margin 消失

margin collapsing 在 sibling-sibling 和 parent-child 中都会发生 (parent-child 中可以使用 parent 的 padding 来代替; 或者为 parent 设置 `overflow: hidden;` 来创建 BFC)

Contaning Block
~~~~~~~~~~~~~~~~~~~~~~

包含块, 大部分情况下决定了其内部元素的尺寸和位置; 一个元素的包含块通常是其 parent 的 contetn-box

确定包含块
^^^^^^^^^^^^^

一个元素的包含块由其 `position` 决定:

- `position: static/relative;`
    包含块为以下元素的 content-box

    - ancestors 中最近的 **块元素** (e.g. inline-block, block or list-item)
    - formatting context 格式化上下文 (table container, flex container, grid container, or the block container itself)

- `position: absolute;`
    包含块由其 ancestors 中最近的 `position` 值为 `fixed/absolute/relative/sticky` 的元素的 content-box 决定

- `position: fixed;`
    the containing block is established by the viewport (in the case of continuous media) or the page area (in the case of paged media).

- `position: absolute/fixed`
    containing block may also be formed by the edge of the padding box of the nearest ancestor element that has the following:

    - A transform or perspective value other than none
    - A will-change value of transform or perspective
    - A filter  value other than none or a will-change value of filter (only works on Firefox).
    - A contain value of paint (e.g. contain: paint;)

包含块中元素的尺寸
^^^^^^^^^^^^^^^^^^^^^^^

- **宽度**:

    - 块盒默认 `width: auto;`, 宽度占据包含块宽度的 100%
    - `margin-left: 0; margin-right: auto`, 即 content+padding+border+margin 的宽度仍然无法占据 100% 时, 由 `margin-right` 填充
    - 这里的 `auto` 表示占据剩余空间; `width: auto;` 优先于 `margin: auto;`

- **高度**:

    - 块盒默认 `height: auto;`, 高度由内容的高度决定
    - `margin-top: auto; margin-bottom: auto`, 默认为 0

- **Percentage**:

    - height 的 % 由包含块的 height 决定; 如果包含块的 height 由其内容决定 (i.e. 包含块的 height 未设置), 且包含块 `position: relative/static`, 则子元素的高度 % 无效
    - width, padding, margin 的 % 由包含块的 width 决定

Flexbox
~~~~~~~~~~~~~~~~~~~~~~

|  CSS3 的一种新的布局模式, 是一种当页面需要适应不同的屏幕大小以及设备类型时, 确保元素拥有恰当的行为的布局方式
|  目的是提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间

See `Flexbox Cheat Sheet <../../../_static/Tech-front/flexbox.html>`_


Grid
~~~~~~~~~~~~~~~~~~~~~~

Floats & Positioning
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: html

    <!-- 将 `div` 元素全部设置成 `display: inline-block;`, 可以实现多个 `div` 在同一行内 -->
    <style>
    div {
        display: inline-block;
    }
    </style>
    <div id="1"></div>
    <div id="2"></div>
    <div id="3"></div>
    <!-- 然而因为源代码内有换行, 所以结果的 `div` 之间会有空隙, 大小受 `font-size` 影响 -->
    <!-- 为了代码的可读性, 可使用 `float` 等 -->

See `Float & Positioning Cheat Sheet <../../../_static/Tech-front/position-float.html>`_

Table layout
~~~~~~~~~~~~~~~~~~~~~~

Multiple-column layout
~~~~~~~~~~~~~~~~~~~~~~
