

> 我们不建议在构造函数中直接定义方法，如果这样做的话，每个方法都要在每个实例上重新创建一遍，这将非常损耗性能。——不要忘了，ECMAScript中的函数是对象，每定义一个函数，也就实例化了一个对象。在ECMAScript中，我们可以借助原型对象来解决这个问题。


```
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
 
// 通过原型模式来添加所有实例共享的方法
// sayName() 方法将会被Person的所有实例共享，而避免了重复创建
Person.prototype.sayName = function () {
  console.log(this.name);
};
 
var person1 = new Person('Weiwei', 27, 'Student');
var person2 = new Person('Lily', 25, 'Doctor');
 
console.log(person1.sayName === person2.sayName); // true
 
person1.sayName(); // Weiwei
person2.sayName(); // Lily
```
正如上面的代码所示，通过原型模式定义的方法sayName()为所有的实例所共享。也就是，person1和person2访问的是同一个sayName()函数。同样的，公共属性也可以使用原型模式进行定义。


```

Person.prototype.contry = 'UK'; // 公共属性，所有实例共享
```



![image](http://mmbiz.qpic.cn/mmbiz/zPh0erYjkib0In4GI5qAQJR4yOnveEa5VzQRiaH8dtOypdMe5YNIWWYdOIU1MOckygWoYhEicWOOu3InaZN6msibOw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

只要创建新**函数**，就会为该函数创建一个prototype属性，这个属性是一个指针，指向该函数的原型对象。


每个对象(包括函数，函数也是对象)在创建时自动拥有一个constructor属性，指向其构造函数（字面量或Object构造函数创建的对象，指向Object,Object本身也是一个名为Objec自带的构造函数）

```
Person.prototype.constructor == Person
person1.constructor == Person
Person.constructor == Function 
```

每个对象包含一个__proto__指针，指向**原型对象**。由同一个构造函数实例化的不同对象，各自有不共享的属性和方法。

```
Person.__proto__ == Function.prototype; 
Person.prototype.__proto__ == Object.prototype;
person1.__proto__ == Person.prototype;

```


任何函数（包括构造函数Person）也是由名为Function的自带构造函数构造的实例。

```
Person.constructor == Function          
Person.__proto__ == Function.prototype; 
Person.constructor.__proto__ == Function.prototype;
```


### 角度二

![image](https://sfault-image.b0.upaiyun.com/276/717/2767175203-5751333c109ff_articlex)

补图：
- 所有fuctions的constructor指向function Function；
- f1的constructor指向fuction Foo(),o1的constructor指向fuction Object()；

理解这张图有以下几点：

- 一切皆对象，所以每个对象都有_proto_属性，_proto_属性指向创建该对象的函数（类型）的prototype。
- prototype的属性值是一个对象（默认的只有一个叫做constructor的属性，指向这个函数本身）。所以各函数的prototype也有_proto_属性。
- Object函数的_proto_只想null。
- var Foo = new Function();则Foo._proto_指向Function.prototype.（functions 也都是function Function()构造的实例，即所有函数都是new Function而来的，所以他们的_proto_属性指向Function.prototype）
- function Function(){}是有它自己创造的，所有Function._proto_指向Function.prototype.


### 原型链

```
function Foo(name,age,job) {
	this.name = name;
	this.age = age;
	this.job = job;
}
var f1= new Foo();
```
```
f1.a = 10
Foo.prototype.a = 100;
Foo.prototype.b = 200;
console.log(f1.a)//10
console.log(f1.b)//200
```

f1.a是f1对象的基本属性，访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。



```
Foo.contry = 'Chinese';
Foo.prototype.club = 'MU';
console.log(f1.contry);   //undefined
console.log(Foo.club);    //undefined
```
![image](images/8.png)

- 如图Foo.contry添加的是Foo对象上的属性，f1被赋予的作用域（this）并没有该属性，所以f1.contry为undefined。
- 原型链的形成真正是靠__proto__ 而非prototype,当JS引擎执行对象的方法时，先查找对象本身是否存在该方法，如果不存在，会在原型链上查找，但不会查找自身的prototype。所以Foo.club为undefined，Foo，也是Function（）的一个实例，它只能往__proto__即（Function.prototype）上寻找。
- 一个对象的__proto__记录着自己的原型链，决定了自身的数据类型，改变__proto__就等于改变对象的数据类型。
- 在原型对象上定义方法和属性的目的是为了被子类继承和使用。
