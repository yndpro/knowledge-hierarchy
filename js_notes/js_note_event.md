## js事件绑定的几种方式

##### 方式一：

在dom元素的onclick等以on开头的属性值中编写,onclick属性中的this代表的是当前被点击的DOM对象。

```
<div id="nodeA" onclick="alert(this);">nodeAText</div>   //[object HTMLDivElement]
```

##### 方式二：
在onclick等属性中指定函数名,事件处理函数中的this代表的是window对象。
```
<script>
    function fnHandleB(nodeB) {
        // body...
        alert(this);      //[object Window]
        alert(nodeB);     //[object HTMLDivElement]
    }
</script>
<div id="nodeB" onclick="fnHandleB(this);">nodeBText</div>
```

##### 方式三：
在JS代码中通过dom元素的onclick等属性，this代表当前的DOM对象，只能绑定一个事件处理函数，后面的会覆盖前面的。
```
<div id="nodeC">nodeCText</div>
<script>
    var nodeC = document.getElementById('nodeC');
    nodeC.onclick = function(){
        alert(this.id + '1');    //不执行
    }
    nodeC.onclick = function(){
        alert(this.id + '2');    //nodeC2
    }
</script>
```

##### 方式四：
attachEvent/detachEvent

this代表当前的window对象（和W3C事件做对比）

```
var nodeD = document.getElementById('nodeD');
nodeD.attachEvent('onclick',fnHandleD);
function fnHandleD(){
    alert(this);         //[object Window]
}
```
同一个事件处理函数只能绑定一次。（和W3C事件做对比）
```
var nodeD = document.getElementById('nodeD');
nodeD.attachEvent('onclick',fnHandleD1);
nodeD.attachEvent('onclick',fnHandleD1);
function fnHandleD1(){
    alert('1');
}
```
不同的函数对象，可以重复绑定，不会覆盖。注：匿名函数和匿名函数是互相不相同的函数对象，即使代码完全一样。

```
var nodeD = document.getElementById('nodeD');
nodeD.attachEvent('onclick',function(){alert('1');});    //1
nodeD.attachEvent('onclick',function(){alert('1');});    //1
```
##### 方式五：
W3C标准的addEventListener和removeEventListener，事件类型都不含"on"。

this代表的是dom对象，不是window，这个特性与attachEvent不同。

```
var nodeE = document.getElementById('nodeE');
nodeE.addEventListener('click',fnHandleE);
function fnHandleE(){
    alert(this);
}
```
同一个事件处理函数可以绑定2次,一次用于事件捕获，一次用于事件冒泡。
```
var nodeE = document.getElementById('nodeE');
nodeE.addEventListener('click',fnHandleE,false);
nodeE.addEventListener('click',fnHandleE,true);
function fnHandleE(){
    alert(this);
}
```
不同的事件处理函数可以重复绑定，这个特性与attachEvent一致。

## 事件冒泡和事件捕获

DOM事件流
将事件分为三个阶段：捕获阶段、目标阶段、冒泡阶段。先调用捕获阶段的处理函数，其次调用目标阶段的处理函数，最后调用冒泡阶段的处理函数。

```
<div id="out1" style="width:400px; height:400px; background:#CDC9C9;position:relative;">
    <div id="out2" style="height:200; background:#0000ff;top:100px;position:relative;">
        <div id="out3" style="height:100px; background:#FFB90F;top:50px;position:relative;"></div> 
    </div>
</div>
<script>
    window.onload = function(){
        var out3 = document.getElementById('out3');
        var out2 = document.getElementById('out2');
        var out1 = document.getElementById('out1');

        out3.addEventListener('click',function(){alert("target3")});

        out1.addEventListener('click',function(){alert("Bubble1")},false);
        out2.addEventListener('click',function(){alert("Bubble2")},false);

        out1.addEventListener('click',function(){alert("Capture1")},true);
        out2.addEventListener('click',function(){alert("Capture2")},true);
    }
</script>
```


依次打印出 capture1–>capture2–>target–>bubble2–>bubble1。

useCapture=false意味着：将事件处理函数加入到冒泡阶段，在冒泡阶段会被调用；useCapture=true意味着：将事件处理函数加入到捕获阶段，在捕获阶段会被调用。outC（这个是目标对象）上触发onclick事件，冒泡还是捕获都无所谓了（实际上处在目标阶段，体会：以目标阶段为准，产生事件流），执行顺序按照注册先后。从DOM事件流模型可以看出，捕获阶段的事件处理函数，一定比冒泡阶段的事件处理函数先执行。目标阶段的处理函数，先注册的先执行，后注册的后执行。

```
out3.addEventListener('click',function(event){
    event.stopPropagation();
    alert("target3");
    
});
out1.addEventListener('click',function(event){alert("Bubble1");},false);
out1.addEventListener('click',function(event){alert("Capture1");},true);
```
通过event.stopPropagation()阻止事件继续传播（IE8以前用window.event.cancelBubble=true）



