


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

exec()函数是在正则上调用，传递字符串的参数。对于上面两个方法，仅仅是把正则和字符串换了个位置，匹配结果都是一样的。
```
var myStr = "I,love,you,Do,you,love,me";
var pattern = /love/;
var result = myStr.match(pattern);           //["love"]
var result = pattern.exec(myStr);           //["love"]
result.index                                 //2
result.input                                 //"I,love,you,Do,you,love,me"
```
如果参数regExp设有全局标志g,返回的数组不再有index和input属性，其中的数组元素就是所有匹配到的子字符串

```
result2 = myStr.match(/love/g)               //["love", "love"]
```
.search仅返回查到的匹配的下标，如果匹配失败则返回-1.

```
myStr.search(pattern)                       //2
```


