

//类本身的修饰
//装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时;
//这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。
{
    @eat
    class Person {
        constructor(){

        }
    }

    function eat(target,key,descriptor) {
        console.log("eat");
        target.prototype.eat = "wo yao chifan";
    }

    console.groupCollapsed("类本身的修饰");
    let person1 = new Person();
    console.log(person1.eat);
    console.groupEnd();
}


//类的属性的修饰
//ES中**Decorator就是一个求值结果为函数的表达式,**所以,只要你最后的返回结果是一个函数.都是一个合法的装饰器
{
    class Person{
        constructor(){}

        @writable(false)
        eat(){
            return "吃饭";
        }
    }

    function writable(isWritable) {
        return function (target,key,descriptor) {
            descriptor.writable = !!isWritable;
        }
    }

    console.groupCollapsed("类的属性的修饰");
    let person1 = new Person();
    /*person1.eat = "今天吃饭";*/
    console.groupEnd();
}



{
    const CheckType = {
        Number : 'number',
        String : 'string',
    };
    
    
    class carModel{
        @typeCheck(CheckType.Number)
        price = 0;
    }

    function typeCheck(type) {
        return (target,key,descriptor) => {
            let val = descriptor.initializer && descriptor.initializer();
            return {
                enumerable : true,
                configurable : true,
                get : function () {
                    return val
                },
                set : function (value) {
                    if(typeof(value) !== type){
                        throw new Error(`属性${key}必须是${type}类型`);
                    }
                    val = value
                }
            }
        }
    }
    console.groupCollapsed("基础实现");
    try {
        let car = new carModel()
        car.price = 3;
    }catch (e) {
        console.log(e.message)
    }
    console.groupEnd();
}



{
    const CheckType = {
        Number : 'number',
        String : 'string',
    };

    class baseModel{
        __map(json){
            let checker = this.constructor.__checker__;
            let serverName = this.constructor.__serverName__;

            for (let key in this) {
              if (this.hasOwnProperty(key)) {
                  let realValue = json[key];

                  if(serverName && serverName[key]){
                      let name = serverName[key].name;
                      realValue = json[name];
                  }

                  if(checker && checker[key]){
                      let type = checker[key].type;
                      if(typeof realValue !== type){
                          throw new Error(`属性${key}必须是${type}类型`);
                      }
                  }

                  this[key] = realValue
              }
            }

        }
    }


    class carModel extends baseModel{
        @serverName("money")
        @typeCheck(CheckType.Number)
        price = 0;
    }

    function typeCheck(type) {
        return (target,key,descriptor) => {
           /* let val = descriptor.initializer && descriptor.initializer();*/

            if(!target.constructor.__checker__){
                Object.defineProperty(target.constructor,"__checker__",{
                    enumerable : true,
                    configurable : true,
                    value : {},
                    writable : true
                })
            }
            target.constructor.__checker__[key] = {
                type : type
            }
        }
    }
    function serverName(name) {
        return (target,key,descriptor) => {
            /* let val = descriptor.initializer && descriptor.initializer();*/

            if(!target.constructor.__serverName__){
                Object.defineProperty(target.constructor,"__serverName__",{
                    enumerable : true,
                    configurable : true,
                    value : {},
                    writable : true
                })
            }
            target.constructor.__serverName__[key] = {
                name : name
            }
        }
    }
    try {
        let car = new carModel();
        console.log(car)
        car.__map({
            money : '33'
        })

    }catch (e) {
        console.log(e.message)
    }
}