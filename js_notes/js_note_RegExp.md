## 正则
ECMAScript通过下面语法就能创建一个正则表达式，其中模式（pattern）部分为正则表达式；每个正则表达式可以带有一个或多个标志（flags）。

```
var expression = /pattern/flags;
```

支持下列3个标志（flags）：
- g:表示全局（global）模式,即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止。
- i:表示不区分大小写（case-insensitive）模式，忽略模式与字符串的大小写。
- m:表示多行（multline）模式，达到一行末尾时还能匹配下一行中是否存在与模式匹配的字符串。


模式（pattern）中所有元字符都必须转义，元字符包括：

```
( [ * ? ^ \ ] + . | $ )
```

#### 创建 RegExp 对象实例
例如要匹配"\hello\";

1.字面量：对元字符都必须转义（sp）

```
var pattern_1 = /\\hello\\/i;
```
2.构造函数创建：字符\需像常规在字符串那样中被转义成"\\"

```
var pattern_1 = new RegExp("\\\\hello\\\\","i");
```

#### RegExp 实例属性和方法

Param | Explanation
---|---
global | 是否设置g标志
ignoreCase | 是否设置i标志
multiline | 是否设置m标志
lastIndex | 开始搜索下一个匹配项的字符位置
source | 正则字符串表示（保存的是字面量形式的字符串）

exec()捕获组，每次也只会返回一个匹配项的信息（保存在返回的数组）。数组的第一项是匹配整个字符串，后面几项是模式中捕获组匹配的字符串，属性index为匹配项在字符串中的位置。
```
var str = " mon and dad and baby";
var pattern = /mon (and dad (and baby))/g;
pattern.exec(str);                               //["mon and dad and baby", "and dad and baby", "and baby", index: 1, input: " mon and dad and baby"]
```
没有/g则在在同一个 多次调用exex(),始终返回第一个匹配项；而有/g,则继续查找新匹配项。
```
var str = " cat, bat, sat, fat";
var pattern = /.at/;              //两次lastIndex都是0
var arr1 = pattern.exec(str);     //arr1 = ["cat", index: 1, input: " cat, bat, sat, fat"]
var arr2 = pattern.exec(str);     //arr2 = ["cat", index: 1, input: " cat, bat, sat, fat"]
```
```
var str = " cat, bat, sat, fat";
var pattern = /.at/g;             //第一次lastIndex是4，第二次lastIndex是9
var arr1 = pattern.exec(str);     //arr1 = ["cat", index: 1, input: " cat, bat, sat, fat"]
var arr2 = pattern.exec(str);     //arr2 = ["bat", index: 6, input: " cat, bat, sat, fat"]
```
test()，匹配模式与字符串是否匹配。

#### RegExp 构造函数属性

在执行exec()和test()这些属性会被自动填充

Param | Explanation
---|---
input | 最近一次（执行）要匹配的字符串
lastMatch | 最近一次（执行）的匹配项
lastParen | 最近一次（执行）的匹配的捕获组

```
var str = "this has been a short summerbhott ";
var pattern = /(.)ho(.)t/g;
if(pattern.test(str)){
    var b = pattern.test(str);
    console.log(RegExp.input);       //this has been a short summerbhott
    console.log(RegExp.leftContxt);
    console.log(RegExp.rightContxt);
    console.log(RegExp.lastMatch);   //bhott
    console.log(RegExp.lastParen);   //t
}
```
还有九个用于9个用于储存捕获组的构造函数属性RegExp.$1...RegExp.$9
```
var str = "this has been a short summerbhott ";
var pattern = /(..)o(.)t/g;
if(pattern.test(str)){
    var b = pattern.test(str);
    console.log(RegExp.$1);    //bh
    console.log(RegExp.$2);    //t
}
```

