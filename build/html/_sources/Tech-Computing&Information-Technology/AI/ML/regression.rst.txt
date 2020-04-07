Regression Analysis
====================

回归分析用于了解两个或多个变量之间是否相关, 相关方向和强度, 并建立数学模型 (即自变量 `X` 与因变量 `Y` 之间关系的模型) 以预测特定变量

Linear Regression
-------------------

**线性回归** 是指使用线性回归方程对因变量与一个或多个自变量之间的关系进行建模 (只有一个自变量时称为 **简单线性回归**; 有多个自变量时称为 **多元回归** multivariable linear regression)

模型进行预测时, 可通过计算所有自变量的加权和 (weighted sum), 加上一个偏置项 (bias term, 或称截距项 intercept term) 得到预测结果

:math:`\hat y = \theta_0 + \theta_1x_1 + \theta_2x_2 + ... + \theta_nx_n`

(或者使用其向量化的形式 (vectorized form): :math:`\hat y = h_{\theta}(\textbf X) = \theta^T \cdot \textbf X` )

其中:

- :math:`\hat y` 是预测值
- :math:`n` 是特性数
- :math:`x_i` 是第 :math:`i` 个特性
- :math:`\theta_j` 是第 :math:`j` 个模型参数 (:math:`\theta_0` 是偏置项, 其他是特性的加权)

可以看到, 自变量对因变量的影响大小由其系数决定

最小化损失函数
~~~~~~~~~~~~~~~

线性回归模型的优化, 即是找到使得预测值与观测值之间的距离最小的模型参数

在实际操作中, 经常使用 Mean Square Error (MSE) 来测量预测值与观测值之间的距离:

.. math::

    J(\theta) = MSE(X, h_{\theta}) = \frac{1}{m}\sum_{i=1}^{m}(\theta^T \cdot X^{(i)} - y^{(i)})^2

模型优化的问题即被转换成最小化损失函数 :math:`MSE(X, h_{\theta})` 的问题 (以下简写为 :math:`MSE(\theta)`)

Normal Equation
^^^^^^^^^^^^^^^^^^

最小二乘法 least squares method

在最小化损失函数时, 可以使用其封闭解 (closed-form solution):

.. math::

    \hat \theta = (\textbf X^T \cdot \textbf X)^{-1} \cdot \textbf X^T \cdot y

其中:

- :math:`\hat \theta` 即是使得损失函数最小的参数

.. code-block:: python

    import numpy as np
    from sklearn.linear_model import LinearRegression

    # y = 1 * x_0 + 2 * x_1 + 3
    X = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])
    y = np.dot(X, np.array([1, 2])) + 3

    reg = LinearRegression().fit(X, y)
    reg.score(X, y) # Return the coefficient of determination R^2 of the prediction
    # 1.0
    reg.coef_
    # array([1., 2.])
    reg.intercept_
    # 3.0000...

    reg.predict(np.array([[3, 5]]))
    # array([16.])

然而当特性数量过多, 或内存无法完全容纳所有数据时, Normal Equation 无法使用

Gradient Descent
^^^^^^^^^^^^^^^^^^^^

梯度下降适用于很多优化问题, 其核心思想为通过迭代地调整参数来最小化损失函数

1. 选取随机的 :math:`\theta` 值 (*random initialization*)
2. 一次一小步逐渐优化 :math:`\theta`, 直到损失函数收敛至最小

.. figure:: ./imgs/gradient_descent.png
    :scale: 40%

- **Learning Rate**
    超参数 (hyperparemeter) learning rate, 控制每次梯度下降的步子大小

    太小会导致算法需要许多步才能收敛; 太大则可能会导致算法无法收敛

    .. figure:: ./imgs/small_learning_rate.png
        :scale: 30%

    .. figure:: ./imgs/large_learning_rate.png
        :scale: 30%

- pitfalls
    并不是所有损失函数都有光滑的函数图像; 梯度下降可能会收敛于局部最小值, 也可能要花很久才能收敛

    .. figure:: ./imgs/gd_pitfalls.png
        :scale: 50%

    而 MSE 损失函数是一个凸函数 (convex function), 因此梯度下降一定会收敛于全局最小值

Batch Gradient Descent
^^^^^^^^^^^^^^^^^^^^^^^^

1. 实现梯度下降时, 需要利用偏导数 (**partial derivative**) 对每一个 :math:`\theta_j` 计算其梯度:

    .. math::

        \frac{\partial}{\partial \theta_j}MSE(\theta) = \frac{2}{m}\sum_{i=1}^m(\theta^T \cdot X^{(i)} - y^{(i)})x_j^{(i)}

    可以得到梯度向量 :math:`\nabla_{\theta}MSE(\theta)`:

    .. math::

        \nabla_{\theta}MSE(\theta) = \begin{pmatrix} \frac{\partial}{\partial \theta_0}MSE(\theta) \\ \frac{\partial}{\partial \theta_1}MSE(\theta) \\ \cdot \\ \cdot \\ \cdot \\ \frac{\partial}{\partial \theta_j}MSE(\theta) \end{pmatrix} = \frac{2}{m}\textbf X^T \cdot (\textbf X \cdot \theta - y)

    - 当只有一个参数时, 梯度就是损失函数的微分, 代表着函数在某个给定点的切线的斜率
    - 在多变量函数中, 梯度是一个向量, 向量有方向, 梯度的方向就指出了函数在给定点的上升最快的方向

2. 沿着梯度的反方向, 即损失函数下降最快的方向, 按照 learning rate :math:`\eta` 所规定的步子找出 :math:`\theta^{(next step)}`:

    .. math::

        \theta^{(next step)} = \theta - \eta\nabla_{\theta}MSE(\theta)

3. 之所以被称为 *批量* 梯度下降, 是因为在每次迭代中, 所有数据行都参与了计算

如何找到合适的 learning rate:
    使用 grid search, 并设置很大的循环数, 当梯度很小时 (:math:`\lt \epsilon`, 意味着梯度下降已经十分接近最小值了), 中断算法

.. code-block:: python

    eta = 0.1 # learning rate
    n_iterations = 1000
    m = 100

    theta = np.random.randn(2,1) # random initialization

    for iteration in range(n_iterations):
        gradients = 2/m * X.T.dot(X.dot(theta) - y)
        theta = theta - eta * gradients

Stochastic Gradient Descent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

批量梯度下降在每一次迭代中都使用了所有数据行, 与其相反, 随机梯度下降在每一次迭代中从训练数据中只随机选取一个数据行用于计算梯度; 这使得随机梯度下降计算速度很快, SGD 也可被实现为核外算法

而由于其随机性, SGD 不会直接朝着最小值下降, 只会在平均上表现出下降; 并且算法最终只会十分接近最小值并在其周围跳跃

.. image:: ./imgs/SGD.png

同样由于损失函数的不规则, 相比梯度下降, 随机梯度下降有更高的几率跳出局部最小值, 从而找到全局最小值

**模拟退火 simulated annealing**
    随机性有利于避免局部最小值, 却会导致无法真正到达最小值

    通过在每次迭代时使用 **learning schedule** 函数逐渐减小 learning rate, 可以使得算法能够到达最小值

.. code-block:: python

    n_epochs = 50
    t0, t1 = 5, 50 # learning schedule hyperparameters

    def learning_schedule(t):
        return t0 / (t + t1)

    theta = np.random.randn(2,1) # random initialization

    for epoch in range(n_epochs):
        for i in range(m):
            # 这样无法保证每个 epoch 中, 所有数据行都会被选上
            # 也可以每次随机打乱数据组, 然后对每个数据行以此计算
            # 但通常现在使用的方法收敛更快
            random_index = np.random.randint(m)
            xi = X[random_index:random_index+1]
            yi = y[random_index:random_index+1]
            gradients = 2 * xi.T.dot(xi.dot(theta) - yi)
            eta = learning_schedule(epoch * m + i)
            theta = theta - eta * gradients

    # 或者使用 scikit-learn
    from sklearn.linear_model import SGDRegressor
    sgd_reg = SGDRegressor(n_iter=50, penalty=None, eta0=0.1)
    sgd_reg.fit(X, y.ravel())

**Early Stopping**
    另一种正则化迭代算法的方法是 Early Stopping; 每次迭代时同时计算 validation error, 当 validation error 到达最小时停止迭代

    .. image:: ./imgs/early-stopping.png


Mini-batch Gradient Descent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

每次迭代使用随机的小批量数据

Polynomial regression
----------------------

多项式回归是回归分析的一种形式, 其中自变量 x 和因变量 y 之间的关系被建模为关于 x 的 n 次多项式

虽然多项式回归是拟合数据的非线性模型, 但由于参数的估计采用的是线性方法, 因此多项式回归被认为是多元线性回归的特例

计算方法与线性回归相同:

.. code-block:: python

    from sklearn.preprocessing import PolynomialFeatures
    # 添加多次项
    poly_features = PolynomialFeatures(degree=2, include_bias=False)
    X_poly = poly_features.fit_transform(X)

    # 然后使用线性回归
    lin_reg = LinearRegression()
    lin_ref.fit(X_poly, y)

.. note::

    1. `PolynomialFeatures(degree=d)` 会将 n 个特性转换成 :math:`\frac{(n+d)!}{d!n!}` 个特性

    2. 次数太高会导致模型的过拟合


Regularized Linear Models
----------------------------

正则化的线性模型: 基于惩罚对线性模型进行约束 (在损失函数后面添加一个额外项), 控制模型复杂度, 减小过拟合

所谓 "惩罚" 是指对损失函数中的某些参数做一些限制; 常用惩罚项有:

L1 正则化
~~~~~~~~~~~

权值向量 :math:`\theta` 中各个元素的绝对值之和, 通常表示为 :math:`||\theta||_1`

使用 L1 正则化作为损失函数的惩罚项的线性回归为 **Lasso 回归**

Lasso 回归的损失函数为

.. math::

    J(\theta) = MSE(\theta) + \alpha\sum_{i=1}^n|\theta_i|

:math:`\alpha` 控制了模型被正则化的程度:

- 如果 :math:`\alpha = 0`, 则 Ridge Regression 就是线性回归
- 如果 :math:`\alpha` 很大, 则所有加权都会很接近 0, 结果是一条经过平均值的平坦的直线

.. figure:: ./imgs/lasso_alpha.png

    不同 :math:`\alpha` 对结果的影响

    左图直接使用了 Lasso 回归, 结果是线性的; 右边则先添加了高次项, 并进行了缩放, 最后才使用了 Lasso 回归

.. code-block:: python

    from sklearn.linear_model import Lasso
    lasso_reg = Lasso(alpha=0.1)
    lasso_reg.fit(X, y)

    # or with SGD
    sgd_reg = SGDRegressor(penalty='l1')
    sgd_reg.fit(X, y)

L2 正则化
~~~~~~~~~~~

权值向量 :math:`\theta` 中各个元素的均方误差 (为了方便后续处理, 对 :math:`L_2` 范数进行了平方), 通常表示为 :math:`||\theta||_{2}^{2}`

使用 L2 正则化作为损失函数的惩罚项的线性回归为 **Ridge 回归** (这个惩罚项也叫做也叫 Tikhonov regularization)

Ridge 回归的损失函数为

.. math::

    J(\theta) = MSE(\theta) + \alpha\frac{1}{2}\sum_{i=1}^n\theta_i^2

.. figure:: ./imgs/ridge_alpha.png

    不同 :math:`\alpha` 对结果的影响

    左图直接使用了 Ridge 回归, 结果是线性的; 右边则先添加了高次项, 并进行了缩放, 最后才使用了 Ridge 回归

其封闭解为:

.. math::

    \hat \theta = (\textbf X^T \cdot \textbf X + \alpha \textbf A)^{-1} \cdot \textbf X^T \cdot y

其中, :math:`\textbf A` 是 :math:`n \times n` 的单位矩阵 (identity matrix), 不过其左上角为 0, 对应了偏置项

.. code-block:: python

    from sklearn.linear_model import Ridge
    ridge_reg = Ridge(alpha=1, solver='cholesky')
    ridge_reg.fit(X, y)

    # or with SGD
    sgd_reg = SGDRegressor(penalty='l2')
    sgd_reg.fit(X, y)
    # The penalty hyperparameter sets the type of regularization term to use. Specifying "l2" indicates that SGD add a regularization term to the cost function equal to half the square of the ℓ2 norm of the weight vector: this is simply Ridge Regression.


Lasso 和 Ridge 的差异
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: imgs/l1-l2-regularization.png
   :scale: 60%

左图对应于 Lasso 方法, 右图对应于 Ridge 方法

如上图所示, 两个图是对应于两种方法的等高线与约束域; 红色的椭圆为原损失函数的一条等高线, :math:`\hat{\beta}` 为椭圆的中心点, 为对应普通线性模型的最小二乘估计; 左右两个图的区别在于约束域, 即对应的蓝色区域

等高线和约束域的切点就是目标函数的最优解:

- Ridge 方法对应的约束域是圆, 其切点只会存在于圆周上, 不会与坐标轴相切, 则在任一维度上的取值都不为 0, 因此没有稀疏

    .. image:: ./imgs/l2-ridge.jpg

    如图, 由于约束条件的限制,  参数必须位于圆内

    考虑边界上的一点 :math:`w`, 图中蓝色箭头为损失函数在该处的梯度方向, 红色箭头为圆在该处的法线方向

    由于 :math:`w` 不能离开边界 (否则违反约束条件), 因而在使用梯度下降法更新 :math:`w` 时, 只能朝梯度方向在圆上 :math:`w` 处的切线方向更新, 即图中绿色箭头的方向

    如此 :math:`w` 将沿着边界移动, 当梯度方向与圆上 梯度方向 处的法线平行时, 此时梯度方向在切线方向的分量为 0, :math:`w` 将无法继续移动, 从而达到最优解 (图中红色点所示)

- 对于 Lasso 方法,其约束域是正方形, 会存在与坐标轴的切点, 使得部分维度特征权重为 0, 因此很容易产生稀疏的结果

    .. image:: ./imgs/l1-lasso.jpg

    同上

所以, Lasso 方法可以达到变量选择的效果, 将不显著的变量系数压缩至 0; 而 Ridge 方法虽然也对原本的系数进行了一定程度的压缩, 但是任一系数都不会压缩至 0, 最终模型保留了所有的变量.

Elastic Net
~~~~~~~~~~~~~

当 Lasso 回归将太多特征稀疏为0, 而岭回归下降太慢时, 可以使用 Elastic Net 综合二者以得到比较好的结果

Elastic Net 的随时函数为:

.. math::

    J(\theta) = MSE(\theta) + r\alpha\sum_{i=1}^n|\theta_i| + \frac{1-r}{2}\alpha\sum_{i=1}^n\theta_i^2

其中, :math:`r` 是 Lasso 和 Ridge 的混合比例

.. code-block:: python

    from sklearn.linear_model import ElasticNet
    elastic_net = ElasticNet(alpha=0.1, l1_ratio=0.5)
    elastic_new.fit(X, y)

Logistic Regression
----------------------

回归分析通常用于数值预测, 而 **逻辑回归** 使用与回归类似的思路解决了分类问题

逻辑回归通常用于评估某个实例属于特定类的概率; 概率大于 50% 时, 则判断属于特定类, 否则不属于; 如此, 逻辑回归为一个二元分类器 (当有多类时, 执行多次分类即可)

逻辑回归类似 SVM, 都是在空间中找到曲线, 将数据点按相对曲线的位置分成两类

概率评估
~~~~~~~~~~~

1. 逻辑回归和线性回归一样, 计算所有特性的加权和 (使用一个线性方程), 但这样的结果无法得到类标号, 而是返回结果的 logistic

    .. math::

        \hat p = h_{\theta}(\textbf X) = \sigma(\theta^T \cdot \textbf X)

    其中,

    - :math:`\hat p` 即为所预测的概率
    - :math:`\sigma(\cdot)` 即为 logistic (也叫 logit), 是一个 sigmoid function (一个 S 型曲线)

        .. math::

            \sigma(t) = \frac{1}{1+e^{-t}}

        .. image:: ./imgs/sigmoid.png

    Sigmoid 函数还有一个好处, 那就是因为其取值在 0, 1 之间, 所以可以看做是数据属于类 1 的后验概率, 即 :math:`p(y=1|X)`

    这一点从图像也可以看出：t 的值越大, 表明数据的空间位置距离分类面越远, 他就越可能属于类 1, 所以图中 t 越大, 函数值也就越接近 1;同理, z 越小, 表明数据越不可能属于类 1

2. 得到评估概率 :math:`\hat p = h_{\theta}(\textbf X)` 后, 再应用阶跃函数 (step sunction) 便很容易进行预测

    .. math::

        \hat y =
        \begin{cases}
        0 & \text{if } \hat p \lt 0.5 (t \lt 0),
        \\
        1 & \text{if } \hat p \geq 0.5 (t \geq 0)
        \end{cases}

损失函数
~~~~~~~~~~

由于 :math:`\sigma(t)` 的值可以看作数据属于类 1 的后验概率, 可以得到:

.. math::

    p(y=1|X;\theta) = \sigma(t) \\
    p(y=0|X;\theta) = 1 - \sigma(t)

也可以写成

.. math::

    p(y|X;\theta) = \sigma(t)^y(1 - \sigma(t))^{1-y}

由上式可得给定数据集 :math:`X` 的联合概率为

.. math::

    \prod_{i=1}^m p(y_i|X_i;\theta)

联合概率越大, 说明模型的学习结果与真实情况越接近; 联合概率越小, 说明模型的学习结果与真实情况越背离

因此只需找出使得联合概率最大的参数 :math:`\theta` 即可

使用最大似然估计 (Maximum Likelihood Estimation, MLE) 写出损失函数为

.. math::

    J(\theta) = -\frac{1}{m}\sum_{i=1}^m[y^{(i)}log(\hat p^{(i)}) + (1-y^{(i)})log(1-\hat p^{(i)})]

此损失函数没有封闭解, 但其为凸函数, 因此可用梯度下降找到全局最小值

而每个参数的偏导数为

.. math::

    \frac{\partial}{\partial\theta_j}J(\theta) = \frac{1}{m}\sum_{i=1}^m(\sigma(\theta^T \cdot \textbf X^{(i)}) - y^{(i)})x_j^{(i)}

可以得到梯度向量:

.. math::

    \nabla_{\theta}J(\theta) = \frac{1}{m}X^T \cdot (\sigma(X \cdot \theta) - y)

其余便和普通的线性回归一样

.. code-block:: python

    from sklearn.linear_model import LogisticRegression

    log_reg = LogisticRegression()
    log_reg.fit(X, y)

    clf.predict(X_test)
    clf.predict_proba(X_test)

Softmax Regression
-------------------

除了二元分类, 逻辑回归也可以被一般化用于多类分类, 并且不需要训练和组合多个二元分类器; 这叫做 Softmax Regression, 也叫 Multinomial Logistic Regression

概率评估
~~~~~~~~~~~

1. 给定一个数据行 :math:`x`, 对每一个类求出其分数:

    .. math::

        s_k(x) = \theta_k^T \cdot x

    每个类都有其参数向量 :math:`\theta_k`

2. 根据分数, 使用 softmax function (也叫 *归一化指数* normalized exponential) 计算出数据行属于某一类的概率

    .. math::

        \hat p_k = \sigma(s(x))_k = \frac{exp(s_k(x))}{\sum_{j=1}^Kexp(s_j(x))}

    其中,

    - :math:`k` 是类的数量
    - :math:`s(x)` 是包含了每个数据行 :math:`x` 在每个类上的分数的向量
    - :math:`\sigma(s(x))_k` 是由每个数据行 :math:`x` 在每个类上的分数计算出的 :math:`x` 属于每个类的概率

类似于逻辑回归, Softmax Regression 通过最高的概率预估来进行分类:

.. math::

    \hat y = argmax_k \sigma(s(x))_k = argmax_k s_k(x) = argmax_k (\theta_k^T \cdot X)

损失函数
~~~~~~~~~~~~

使用交叉熵 (cross entropy) 来计算预测概率分布和实际概率分布之间的距离, 可以得到损失函数为:

.. math::

    J(\theta) = -\frac{1}{m}\sum_{i=1}^m\sum_{k=1}^K y_k^{(i)} log(\hat p_k^{(i)})

- 如果第 :math:`i_{th}` 个数据行的类为 :math:`k`, 则 :math:`y_k^{(i)} = 1`; 否则为 0

可以得到梯度向量:

.. math::

    \nabla_{\theta_k}J(\theta) = \frac{1}{m} \sum_{i=1}^m (\hat p_k^{(i)} - y_k^{(i)}) x^{(i)}

.. code-block:: python

    softmax_reg = LogisticRegression(multi_class="multinomial",solver="lbfgs", C=10)
    softmax_reg.fit(X, y)