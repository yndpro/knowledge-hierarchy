### 基本数据类型检测
typeof用来判断基本数据类型，typeof null返回的还是Object。

```
typeof true     //"boolean"
typeof "sed"    //"string"
typeof 57       //"number"
function fun(){}
typeof fun      //"function"
typeof null     //"object"
typeof {}       //"object"
```
### 引用类型检测

- 引用类型有：Object、Array、Date、Error、RegExp、Function
- 基本包装类型：（Boolean类型、Number类型、String类型）
- 单体内置对象：（Global对象、Math对象）

instanceof运算符左边要是对象，右边是对象类名，如左边是右边的一个实例，返回true。


```
function fun2(){}
fun2 instanceof Function      //true
fun2 instanceof Object        //true
fun2 instanceof RegExp        //false
```

### Object.toString()检测对象类型


```
Object.prototype.toString.call(fun2) == "[object Function]"    //true
Object.prototype.toString.call(fun2) == "[object Object]"      //false
```
