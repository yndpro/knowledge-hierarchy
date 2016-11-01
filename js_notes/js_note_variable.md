## js变量

### 基本类型和引用类型

**基本类型**的值指的是简单的数据段。（五种基本类型：Undefined,Null,Boolean,Number,String）,可以操作保存在变量中实际的值，按值访问的。

**引用类型**的值指的是那些可能由多个值构成的对象。操作对象时实际上是操作对象的引用，按引用访问的（注：不严密，再添加属性时，操作的实际上的对象）。


##### 动态属性：
引用类型的值可以动态地改变其属性和方法，基本类型的值则不能。
```
var person = new Object();
person.name = "Bogerba";
console.log(person.name);     //Bogerba
```

```
var person = "person"
person.name = "Bogerba";
console.log(person.name);    //undefined
```
##### 复制：
基本类型的值复制后，两个值是相对独立的。引用类型的值复制后（复制的副本实际上是指针），两个值引用的是堆内存中的同一个对象。

```
var person1 = 3;
var person2 = person1;
person1 = 5;
console.log(person2);
```

```
var person1 = new Object();
var person2 = person1;
person1.width = 10;
console.log(person2.width);
```

##### 传参：
数值类型的就不比多说了，局部变量的变化需要返回值才会反应到函数外部；
引用类型的值会把这个值正在内存中的地址复制给一个局部变量（即argument对象中的一个元素），局部变量的变化会反应到函数外部。


```
function addTen(num){
	num += 10;
	return num;
}
var age = 20;
var age2 = addTen(age);
console.log(age);    //20没有变化
console.log(age2);   //30
```

```
function setName(obj){
	obj.name = "Bogerba";
};

var person = new Object();
setName(person);
console.log(person.name);  //Bogerba
```

对比上例，ECMAScript所有函数参数都是按值传递的（实际上不就是改变指针指向么？）。

```
function setName(obj){
	obj.name = "Bogerba";
	obj = new Object();
	obj.name = "Ibra";
};

var person = new Object();
setName(person);
console.log(person.name);  //Bogerba
```
### 执行环境和作用域

**执行环境**（executioncontext）定义了变量或函数有权访问的其他数据,每个执行环境都有一个与之关联的**变量对象**（variable object），环境中定义的所有变量和函数都保存在这个对象中。

全局执行环境是最外围的一个执行环境。根据ECMAScript 实现所在的宿主环境不同，表示执行环
境的对象也不一样。在Web 浏览器中，全局执行环境被认为是window 对象（第7 章将详细讨论），因
此所有全局变量和函数都是作为window 对象的属性和方法创建的。某个执行环境中的所有代码执行完
毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退
出——例如关闭网页或浏览器——时才会被销毁）。

每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。
而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAScript 程序中的执行流
正是由这个方便的机制控制着。

当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途，是
保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所
在环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对
象在最开始时只包含一个变量，即arguments 对象（这个对象在全局环境中是不存在的）。作用域链中
的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延
续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，
然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。


```
var color = "blue";
function changeColor(){
	var anotherColor = "red";
	function swapColor(){
		var tempColor = anotherColor;
		anotherColor = color;
		color = tempColor;
	}
	swapColor();
}
changeColor();
```
以上代码共涉及3 个执行环境：全局环境、changeColor()的局部环境和swapColors()的局部
环境。全局环境中有一个变量color 和一个函数changeColor()。changeColor()的局部环境中有
一个名为anotherColor 的变量和一个名为swapColors()的函数，但它也可以访问全局环境中的变
量color。swapColors()的局部环境中有一个变量tempColor，该变量只能在这个环境中访问到。
无论全局环境还是changeColor()的局部环境都无权访问tempColor。然而，在swapColors()内部
则可以访问其他两个环境中的所有变量，因为那两个环境是它的父执行环境。图4-3 形象地展示了前面
这个例子的作用域链。

![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/11.JPG)


内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。对于这个例子的swapColor()这个执行环境而言，其作用域包含3个变量对象：swapColor()自身的变量对象，changeColor()的变量对象和全局变量对象。swapColor()的局部环境开始时，会先在自己的变量对象中搜索函数变量和函数名，如果搜索不到则再搜索上一级作用域链。全局执行环境的变量对象始终都是作用域中的最后一个对象。在web浏览器中，全局执行环境被认为是window对象，因此所有全局变量和函数都是作为window对象的属性和方法创建的。每个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁。


##### 声明变量：
使用var声明的变量会自动被添加到最接近的环境的变量对象中，在函数内部最接近的环境就是函数的局部环境。

```
function add(num1,num2){
    var sum = num1 + num2;
    return sum;
}
var result = add(1,2)
console.log(sum);     //Uncaught ReferenceError: sum is not defined
```
没有使用var关键字则添加到全局环境的变量对象上。
```
function add(num1,num2){
    sum = num1 + num2;
    return sum;
}
var result = add(1,2)
console.log(sum);    //3
```

##### 查询标识符：
当在某个环境中为了读取或写入而引用一个标识符时，必须通过搜索来确定该标识符实际代表什么。搜索过程从作用域链的前端开始，向上逐级查询变量对象中与给定名字匹配的标识符。如果在局部变量中找到该标识符，搜索停止，变量就绪。如果在局部环境中没有找到该变量名，则继续沿着作用域向上搜索。搜索过程一直追溯到全局环境的变量对象。如果在全局环境中也没有找到这个标识符，则意味着该变量未声明。

```
var color = "blue";

function getColor(){
    return color;
}

console.log(getColor());
```

![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/10.JPG)


在这个搜索过程中，如果存在一个局部变量的定义，则搜索会自动停止，不再进入下一个变量对象。换句话说，如果局部环境中存在着同名标识符，就不会用位于父环境中的标识符。

```
var color = "blue";

function getColor(){
    var color = "red";
    return color;
}

console.log(getColor());
```





