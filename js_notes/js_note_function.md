## js函数

函数是Function类型的实例，与其他引用类型一样具有属性和方法。函数名实际上是指向函数对象的指针。

### 函数的定义

函数声明的语法：

```
function sum(num1,num2){ 
    return num1 + num2;
}
```
函数表达式的语法：

```
var sum = function(num1,num2){ 
    return num1 + num2;
};
```
使用Function构造函数的方法：不推荐，有助于理解“函数是对象，函数名是指针”，

```
var sum = new Function('num1','num2','return num1 + num2');
```

函数名实际上是指向函数对象的指针。

```
function sum(num1,num2){ 
    return num1 + num2
}
sum(10,15)              //25
var anothersum = sum;
sum = null;
anothersum(10,15)       //25
```
因为函数名是指针所以js函数没有重载。

```
var addSomeNumber = function(num){
   return num + 100;
}
function addSomeNumber(num){
   return num + 200;
}
addSomeNumber(100)      //300
```

### 函数声明与函数表达式

在代码执行之前，解析器通过函数声明提升的过程（hoisting）先读取函数声明添加到执行环境中，而函数表达式则必须等到解析器执行到它的代码行，才被解析执行，变量sum不会保留对函数的引用。

```
console.log(sum(10,10));  //20
function sum(num1,num2){
	return num1 + num2;
}

console.log(sum(10,10));  //Uncaught TypeError: sum is not a function
var sum = function(num1,num2){
	return num1 + num2;
}
```

### 作为值的函数

因为函数名本身是指针（变量），所以函数也可以作为值来使用。不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。


```
function add10(num){
    return num + 10;
}

function getGreet(name){
    return "Hello" + name;
}

function addSomeFunction(someFunction,someArgument){
    return someFunction(someArgument);
}

addSomeFunction(add10,5);    //15
addSomeFunction(getGreet,"bogoba");    //"Hellobogoba"
```
从一个函数中返回另一个函数：

```
var data = [
	{'name':'Bill','age':9},
	{'name':'Neo','age':20}
]
function createCompare(property){

	return function(obj1,obj2){
		var value1 = obj1[property],
			value2 = obj2[property];

		if(value1 > value2){
			return -1;
		}else if(value1 == value2){
			return 0;
		}else if(value1 < value2){
			return 1;
		}
	}
}
data.sort(createCompare('age'));
console.log(data);
```
### 函数的内部属性
函数内部有两个特殊的对象：arguments和this

**arguments**是一个类数组的对象，包含传入函数中的所有参数，该对象还有一个callee属性，指向拥有这个arguments对象的函数。


```
function factorial(num){

	if(num <= 1){
		return 1;
	}else{
		return num * arguments.callee(num - 1);    //替换return num * factorial(num - 1);
	}

}

var truefactorial = factorial;

factorial = function(){
	return 0;
}

console.log(factorial(5));
console.log(truefactorial(5));
```
如实例所示，用于解除函数体内代码和函数的耦合。

**this**引用的是函数据以执行的环境对象。

```
color = "red";  
function sayColor() {
	console.log(this.color);
}

obj = {'color':'blue'};
obj.sayColor = sayColor;

sayColor();        //red
obj.sayColor();    //blue
```
注：函数名只是一个存放指针的变量。因此，即使是在不同的环境中执行，全局的sayColor与obj.sayColor指向的是仍是同一个函数。

ES5还规范了另一个对象属性**caller**,属性中保存着调用当前函数的函数的引用。

```
function outer() {
	inner();
}

function inner(){
	console.log(arguments.callee.caller);
}

outer();    //function outer() {inner();}
```

### 函数的属性和方法

属性length,prototype略

每个函数都包含两个方法：apply()和call()，用途是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。apply()和call()方法相同，区别在于传参方式不同。

```
function sum(num1,num2){
	return num1 + num2;
}

function callSum(num1,num2){
	return sum(num1,num2);
}
function callSum1(num1,num2){
	return sum.apply(this,arguments);
}
function callSum2(num1,num2){
	return sum.apply(this,[num1,num2]);
}
function callSum3(num1,num2){
	return sum.call(this,num1,num2);
}

console.log(callSum(10,20));     //30
console.log(callSum1(10,20));    //30
console.log(callSum2(10,20));    //30
console.log(callSum2(10,20));    //30
```



扩充函数赖于运行的作用域。前几个是显示地在全局作用域中调用函数的方式，当运行sayColor.call(obj)，函数体内的this对象指向了obj，函数的执行环境就改变了。对比前面的例子，call和apply最大优点是，对象不需要与方法有任何耦合关系，前面例子中我们是将sayColor()函数放到了对象obj中，然后再通过o来调用它，下面重写的例子就不需要那个多余的步骤了。

```
//作用域1
color = "red";  
function sayColor() {
	console.log(this.color);
}

//作用域2
obj = {'color':'blue'};

sayColor();             //red
sayColor.call(window);  //red
sayColor.call(this);    //red
sayColor.call(obj);     //blue
```

每个函数继承的valueOf(),toString()方法返回函数体代码，常用于调试。







