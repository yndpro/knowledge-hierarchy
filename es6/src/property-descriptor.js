

//getter 与 setter

//字面量创建
{
    let obj = {
        a : 7,
        get b(){
            return this.a + 1;
        },
        set b(x){
            this.a = 2 * x;
        }
    };
    console.groupCollapsed("字面量创建");
    console.log(obj.a);
    console.log(obj.b);
    obj.b = 50;
    console.log(obj.a); //100
    console.log(obj.b); //101
    console.log(obj);
    console.groupEnd();
}


//Object.create和Object.defineProperty创建
{
    let obj = {a:10};
    obj = Object.create(obj,{
        b : {
            get(){
                return this.a;
            },
            set(x){
                console.log(`set obj.b to${x * 2}`);
                this.a = x * 2;
            }
        }
    })
    console.groupCollapsed("Object.create和Object.defineProperty创建");
    console.log(obj.b);
    obj.b = 25;
    console.log(obj.b);
    console.groupEnd();
}



//创建不可配置不可枚举的对象
{
    try {
        let obj = {};
        Object.defineProperty(obj,"a",{
            value : 1
        })
        console.groupCollapsed("创建不可配置不可枚举的对象");
        obj.b = 2;
        console.log(obj);
        for(let key in obj){
            console.log(obj[key]);
        }
        console.groupEnd();
    }catch (e) {
        console.log(e.message)
    }

}


//writable 与 configurable区别
{
    try {
        var o = {};
        Object.defineProperties(o,{
            "a": {
                value:1,
                writable:true,//可写
                configurable:false//不可配置
                //enumerable 默认为 false 不可枚举
            },
            "b":{
                get :function(){
                    return this.a;
                },
                configurable:false
            }
        });
        console.groupCollapsed("writable 与 configurable区别");
        console.log(o.a);   //1
        o.a = 2;            //修改值成功,writable 为 true
        console.log(o.a);   //2
        Object.defineProperty(o,"a",{value:3});//同样为修改值成功
        console.log(o.a);   //3

        //将其属性 b 的属性描述符从存取描述符重新配置为数据描述符
        //Object.defineProperty(o,"b",{value:3});//抛出异常,因为 configurable 为 false
        console.groupEnd();
    }catch (e) {
        console.log(e.message)
    }
}


//若每定义一次便要创建一个匿名对象传入，将会造成内存浪费
{
    let obj = {};
    function withProperty(value){
        let d = withProperty.d || (withProperty.d = {
            enumerable : false,
            configurable : false,
            writable : false,
            value :null
        });
        d.value = value;
        return d
    }
    Object.defineProperty(obj,"a",withProperty(5));
    console.groupCollapsed("若每定义一次便要创建一个匿名对象传入，将会造成内存浪费");
    console.log(obj);
    console.groupEnd();
}

