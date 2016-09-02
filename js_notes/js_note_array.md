### 创建数组

用Array构造函数创建
```
var arr = new Array(5);
var arr2 = new Array('a', 'b', 'c');
```
使用[]创建数组

```
var arr1 = ['a','b'];
```
### 数组元素的访问和修改

```
var color = ['blue','red','green']
color[1]               //"red"
color[2] = 'yellow'    
color                  //["blue", "red", "yellow"]
```
### 数组length
```
var arr = ['a','b','c'];
arr.length;            // 3
arr.length = 2
arr                    //["a", "b"]
arr.length = 9
arr                    //["a", "b", undefined × 7]
```
### 数组转换
toString(),toLocaleString()以逗号分隔字符串的形式返回字符串。而join(),可以使用不同分隔符来构建返回字符串，只接受一个参数即分隔符。
```
var arr = ["a",1,"bbc",2];
arr.toString();       //"a,1,bbc,2"
arr.toLocaleString(); //"a,1,bbc,2"
arr.join("|")         //"a|1|bbc|2"
```
如果数组中有项是null或undefined,则上述方法返回结果以空字符表示。
```
var arr = ["a",1,"bbc",undefined,null,2];
arr.join("|")         //"a|1|bbc|||2"
```
### 栈和队列方法 
push()向数组末尾添加一个或多个元素，返回数组新长度。
```
var arr = []
arr.push(7,8)          //2
arr.push([4,5])        //3
```
pop()删除数组最后一个元素，返回被删元素的值。
```
arr.pop()             //[4, 5]
arr                   //[7, 8]
```
unshift()向数组的开头添加一个或多个元素，返回数组新长度。在开头添加，后面的元素都会移位，性能不好，可借助reverse();
```
arr.unshift(3,3,2)    //5
arr                   //[3, 3, 2, 7, 8]
```
shift()删除数组的第一个元素，并返回被删除的值。
```
arr.shift()           //3
arr                   //[3, 2, 7, 8]
```
push()和pop()可以模拟栈操作；push()和shift()可以模拟队列操作；unshift()和pop()可以模拟相反方向队列操作。
### 数组操作
concat()合并数组，是在原来的的基础上创建一个数组副本，返回这个数组副本。
```
var arr1 = ['Adrian','22','fe'];
var arr2 = arr1.concat('mu1','mu2');
arr2                  //["Adrian", "22", "fe", "mu1", "mu2"]
```

```
arr3 = arr2.concat(1,["a1","a2","a3"],["b1","b2"]);
arr3                  //["Adrian", "22", "fe", 1, "a1", "a2", "a3", "b1", "b2"]
```
对比上下添加数组的时候，push将数组整个添加到数组末尾， concat者将每个数组项添加到数组末尾。
```
arr1.push(1,["a1","a2","a3"],["b1","b2"])
arr1                  //["Adrian", "22", "fe", 1, Array[3], Array[2]]
```

slice()，返回一个数组副本，两个参数分别是起始位置和结束位置（不包括结束位置的项）；若只有一个参数，则返回指定位置到末尾项的数组；若为负值时，则从数组末尾算起；若前面参数项的位置在后面参数项的后面，则返回空数组。

```
var arr = [1,2,3,4,5,6,7,8];
arr2 = arr.slice(2,5)    //[3, 4, 5]
arr2 = arr.slice(6)      //[7, 8]
arr2 = arr.slice(-5,-3)  //[4, 5]
```
splice()对数组进行插入删除和替换。第一个参数是操作起始位置;第二参数是删除的数目,为0则不进行删除操作（即返回空数组）；第三个参数是要插入的数组项。返回被删除或被替换的数组项的数组。

```
var arr = [1,2,3,4,5,6]
arr.splice(2,3)          //[3, 4, 5]
arr                      //[1, 2, 6]
arr.splice(2,0,3,4,5)    //[]
arr                      //[1, 2, 3, 4, 5, 6]
arr.splice(3,3,"a","b","c")    //[4, 5, 6]
arr                            //[1, 2, 3, "a", "b", "c"]
```

### 数组排列
sort()对数组进行原地排列，并返回这个数组。没有参数时调用每个项的toString()将其转化为字符串用Unicode比较。默认是升序。

```
var arr = [2,1,5,23,56,2];
arr                   //[1, 2, 2, 23, 5, 56]
```
sort()接受一个比较函数，比较函数的两个参数即两个相邻项进行比较，记住一句话：比较函数要让第一个项排在第二个项之前则要返回负数。

数值数组升序：
```
var arr = ['1', '10', '22','5'];
function compare(a, b) {
    return a - b;
}
arr.sort(compare)     //["1", "5", "10", "22"]
```
数值数组随机：

```
var randomArray = [9,0,23,8,3,5];

function randomFun(a,b){
	return Math.random() - 0.5;
}

randomArray.sort(randomFun)  //[9, 0, 5, 23, 3, 8]
```
对象数组排列：
```
var dynamicArray = [
  { "name": "John Doe", "age": 29 }, 
  { "name": "Anna Smith", "age": 24 }, 
  { "name": "Peter Jones", "age": 39 }
];

function dynamicSort(property){
	var sortOrder = 1;           /*1升序，-1降序*/
	if(property[0] === "-"){
		sortOrder = -1;
		property = property.substr(1);

	}
	return function(a,b){
		var result = (a[property] > b[property]) ? 1 : (a[property] < b[property]) ? -1 : 0 ;
		return result * sortOrder ;
	}
}

dynamicArray.sort(dynamicSort('-age'))
```
![image](http://note.youdao.com/web/#/file/WEB7c9aee516d186a714dddbf2f3147f6c5/image/WEBd66329e9b94ad6e84ced6bb767a282ef)

reverse()颠倒数组中的位置项，返回颠倒后的数组。

```
var arr = ['4','2','54','35'];
arr.reverse();
arr                         //["35", "54", "2", "4"]
```

### 索引

indexof返回数组项下标,searchElement是要查找的数组项，fromIndex是指从什么位置向后查找（为负值则从数组最后开始计数位置，仍然向后查找）。索引值大于数组长度返回-1；
```
var arr = [0,1,2,3,4,5,6,5,4,3,2,1,0];
arr.indexOf(3)     //3
arr.indexOf(7)     //-1
arr.indexOf(5,3)   //5
arr.indexOf(5,6)   //7
arr.indexOf(2,-2)  //-1
arr.indexOf(2,-3)  //10
```
lastIndexOf()和indexOf相反，从后向前查找。
```
arr.lastIndexOf(2)      //10
arr.lastIndexOf(5,7)    //7
arr.lastIndexOf(5,5)    //5
arr.lastIndexOf(2, -1)  //10
```
在比较第一个参数和数组中的每一项时，用的是===严格等。
```
var person = {'name':'aa'};

arr1 = [{'name':'aa'}];     
arr2 = [person];

console.log(arr1.indexOf(person));   //-1  引用类型的对象的严格等是同一个引用*
console.log(arr2.indexOf(person));   //0
```
### 迭代方法


```
var peoples = [
    {
        name: 'Agraj',
        gender:'M',
        age: 29,
        address:
        {
            city: 'Delhi',
            pincode: '110064'
        }
    },
    {
        name: 'Mark',
        gender:'M',
        age: 35,
        address:
        {
            city: 'West Bengal',
            pincode: '220013'
        }
    },
    {
        name: 'Lance',
        gender:'M',
        age: 39,
        address:
        {
            city: 'Chandigarh',
            pincode: '201201'
        }
    },
    {
        name: 'Vikas',
        gender:'M',
        age: 21,
        address:
        {
            city: 'Noida',
            pincode: '201301'
        }
    },
    {
        name: 'Kanika',
        gender:'F',
        age: 21,
        address:
        {
            city: 'Noida',
            pincode: '201301'
        }
    }
];
```
forEach()为数组中的每一项运行给定的函数，没有返回值。和for差不多，这里就不再陈述了。
every()为数组中的每一项运行给定的函数，如果函数对每一项都返回true,则返回true。
```
var isEveryArr = peoples.every(function(item,index,array){
    return item.age > 20;
})
console.log(isEveryArr);    //true
```
some()为数组中的每一项运行给定的函数，如果函数对任意一项返回true,则返回true。
```
var isSomeArr = peoples.some(function(item,index,array){
    return item.age > 30;
})
console.log(isSomeArr);    //true
```
map()为数组中的每一项运行给定的函数,返回每次调用返回值组成的新数组。
```
var mapArr = peoples.map(function(item,index,array){
    return [item.name,item.age];
})
console.log(mapArr);
```
![image](http://note.youdao.com/favicon.ico)

filter()为数组中的每一项运行给定的函数,返回每次调用返回值为true的项组成的新数组。
```
var guys = peoples.filter(function(user,index){
	return user.gender === "M"
})
```
![image](http://note.youdao.com/favicon.ico)

### 归并方法

reduce()方法为每个元素调用一次callbackfn（常用作累加求和）。
```
array.reduce(callbackfn,[initialValue])
function callbackfn(preValue,curValue,index,array){}
```
- preValue: 上一次调用回调返回的值，或者是提供的初始值（initialValue）
- curValue: 数组中当前被处理的数组项
- index: 当前数组项在数组中的索引值
- array: 调用 reduce()方法的数组
```
var arr = [0,1,2,3,4];

arr.reduce(function (preValue,curValue,index,array) {
    return preValue + curValue;
},5); // 15
```

### 最大值与最小值


```
var arr = [1,45,23,3,6,2,7,234,56];
```


方法一：

```
Array.prototype.max = function(){
	var max = this[0];
	for(var i = 1;i<this.length;i++){
		if(this[i]>max){
			max = this[i];
		}
	}
	return max;
}
```
方法二

```
Array.prototype.max = function(){
	return this.reduce(function(preValue,curValue){
		return preValue > curValue ? preValue : curValue;
	})
}
```
方法三：内置函数Math.max()和Math.min()方法

```
Math.max(1,45,23,3,6,2,7,234,56)     //234

Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.max(arr)                       //234
```
### 数组去重


```
var arr = [1,45,23,'dad',3,6,'sd',2,45,'dad',234,56];
```

```
// 判断浏览器是否支持indexOf ，indexOf 为ecmaScript5新方法 IE8以下（包括IE8， IE8只支持部分ecma5）不支持

if (!Array.prototype.indexOf){
  // 新增indexOf方法
  Array.prototype.indexOf = function(item){
    var result = -1, a_item = null;
    if (this.length == 0){
      return result;
    }
    for(var i = 0, len = this.length; i < len; i++){
      a_item = this[i];
      if (a_item === item){
        result = i;
        break;
      }  
    }
    return result;
  }
}
```


方法一：遍历数组

```
Array.prototype.unique = function(){
	var arrTemp = [];
	for(var i = 0;i<this.length;i++){
		if(arrTemp.indexOf(this[i]) == -1){
			arrTemp.push(this[i]);
		}
	}
	return arrTemp;
}
```
方法一：判断数组下标

```
Array.prototype.unique = function(){
	var arrTemp = [this[0]];
	for(var i = 1;i<this.length;i++){
		if(this.indexOf(this[i]) == i){
			arrTemp.push(this[i]);
		}
	}
	return arrTemp;
}
```




