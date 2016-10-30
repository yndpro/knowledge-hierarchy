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

### 创建 RegExp 对象实例
例如要匹配"\hello\";

1.字面量：对元字符都必须转义（sp）

```
var pattern_1 = /\\hello\\/i;
```
2.构造函数创建：字符\需像常规在字符串那样中被转义成"\\"

```
var pattern_1 = new RegExp("\\\\hello\\\\","i");
```

### RegExp 实例属性和方法

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

### RegExp 构造函数属性

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
### 表达式规则

能够与'多种字符' 匹配

表达式 | 可匹配
---|---
\d | 任意一个数字，0~9 中的任意一个
\w | 任意一个字母或数字或下划线，也就是 A~Z,a~z,0~9,_ 中任意一个
\s | 包括空格、制表符、换页符等空白字符的其中任意一个
. | 小数点可以匹配除了换行符（/n）以外的任意一个字符

自定义能够匹配 '多种字符' 的表达式

表达式 | 可匹配
---|---
[ab5@] | 匹配 "a" 或 "b" 或 "5" 或 "@"
[^abc] | 匹配 "a","b","c" 之外的任意一个字符
[f-k] | 匹配 "f"~"k" 之间的任意一个字母
[^A-F0-3] | 匹配 "A"~"F","0"~"3" 之外的任意一个字符

修饰匹配次数的特殊符号

表达式 | 可匹配
---|---
{n} | 表达式重复n次；"/w{2}" 相当于 "/w/w"；"a{5}" 相当于 "aaaaa"
{m,n} | 表达式至少重复m次，最多重复n次；"ba{1,3}"可以匹配 "ba"或"baa"或"baaa"
{m,} | 表达式至少重复m次；"/w/d{2,}"可以匹配 "a12","_456","M12344"
? | 表达式0次或者1次，相当于 {0,1}；"a[cd]?"可以匹配 "a","ac","ad"
+ | 表达式至少出现1次，相当于 {1,}；"a+b"可以匹配 "ab","aab","aaab"
* | 表达式不出现或出现任意次，相当于 {0,}；"/^*b"可以匹配 "b","^^^b"

代表抽象意义的特殊符号

表达式 | 可匹配
---|---
^ | 与字符串开始的地方匹配，不匹配任何字符；比如："aaa xxx xxx"
$ | 与字符串结束的地方匹配，不匹配任何字符；比如："xxx xxx aaa"
\b | 匹配一个单词边界；表达式 "/bend/b" 匹配 "weekend,endfor,end"

影响表达式内部的子表达式

表达式 | 可匹配
---|---
竖线 | 左右两边表达式之间 "或" 关系；表达式 "Tom 竖线 Jack" 在匹配字符串 "I'm Tom, he is Jack"
( ) | (1)在被修饰匹配次数的时候，括号中的表达式可以作为整体被修饰；表达式 "(go/s*)+" 在匹配 "Let's go go go!" (2). 取匹配结果的时候，括号中的表达式匹配到的内容可以被单独得到

### 高级规则

1.匹配次数中的贪婪与非贪婪，以下例子针对文本"dxxxdxxxd"进行匹配。

贪婪模式指匹配次数不定的情况下为了让整个表达式能够匹配成功尽可能多的匹配。

表达式 | 可匹配
---|---
(d)(\w+)(d) | "\w+" 将匹配第一个 "d" 和最后一个 "d" 之间的所有字符 "xxxdxxx"。虽然 "\w+" 也能够匹配上最后一个 "d"，但是为了使整个表达式匹配成功，"\w+" 可以 "让出" 它本来能够匹配的最后一个 "d"

非贪婪模式，在修饰匹配次数的特殊符号后再加上一个 "?" 号，是指匹配次数不定的情况下表达式为了整个表达式匹配成功尽可能少的匹配

表达式 | 可匹配
---|---
(d)(\w+?)(d) | 为了让整个表达式匹配成功，"\w+?" 不得不匹配 "xxx" 才可以让后边的 "d" 匹配，从而使整个表达式匹配成功。因此，结果是："\w+?" 匹配 "xxx"

2.反向引用

引用前面 "括号内的子匹配已经匹配到的字符串",通过"\" 加上一个数字（括号的序号）表示。哪一对的左括号 "(" 在前，那这一对就先排序号。

表达式 | 可匹配
---|---
('竖线")(.*?)(\1) | "'aaaaaaaaa',\"bbbbbbbbbbb\""
<(\w+)\s*((\w+=('竖线").*?\3)\s*)*><\ \1> | <td id=\'td1\' style=\"bgcolor:white\"></td>

3.预搜索，不匹配

格式："(?=xxxxx)"，"(?!xxxxx)"所在缝隙的右侧，必须能够匹配上 xxxxx 这部分的表达式作为这个缝隙上附加的条件,并不影响后边的表达式去真正匹配这个缝隙之后的字符。类似于/b。

表达式 | 可匹配
---|---
Windows (?=NT竖线XP) | 在匹配 "Windows 98, Windows NT, Windows 2000"只匹配 "Windows NT" 中的 "Windows "，其他的 "Windows " 字样则不被匹配
((?!/bstop/b).)+ | 在匹配 "fdjka ljfdl stop fjdsla fdj"，将从头一直匹配到 "stop" 之前的位置，如果字符串中没有 "stop"，则匹配整个字符串。
(/w)((?=/1/1/1)(/1))+ | 在匹配字符串 "aaa ffffff 999999999"时，将可以匹配6个"f"的前4个，可以匹配9个"9"的前7个。这个表达式可以读解成：重复4次以上的字母数字，则匹配其剩下最后2位之前的部分。
