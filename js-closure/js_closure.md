
# js closure

**闭包是指有权访问另一个函数作用域中的变量的函数。**（这个函数在执行的时候可以访问到另一个函数作用域的变量，因为这个函数是在另一个函数中创建的，当另一个函数执行完毕销毁后，即退出了栈，但这个函数的作用域链上仍然保有另一个函数的作用域。）


```
function createComparisonFunction(propertyName) {
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}
```
在这个例子中，突出的那两行代码是内部函数（一个匿名函数）中的代码，这两行代码访问了外部
函数中的变量propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可
以访问变量propertyName。之所以还能够访问这个变量，是因为内部函数的作用域链中包含
createComparisonFunction()的作用域。要彻底搞清楚其中的细节，必须从理解函数被调用的时候
都会发生什么入手。

##### 函数执行时都发生了什么？
当某个函数被调用时，会创建一个执行环境（execution context）及相应的作用域链。
然后，使用arguments 和其他命名参数的值来初始化函数的活动对象（activation object）。但在作用域
链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，……直至作为作用域链终点的全局执行环境。
在函数执行过程中，为读取和写入变量的值，就需要在作用域链中查找变量。

```
function compare(value1, value2){
    if (value1 < value2){
        return -1;
    } else if (value1 > value2){
        return 1;
    } else {
        return 0;
    }
}
var result = compare(5, 10);
```



![image](http://note.youdao.com/favicon.ico)

后台的每个执行环境都有一个表示变量的对象——变量对象。全局环境的变量对象始终存在，而像
compare()函数这样的局部环境的变量对象，则只在函数执行的过程中存在。

在创建compare()函数
时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的[[Scope]]属性中。


当调用compare()函数时，会为函数创建一个**执行环境**，然后通过复制函数的[[Scope]]属性中的对
象构建起执行环境的**作用域链**。此后，又有一个活动对象（在此作为变量对象使用，使用arguments、value1 和value2 初始化函数的活动对象）被创建并被推入执
行环境作用域链的前端。对于这个例子中compare()函数的执行环境而言，其作用域链中包含两个变
量对象：本地活动对象和全局变量对象。全局执行环境的变量对象（包含result
和compare）在compare()执行环境的作用域链中则处于第二位。显然，作用域链本质上是一个指向变量对象的指针列表，它只
引用但不实际包含变量对象。
无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。一般来讲，
当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。
但是，闭包的情况又有所不同。

##### 闭包都发生了什么？

在另一个函数内部定义的函数会将包含函数（即外部函数）的活动对象添加到它的作用域链中。因
此，在createComparisonFunction()函数内部定义的匿名函数的作用域链中，实际上将会包含外部
函数createComparisonFunction()的活动对象。图7-2 展示了当下列代码执行时，包含函数与内部
匿名函数的作用域链。

```
var compare = createComparisonFunction("name");
var result = compare({ name: "Nicholas" }, { name: "Greg" });
```

在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含
createComparisonFunction()函数的活动对象和全局变量对象。这样，匿名函数就可以访问在
createComparisonFunction()中定义的所有变量。更为重要的是，createComparisonFunction()
函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。换
句话说，当createComparisonFunction()函数返回后，其执行环境的作用域链会被销毁，但它的活
动对象仍然会留在内存中；直到匿名函数被销毁后，createComparisonFunction()的活动对象才会
被销毁，例如：

```
//创建函数
var compareNames = createComparisonFunction("name");
//调用函数
var result = compareNames({ name: "Nicholas" }, { name: "Greg" });
//解除对匿名函数的引用（以便释放内存）
compareNames = null;
```

首先，创建的比较函数被保存在变量compareNames 中。而通过将compareNames 设置为等于null
解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域
（除了全局作用域）也都可以安全地销毁了。

![image](http://note.youdao.com/favicon.ico)

由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存，还是要慎重使用闭包。

### 闭包与变量
作用域链的这种配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最
后一个值。别忘了闭包所保存的是整个变量对象，而不是某个特殊的变量。


```
var res = [];
for (var i = 0; i <= 3; i++) {
	res[i] = function(){
		return i;
	}
}
console.log(res[1]());
```
（循环过程中res[i]的i是已经执行了，所以因循环获取不同的值，return i的i是还没执行，所以没被赋值。等到执行的时候，return的i引用的是作用域链上的活动对象i，获取值。函数执行的时候里面的变量才去作用域链上获取值）

```
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
        result[i] = function(){
            return i;
        };
    }
    return result;
}
```


这个函数会返回一个函数数组。表面上看，似乎每个函数都应该返自己的索引值，即位置0 的函数
返回0，位置1 的函数返回1，以此类推。但实际上，每个函数都返回10。因为每个函数的作用域链中
都保存着createFunctions() 函数的活动对象， 所以它们引用的都是同一个变量i 。当
createFunctions()函数返回后，变量i 的值是10，此时每个函数都引用着保存变量i 的同一个变量
对象，所以在每个函数内部i 的值都是10。但是，我们可以通过创建另一个匿名函数强制让闭包的行为
符合预期
```
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
```
在重写了前面的createFunctions()函数后，每个函数就会返回各自不同的索引值了。在这个版
本中，我们没有直接把闭包赋值给数组，而是定义了一个匿名函数，并将立即执行该匿名函数的结果赋
给数组。这里的匿名函数有一个参数num，也就是最终的函数要返回的值。在调用每个匿名函数时，我
们传入了变量i。**由于函数参数是按值传递的，所以就会将变量i 的当前值复制给参数num**。而在这个
匿名函数内部，又创建并返回了一个访问num 的闭包。这样一来，result 数组中的每个函数都有自己
num 变量的一个副本，因此函数执行后就可以访问各自的num变量的副本，就可以返回各自不同的数值了。（函数定义的时候，定义参相当于在函数内部声明一个变量副本。函数自执行后，生成执行环境和作用域链，num获取i传来的值，将num副本等初始化成活动对象 推入执行环境栈的最前端。内层闭包函数执行，即使自执行函数已经运行完毕销毁了，但其变量对象包含num依旧在内层闭包函数执行换环境的作用域的第二层。所以，当访问到num，才去该闭包函数的作用域链上查找变量对象，num在该闭包函数的作用域链第二层的活动对象上取到值。i则去访问作用域链上变量对象上对i的引用）同样的，num 和 i 只有在函数执行后，访问到他们才去作用域链上查找。

等同于：

```
function createFunctions(){
	var result = new Array();
	for (var i=0; i < 10; i++){
		result[i] = (function(){   //在每个闭包函数作用域链前都新增一个变量对象
			var num = i;  // 将循环中想要保存的值通过赋值语句保存在变量对象上（按值传递），供闭包函数即内层函数使用。理解从一对多到一对多对多模式。
			return function(){
				return num;
			};
		})();
	}
	return result;
}
```




### 闭包与this

**this 对象是在运行时基于函数的执
行环境绑定的**：在全局函数中，this 等于window，而当函数被作为某个对象的方法调用时，this 等
于那个对象。不过，匿名函数的执行环境具有全局性（？），因此其this 对象通常指向window。

```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下）
```
然而，这个例子返回的字符串是"The Window"，即全局name 变量的值。为什么匿名函数没
有取得其包含作用域（或外部作用域）的this 对象呢？每个函数在被调用时都会自动取得两个特殊变量：this 和arguments。**内部函
数在搜索（沿着作用域向上搜索）这两个变量时，只会搜索到其活动对象为止**，因此永远不可能直接访问外部函数中的这两个变
量。不过，把外部作用域中的this 对象保存在一个闭包能够访问
到的变量里，就可以让闭包访问该对象了，

```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
alert(object.getNameFunc()()); //"My Object"
```
。在定义匿名函数之前，我们把this
对象赋值给了一个名叫that 的变量。而在定义了闭包之后，闭包也可以访问这个变量，因为它是我们
在包含函数中特意声名的一个变量。即使在函数返回之后，that 也仍然引用着object，所以调用
object.getNameFunc()()就返回了"My Object"。**this 和arguments 也存在同样的问题。如果想访问作用域中的arguments 对
象，必须将对该对象的引用保存到另一个闭包能够访问的变量中。**
（如果将getNameFunc里调换位置改成如下：

```
return function(){
    return that.name;
};
var that = this;
```
执行object.getNameFunc()不会报错说明函数声明的时候里头并没有被编译，而只有当函数执行的时候object.getNameFunc()()才会报错，所以这应该可以印证js不是预编译语言了吧？）


在几种特殊情况下，this 的值可能会意外地改变。比如，下面的代码是修改前面例子的结果。

```
var name = "The Window";
var object = {
    name : "My Object",
    getName: function(){
        return this.name;
    }
};
```

```
object.getName(); //"My Object"
(object.getName)(); //"My Object"
(object.getName = object.getName)(); //"The Window"，在非严格模式下
```
第一行代码跟平常一样调用了object.getName()，返回的是"My Object"，因为this.name
就是object.name。第二行代码在调用这个方法前先给它加上了括号。虽然加上括号之后，就好像只
是在引用一个函数，但this 的值得到了维持，因为**object.getName 和(object.getName)的定义
是相同的**（自执行函数也是这样的吧？）。第三行代码先执行了一条赋值语句，然后再调用赋值后的结果。因为这个赋值表达式的值是
函数本身，所以this 的值不能得到维持，结果就返回了"The Window"（？*）。


reference:
《javascript高级程序设计》
http://www.jb51.net/article/24101.htm

TODO:

https://mp.weixin.qq.com/s/G4Yr0NChUCgSiVX8pWOTpw?

http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html

https://www.jb51.net/article/83524.htm

https://www.cnblogs.com/wangfupeng1988/p/4001284.html