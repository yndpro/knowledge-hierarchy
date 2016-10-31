# Dom

节点树，节点分为几种不同类型。文档节点是每个文档的根节点，文档节点下有个文档元素（即<html>元素）。


```
<html lang="en">
    <head>
    	<title>Document</title>
    </head>
    <body>
    	<p>Hello World!</p>
    </body>
</html>
```
![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/dom1.JPG)

### Node类型
DOM1定义了一个Node接口。

该接口由DOM中的所有节点类型实现。

该接口在javascript中是作为Node类型实现的，javascript中所有节点类型都继承自Node类型，共享属性和方法。

#### 属性
childNodes里是一个NodeList(类似数组，所以可用Array.prototype.slice.call转化为数组，并且用[]访问NodeList里头的节点)。
它实际上是基于DOM结构动态执行的查询结果，而不是我们第一次访问它们的某个瞬间所拍摄下来的一张快照。


```
var nodeList = document.querySelectorAll('#j-form1 input');

function convertNodeToArray(nodeList){
	
	try{
		return Array.prototype.slice.call(nodeList,0);
	}catch(ex){
		var arr = [];
		for (var i = 0,len = nodeList.length; i < len; i++) {
			arr.push(nodeList[i]);
		}
		return arr;
	}
}
var result = convertNodeToArray(nodeList);
```
nodeType表明节点类型

```
if(form1.nodeType == 1){
	console.log(form1.nodeName);   //FORM
}
```

常用的还有nextSibling,previousSiling,firstChild,parentNode,nodeValue等属性。

![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/dom2.JPG)
#### 方法
常用的有appendChild(),insertBefore(),replaceChild(),removeChild(),hasChildNodes()等（注：并不是所有节点都有子节点，所以有些节点调用会报错）。

cloneNode****


### Document类型

在浏览器中，(竖向)document对象是HTMLDocument（继承自Document类型，继承自Node类型）类型的实例，表示整个HTML页面。（横向）并且，document对象是window对象的其中一个属性，因此可以将其做为全局对象来访问。


#### 属性
文档中只包含一个子节点，即<html>元素，可以通过documentElement取得引用(<body>也是)。

```
document.documentElement == document.childNodes[0]    //true
document.body             //取得对<body>的引用
```

document.domain取得域名，如果域名不同页面间会受到跨域的限制，设置相同域名，可以实现两个页面的通信（互相访问js对象）

```
document.URL    //"https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild"
document.domain //"developer.mozilla.org"
```
还有其他属性：document.forms,document.images等，返回HTMLCollection类型的对象。
#### 方法
getElementsById,getElementsByTagName返回的是一个HTMLCollection类型的对象（与NodeList对象相似），可以向其传入字符串形式的索引值。getElementsByName常用于单选。

```
document.getElementsById("mydiv");      //取得节点（div元素）的引用
document.getElementsByTagName("input");
document.getElementsByTagName("input")["userName"];
document.getElementsByName("color")
```

document.write(),document.writeIn()，等方法提供了输出流写入网页的能力。这样做会动态创建一个Dom元素，而且可以在将来访问。字符串"<\/script>"将不会被解析为外部script的关闭标签。
```
document.write("<strong>error!</strong>");
document.write("<script src=\"js/mock-min.js\"><\/script>");
```
document.createElement()创建elementNode。同样的，createAttribute创建Attr类型的实例。
```
document.createElement("div");   //<div></div>
```
### Elenment类型

所有html元素都是HTMLElement类型（继承自Element类型,继承自Node类型）的实例，不是直接通过这个类型，也是通过它的子类型，即元素<form>是HTMLFormElement类型的实例，元素<div>是HTMLDivElement类型的实例。

#### 属性
id,title,className等通过对象属性来访问特性。只有公认的（非自定义）特性才会以属性的形式添加到DOM对象当中去。title和align是<div>的公认特性。

```
<div id="newNode" dataid="aaa" title="n-list" align="left"></div>
```
```
var node = document.getElementById("newNode");
node.align             //left
node.title             //n-list
node.dataid            //undefined
```
attributes属性中包含一个NameNodeMap对象,元素的特性都保存在NameNodeMap对象中。

#### 方法
getAttribute(),setAttribute(),removeAttribute()。可取得自定义的特性。setAttribute()设置class,style,事件处理程序没效果，所以一般用属性来设置特性。

```
<div id="newNode" dataid="aaa"></div>
```
```
document.getElementById('newNode').getAttribute("id")   //newNode
document.getElementById('newNode').getAttribute("dataid")    //aaa
```



两类特殊，属性的值与通过getAttribute()不同；style用getAttribute()方法返回的是文本，用DOM对象的属性访问返回的是一个对象；同样的，onclick这样的事件处理程序getAttribute()方法返回的是代码字符串，而访问onclick属性返回的是一个函数。所以开发一般通过属性来操作。(setAttribute也是)
```
document.write("<div id='aa' style='width:300px'></div>");

var div = document.getElementById("aa");
div.style   //CSSStyleDeclaration {0: "width", alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: ""…}
div.getAttribute("style");   //"width:300px"


document.write("<div id='dd' onclick='change();'></div>");

var dd = document.getElementById("dd");
dd.onclick                 //function onclick(event) {change();}
dd.getAttribute("onclick") //"change();"
```

和document一样element也支持getElementsByTagName()方法。

### Attr类型
从技术角度讲，特性就是处在于element的attributes属性（包含一个NameNodeMap对象）中的节点。尽管也是节点，但特性不认为是DOM文档树的一部分，开发人员很少引用特性节点。
#### 属性
name,value,specified等

```
var attrUid = document.createAttribute("data-uid");
attrUid.value = "007";
list.setAttributeNode(attrUid);
console.log(list.getAttribute("data-uid"));     //"007"
console.log(list.getAttributeNode("data-uid").value);//"007"
console.log(list.attributes["data-uid"].value);//"007"
```

其他类型...

### Dom操作技术


```
function loadScript(url){
	if(typeof url != "string"){
		return
	}

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
}

function loadScriptString(str){
	if(typeof str != "string"){
		return
	}
	var script = document.createElement("script");
	script.type = "text/javascript";

	try{
		script.appendChild(document.createTextNode(str));
	}catch(ex){
		script.text = str;
	}

	document.body.appendChild(script);
}

function loadStyle(url){
	if(typeof url != "string"){
		return
	}

	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;

	document.getElementsByTagName("head")[0].appendChild(link);
}

function loadStyleString(str){
	if(typeof str != "string"){
		return
	}

	var style = document.createElement("style");
	style.type = "text/css";

	try{
		style.appendChild(document.createTextNode(str));
	}catch(ex){
		style.styleSheet.cssText = str;
	}

	document.getElementsByTagName("head")[0].appendChild(style);
}
```

# Dom扩展

querySelector,querySelectorAll方法接受一个css选择符。querySelectorAll返回一个NodeList实例;

readyState属性表明文档已加载完毕。

```
window.onload = function(){
	if(document.readyState == "complete"){
		
	}
}
```
scrollIntoView()，调用元素滚动到可视区，HTMLElement 类型的扩展。
### innerHTML
为innerHTML设置字符串后，浏览器会将值解析成DOM树，因此设置innerHTML字符串后再从中读取HTML字符串会得到不一样的结果。innerHTML插入<srcipt>标签，不会执行脚本。

```
div.innerHTML = "Hello world <b>\"Apple\"</b>";
```
解析后：

```
div.innerHTML = "Hello world <b>&quot;Apple&quot;</b>";
```
ousterHTML操作调用他的元素以及其所有的子节点的标签。

假设某个元素有个事件处理程序，在使用上述的某个属性将元素从文档中删除，元素与事件处理程序的绑定关系在内存中并没有一并删除。因此在使用上述属性，最好先手工删除被替换元素的所有事件处理程序。不过在插入大量html标记时，效率比创建节点高，这是因为它会创建一个html解析器。不可避免，创建和销毁解析器会带来性能损失，所以注意控制次数。

```
for (var i=0, len=values.length; i < len; i++){
    ul.innerHTML += "<li>" + values[i] + "</li>"; //要避免这种频繁操作！！
}
```
应改为对innerHTML 执行了一次赋值操作
```
var itemsHtml = "";
for (var i=0, len=values.length; i < len; i++){
itemsHtml += "<li>" + values[i] + "</li>";
}
ul.innerHTML = itemsHtml;
```
# DOM2和DOM3
### style

HTML 元素在JavaScript 中都有一个对应的style 属性，返回的 style对象（CSSStyleDeclaration类型）实例不包含与外部样式表或嵌入样式表经层叠而来的样式。属性转换成驼峰大小写形式。“DOM2级样式”规范还为style 对象定义了一些属性和方法，比如cssText，应用多项变化最快捷的方式，因为可以一次性地应用所有变化。
注：height样式定义在样式表里。
```
node.style.backgroundColor = "#000";
node.style.border = "1px solid red";
node.style.height;    //""
node.style.cssText;   //width: 300px; border: 1px solid red; background-color: rgb(0, 0, 0);   
```
“DOM2 级样式”增强了document.defaultView，提供getComputedStyle()方法，也是返回一个CSSStyleDeclaration类型的实例，其中包含当前元素的所有计算的样式。IE 可以用currentStyle 代替。
```
var computedStyle = document.defaultView.getComputedStyle(node,null);
computedStyle.height  //"200px"
```

操作样式表，CSSStyleSheet 类型表示的是样式表，包括通过link元素包含的样式表和在style元素中定义
的样式表。有读者可能记得，这两个元素本身分别是由HTMLLinkElement 和HTMLStyleElement 类型
表示的。但是，CSSStyleSheet 类型相对更加通用一些，它只表示样式表，而不管这些样式表在HTML
中是如何定义的。此外，上述两个针对元素的类型允许修改HTML 特性，但CSSStyleSheet 对象则是一
套只读的接口（有一个属性例外）。CSSStyleSheet 继承自StyleSheet，后者可以作为一个基础接口来定义非CSS 样式表。从
StyleSheet 接口继承而来的属性如下。通过document.styleSheets获得CSSStyleSheet 对象的集合，也可以直接通过link或style元素取得CSSStyleSheet 对象。

```
document.styleSheets[0]   //[CSSStyleSheet]

var link = document.getElementsByTagName("link")[0];
function getStyleSheet(elementLink){
	return elementLink.sheet || elementLink.styleSheet;
}
getStyleSheet(link)      //[CSSStyleSheet]
```

### 元素大小


偏移量

![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/dom3.JPG)



客户区大小，例子是确定浏览器视口大小

![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/dom4.JPG)


```
function getViewPort(){
	/*是否是IE混杂模式*/
	var mode = document.compatMode == "BackCompat" ? "body" : "documentElement";
		
	return {
		width:document[mode].clientWidth,
		height:document[mode].clientHeight
	}
}
```


滚动大小，例子是确定文档的总高度
![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/dom5.JPG)

```
function getDocSize(){
	/*是否是IE混杂模式*/
	var mode = document.compatMode == "BackCompat" ? "body" : "documentElement";

	return {
		width:Math.max(document[mode].clientWidth,document[mode].scrollWidth),
		height:Math.max(document[mode].clientHeight,document[mode].scrollHeight)
	}
}
```
可设置元素的滚动位置

```
function scrollToTop(element){
	if(element.scrollTop != 0){
		element.scrollTop = 0;
	}
}
```
getBoundingClientRect()返回一个矩形对象，相对于视口的位置。


### 遍历

“DOM2 级遍历和范围”模块定义了两个用于辅助完成顺序遍历DOM 结构的类型：NodeIterator
和TreeWalker。这两个类型能够基于给定的起点对DOM 结构执行深度优先（depth-first）的遍历操作。

```
<!DOCTYPE html>
<html>
	<head>
		<title>Example</title>
	</head>
	<body>
		<p><b>Hello</b> world!</p>
	</body>
</html>
```

![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/dom6.png)

图展示了对以document 为根节点的DOM树进行深度优先遍历的先后顺序。

![image](https://github.com/adrianhk/knowledge-hierarchy/blob/master/js_notes/images/dom7.png)

可以通过createNodeIterator()方法的filter 参数来指定自定义的NodeFilter 对象，或者
指定一个功能类似节点过滤器（node filter）的函数。每个NodeFilter 对象只有一个方法，即accept-
Node()；如果应该访问给定的节点，该方法返回NodeFilter.FILTER_ACCEPT，如果不应该访问给
定的节点，该方法返回NodeFilter.FILTER_SKIP。由于NodeFilter 是一个抽象的类型，因此不能
直接创建它的实例。在必要时，只要创建一个包含acceptNode()方法的对象，然后将这个对象传入
createNodeIterator()中即可。
```
<div id="div1">
	<p><b>Hello</b> world!</p>
	<ul>
		<li>List item 1</li>
		<li>List item 2</li>
		<li>List item 3</li>
	</ul>
</div>
```

```
var div = document.getElementById("div1");

/*定义过滤器*/
var filter = function(node){
	return node.tagName.toLowerCase() == "li" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
}

/*定义迭代器*/
var iterator = document.createNodeIterator(div,NodeFilter.SHOW_ELEMENT,filter,false);

/*使用迭代器迭代*/
var curNode = iterator.nextNode();
while(curNode != null){
	console.log(curNode.tagName);
	curNode = iterator.nextNode();
}
```
迭代器只会返回li元素。

TreeWalker和NodeIterator类似，TreeWalker 真正强大的地方在于能够在DOM结构中沿任何方向移动。
```
/*定义迭代器*/
var walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, null, false);

walker.firstChild(); //转到<p>
walker.nextSibling(); //转到<ul>

/*使用迭代器迭代*/
var curNode = walker.firstChild();   //转到第一个<li>
while(curNode != null){
	console.log(curNode.tagName);
	curNode = walker.nextSibling();
}
```

