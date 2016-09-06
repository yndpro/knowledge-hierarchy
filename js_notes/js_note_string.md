

### 基本包装类型(适用于String,Number,Boolean)
因为基本类型值不是对象，无法调用方法来操作。每当往内存中读取一个基本类型值得时候，后台就会自动创建一个对应的基本包装类型的对象，而这个对象的生命周期只存在于一行代码的执行瞬间。
```
var str = 'hello world';
str.length;                       //11   
```
- 创建String类型的一个实例；
- 在实例上调用指定的方法；
- 销毁这个实例；
```
var str = new String('hello world');
str.length;
str = null;
```
第二行创建的String对象在执行第三行时已经被销毁了，第三行又创建自己的String对象。
```
var person = "person"
person.name = "Bogerba";
console.log(person.name);    //undefined
```
不建议显示地调用String构造函数来创建String类型是实例，因为调用typeof会返回"object",易混淆。
```
var str = new String('hello world');
str.a = "name";
typeof str                              //"object"
str instanceof String                   //true
str.a                                   //"name"
```
Object构造函数也会像 工厂方法一样，根据传入的值返回相应基本包装类型的实例。
```
var str = new Object('hello world');
typeof str                              //"object"
```


###String
String类型是字符串的对象包装类型，字符串是基本类型值。对象继承的valueOf(),toString(),toLocalString(),都返回对象所表示的基本字符串值。
```
str = 'hello world';
typeof str;         //"string"
str = new String('hello world');
typeof str;         //"object"
var strs = str.valueOf();
strs;               //"hello world"
```
#### 字符串转换
```
var num = 19
num.toString()    //"19"
"" +num           //"19"
```
#### 字符串分割
split()的第二个参数，表示返回的字符串数组的最大长度。
```
myStr = "I,Love,You,Do,you,love,me";
myStr.split(",")       //["I", "Love", "You", "Do", "you", "love", "me"]
myStr.split(",", 3)    //["I", "Love", "You"]
```
#### 查询子字符串
indexOf()，它从字符串的开头开始查找，找到返回对应坐标，找不到返回-1。
lastIndexOf()，它从字符串的末尾开始查找，找到返回对应坐标，找不到返回-1。
两个函数同样接收第二个可选的参数，表示开始查找的位置。
```
var myStr = "I,Love,you,Do,you,love,me";
myStr.indexOf('you')       //7
myStr.lastIndexOf('you')   //14
```


#### 查找给定位置的字符

```
var myStr = "I,Love,you,Do,you,love,me";
myStr.charAt(8)            //"o"
myStr[8]                   //"o"     
```
#### 字符串连接
```
var str1 = "I,love,you!";
var str2 = "Do,you,love,me?";
var str = str1 + str2 + "Yes!";   //"I,love,you!Do,you,love,me?Yes!"
```
concat()函数可以有多个参数，传递多个字符串，拼接多个字符串

```
str1.concat(str2,'Yes!')          //"I,love,you!Do,you,love,me?Yes!"
```
#### 字符串切割和提取

与前两者不同，substr()第二个参数代表截取的字符串最大长度。
```
var myStr = "I,love,you,Do,you,love,me";
myStr.slice(1,5);           //",lov"
myStr.substring(1,5);       //",lov"
myStr.substr(1,5)           //",love"
```
#### 字符串大小写转换

```
var myStr = "I,love,you,Do,you,love,me";
myStr.toLowerCase()           //"i,love,you,do,you,love,me"
myStr.toUpperCase()           //"I,LOVE,YOU,DO,YOU,LOVE,ME"
```

#### 字符串替换
默认只替换第一次查找到的，想要全局替换，需要置上正则全局标识
```
var myStr = "I,love,you,Do,you,love,me";
myStr.replace('love','hate');    //"I,hate,you,Do,you,love,me"
myStr.replace(/love/g,'hate');   //"I,hate,you,Do,you,hate,me"
```

#### 字符串匹配

match()是在字符串上调用，如果参数regExp没有全局标志g，则match()函数只查找第一个匹配，返回包含查找结果的数组，该数组对象包含如下成员
- 索引0：存放第一个匹配的子字符串。
- 属性index：匹配文本在字符串中的起始索引位置。
- 属性input：整个字符串对象(stringObject)。

exec()函数是在正则上调用，传递字符串的参数。对于上面两个方法，仅仅是把正则和字符串换了个位置，匹配结果都是返回一样的一个数组（这个数组后面带两个参数，因为js的数组实际上是一个对象，所以能往上面添加参数，见ps）。
```
var myStr = "I,love,you,Do,you,love,me";
var pattern = /.ove/;
myStr.match(pattern)                //["love", index: 2, input: "I,love,you,Do,you,love,me"]
pattern.exec(myStr)                 //["love", index: 2, input: "I,love,you,Do,you,love,me"]
```
加上全局匹配,匹配多次,exec()和match()返回的数组就不同。
```
var myStr = "I,love,you,Do,you,love,me";
var pattern = /(.)ove/g;
var result1 = myStr.match(pattern);
var result2 = myStr.match(pattern); 
var result3 = pattern.exec(myStr);
var result4 = pattern.exec(myStr);
result1                            //["love", "love"] 
result2                            //["love", "love"] 
result3                            //["love", "l", index: 2, input: "I,love,you,Do,you,love,me"]
result4                            //["love", "l", index: 18, input: "I,love,you,Do,you,love,me"]
```
ps：
```
var arrayObj = ["1","22"];
arrayObj["0"] = "hahaha1"; 
arrayObj["111"] = "hahaha2"; 
arrayObj["222"] = "hahaha3";
console.log(arrayObj);
```
.search仅返回查到的匹配的下标，如果匹配失败则返回-1.

```
myStr.search(pattern)                       //2
```



