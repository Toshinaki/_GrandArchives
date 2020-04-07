
CSS Centering
==============

Horizontally Centering
----------------------

inline / inline-block box
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: css

    parent-element {
        text-align: center;
    }

block box
~~~~~~~~~~~

normal flow
^^^^^^^^^^^^

1. set `width`, left & right `margin` get rest space

.. code-block:: css

    elemet {
        width: xxx; /* fix width */
        margin-left: auto;
        margin-right: auto;
    }

`absolute` or `fixed` positioned element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. set `width`, `left` & `right` to 0, left & right `margin` get rest space

.. code-block:: css

    element {
        width: xxx; /* fix width */
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
    }

Vertically Centering
--------------------

inline / inline-block box
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. in one line
    
    set element's `line-height` == `height`

2. in multi-line inline-block / block box

???

block box
~~~~~~~~~~~

`absolute` or `fixed` positioned element
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. set `height`, `top` & `bottom` to 0, top & bottom `margin` get rest space

.. code-block:: css

    element {
        height: xxx; /* fix heifht */
        top: 0;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
    }

2. set `width` & `height`, move 50% from top and left, transform half of self's size

.. code-block:: css

    element {
        width: xxx;
        height: xxx;
        /* top and left referencing parent's size */
        /* move top-left corner of child to parent's center */
        top: 50%;
        left: 50%;
        /* transform referencing self's size */
        /* move half of self's width and height back */
        transform: translate(-50%, -50%);
    }