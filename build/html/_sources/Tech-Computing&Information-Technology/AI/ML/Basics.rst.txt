Machine Learning Basics
========================

概念
-------

机器学习: 对数据进行反复的分析和学习, 以找出数据中潜在的模式, 并以此为基础进行判断和预测

类型
-------

以是否有人类监督 (human supervision) 划分
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

监督学习 supervised
^^^^^^^^^^^^^^^^^^^^^^^

通过学习已知类别的样本来对新的数据进行预测

- 输入: labeled data
- 输出: a model (**classifier** / **regressor**)
- 目的: 找出使得 model 的预测与现实之间的差距 (cost) 最小的 parameters

.. admonition:: 用数学语言表示

    设 :math:`x` 为数据的一个实例

    :math:`y = f(x)` 为与 :math:`x` 对应的标签 (即为 :math:`x` 的 **ground truth**)

    :math:`g(x)` 为 model 对 :math:`x` 的预测

    :math:`\theta` 为 model 的 parameters

    :math:`\rightarrow` 得到 :math:`g(x|\theta)` 即为 model

    而 **cost** 为 :math:`g(x|\theta)` 与 :math:`y` 之间的距离

    .. math::

        \theta^* = argmin_{\theta}Cost(\theta|X)

    其中:

    .. math::

        Cost(\theta|X) = \sum_{x \in X}\|g(x|\theta) - f(x)\|

无监督学习 unsupervised
^^^^^^^^^^^^^^^^^^^^^^^^^

不给定已知类别的样本, 由算法从输入的数据中寻找规律并进行分类

- 输入: unlabeled data
- 输出: a model

通常用于:

- 聚类 clustering
- 可视化与降维 visualization and dimensionality reduction (Principle Component Analysis, autoencoder...)
- 异常检测 anomaly detection
- 关联规则学习 association rule learning (在大型数据库中发现变量之间的兴趣关系的方法, 如购买某样商品的顾客更倾向于购买特定的商品)

半监督学习 semisupervised
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

强化学习 reinforcement learning
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

观察 **environment** 对 **actions** 的反应, 并对所得到的 **information** 进行学习

以是否实时学习 (learn on the fly) 划分
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Online Learning
^^^^^^^^^^^^^^^^^

通过顺序输入数据（单个数据或 *小批量 mini-batch*）进行增量学习; 也可用于巨量数据的学习 (核外学习 out-of-core learning; 无法同时将所有数据放入内存中)

当存在坏数据时会影响训练结果

**learning rate**: 算法多快适应新的数据

Batch Learning (offline)
^^^^^^^^^^^^^^^^^^^^^^^^^

一次训练之后便不再学习; 当有新的训练数据时需要对 model 进行版本更新

以训练方式划分
~~~~~~~~~~~~~~~~~~~

基于实例 instance-based
^^^^^^^^^^^^^^^^^^^^^^^^^^

简单地将新数据和已有数据进行对比, 使用相似性度量将结论推广到新数据

基于模型 model-based
^^^^^^^^^^^^^^^^^^^^^^^^^^

建立 model 并作出预测

目标
-------

- 机器学习的目标为创建能够将输入转化成所需输出的算法
- 由程序员决定算法的一些细节, 其余部分留作未知数
- 而这些未知数由机器学习通过所给予的数据找出

算法即为 **model**, 未知部分即为 **parameters**

步骤
--------

1. 发现问题
2. 收集数据
3. 预处理数据
4. 建模
5. 测试模型
6. 解决问题

.. image:: ./imgs/ml_processes.jpg

常见问题
------------

Bad data
~~~~~~~~~~

- 训练用数据量不足

    大部分机器学习算法都需要许多训练数据

- 训练数据没有代表性

    训练数据具有代表性对算法能否泛化至关重要

    可能的原因:

    - *sampling noise* (small sample; by chance)
    - *sampling bias* (by flawed sampling method)

- 低质量数据

    - 含有大量错误, 离群值和噪音的数据
    - 有缺失值的数据

- 不相关的特性

Bad algorithm
~~~~~~~~~~~~~~

Overfitting
^^^^^^^^^^^^^

过拟合是指 model 为了拟合训练数据中的噪音而变得过于复杂, 以至于无法对测试数据做出正确预测

    对未知数据进行正确预测的能力叫做泛化能力 (generalization ability)

可能的解决方法:

- 通过选择 parameters 数更少的 model, 减少训练数据中的 attributes 数量, 或限制 model (regularization), 来简化 model
- 收集更多数据
- 减少数据中的噪音
- 具体到特定的 model, 还会有 model 特定的解决方法

Underfitting
^^^^^^^^^^^^^^

model 过于简单, 无法学习数据中潜在的结构

可能的解决方法:

- 选择拥有更多 parameters 的更加复杂的 model
- Feeding better features to the learning algorithm (feature engineering)
- 减少 model 的限制

判断 model 是否过拟合或欠拟合
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- cross-validation

    使用 cross-valition, 若 model 在训练数据上表现良好, 但却无法泛化至测试数据, 则 model 过拟合;

    而若 model 在训练数据和测试数据上表现都很差, 则 model 欠拟合

- learning curve

    分别画出不同数据量下的训练数据和验证数据的表现

    如:

    .. figure:: ./imgs/learning-curve.png

    - 当数据量很少时, model 可以完美拟合数据; 但当数据量增长时, 由于数据中的噪音及其非线性, model 的 error 会逐渐增加, 直到到达一个稳定值
    - 而当数据量很少时, model 不可能泛化至验证数据, 因此 error 很高; 但当 model 学习更多数据后, 验证中的 error 也会逐渐降低, 直到到达接近另一条曲线的稳定值

    若训练数据的曲线远远小于验证数据的曲线, 且二者之间间隙很大, 即 model 在训练数据上的表现远远超过验证数据, 则可以认为 model 过拟合

偏差方差权衡
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Bias / Variance Tradeoff

统计和机器学习中的一个重要的理论结果是, model 的泛化误差 (generalization error) 可以表示为 3 种不同的误差之和:

- Bias 偏差

    此误差出于错误的假设, 比如假设数据是线性的而其实际上是二次的

    偏差过高的 model 很有可能欠拟合数据

- Variance 方差

    此误差出于 model 对数据中的细微变化过于敏感

    当 model 的自由度 (degrees of freedom) 过高时, 如一个高阶多项式, 其方差可能会很高, 因此过拟合数据

- Irreducible error

    不可避免的误差; 此误差出于数据本身所含有的噪音

    只有对数据进行筛选才有可能减少这种误差

增加 model 复杂度时往往会增加其方差并减少其偏差; 相反, 减少 model 复杂度时往往会增加其偏差并减少其方差

This is why it is called a tradeoff.