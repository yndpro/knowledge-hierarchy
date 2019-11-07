
//本质上是构造函数
class Parent {
    constructor(name){
        //显示定义实例本身属性
        this.getMeName = function () {
            console.log("显示定义其本身属性")
        };
        this.name = name;
    }
    prop1 = "parentProp1";

    //定义在原型上
    getName(){
        console.log("我定义在原型上");
        return this.name;
    }

    //定义在类本身的静态方法，   Todo:定义在类本身的静态属性目前只能这样定义Parent.name = 1;
    static ParentMethod(){
        console.log("我是个静态方法");
        return "啦啦啦啦";
    }
}
Parent.prop2 = "parentProp2";

class Child extends Parent{
    constructor(name,hobby){
        //子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。
        //super关键字 在子类的构造函数之中代表父类的构造函数
        super(name);
        this.hobby = hobby;
    }

    getName2(){
        //通过super调用父类的方法时，super会绑定子类的 this,即Parent.prototype.getName.call(this);
        //super关键字 在普通方法中，指向父类的原型对象
        return super.getName();
    }

    static ChildMethod(){
        //父类的静态方法，可以被子类继承Child.ChildMethod()，也可以从super对象上调用
        //super关键字 在静态方法中，指向父类
        return super.ParentMethod();
    }
}

let parent = new Parent("Young");
let child = new Child("Adrian Young","Coding");

console.dir(Parent);
console.dir(parent);

//横向
console.log(Parent.prototype === parent.__proto__);  //都指向原型
console.log(Parent === Parent.prototype.constructor);   //类（构造函数）与类的原型通过prototype，constructor两个属性互指
//纵向
console.log(Child.__proto__ === Parent);                        //子类的__proto__ 指向父类
console.log(Child.prototype.__proto__ === Parent.prototype);    //子类原型的__proto__ 指向父类原型


console.dir(Child);
console.dir(child);





