
ECMAScript 6
============

面向对象
----------

OOP Object Oriented Programming

以对象为功能中心

特性:

- 封装
- 继承
- 多态

1. 抽取对象共用的属性和行为封装成一个类
2. 实例化类, 获取类的对象

创建类
~~~~~~~~~

.. code-block:: javascript

    class ClassName {
        // 构造函数
        constructor(para) {
            this.para = para; // this 指向调用者
        }

        // 方法
        fn() {
            ...
        }
    }

    // 实例化
    var c = new ClassName(val);
    console.log(c.para); // val
    c.fn();

继承类
~~~~~~~~~

.. code-block:: javascript

    class Parent {
        constructor(params) {
            ...
        }

        fn() {
            ...
        }
    }
    class Child extends Parent {
        constructor(params) {
            super(params); // 调用父类的 constructor
        }

        fn() {
            super.fn(); // 调用父类的方法
        }
    }
