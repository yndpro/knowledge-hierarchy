
### 区分module 和 component 两个概念
module 更多语言层面，往往表现一个单独文件，对外暴露属性方法

component 更多业务层面，一个功能实现，往往包含所需的所有资源包括 逻辑（js）样式（css）模版（html）图片，字体  
e. 一个UI部件 一个路由系统 


### 前端模块化方案

1.namespace

2.AMD&CommonJS

3.ES6


### 前端组件化方案

组件化方案在模块化方案基础上演变。

1.基于命名空间的多入口文件组件
    
- 基于第一种模块化方案
- 不同资源分别手动引入

eg.以前很多网上的Jquery插件

2.基于模块的多入口文件组件

- 一个AMD模块，js的实现；逻辑趋于用AMD规范组织js，把自己暴露为一个模块
- 一个CSS文件（LESS，SASS），样式内容；样式和其他资源没纳入模块化方案里。

3.单JavaScript入口文件

browserify,webpack 等打包工具的出现解决了上一方案的遗留问题。允许将其他资源视作和js同等的模块。于是组件的所有依赖都可以在自己的实现中声明，而对外只暴露一个js模块作为入口

```
foo/
    - img/
    - style.css
    - index.js
bar/
    ...
```
index.js

```
require('./style.css')
const bar = require('./bar')

module.exports = function(){
    ...
}
```

### 包管理器 

软件包管理器是指在计算机中自动安装，配置，卸载和升级软件包的工具。如Mac下的homebrew, Python Ruby下的pip Gem这两个包管理器。

前端开发者习惯逛各种网站下载远吗放到自己的项目中，后来前端有了Bower Npm等包管理器。

### 包和模块

包（package）是用package.json描述的文件夹或文件

模块（module）更为具体，任何可以在Node.js中被require载入的文件。

不是所有的包都是模块，比如一些CLI包只包括可执行的命令行工具


### 模块规范

### CommonJS

CommonJS 扩展了JavaScript声明模块的API。浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量 (module  exports  require  global)。

```
var module2 = {
    print : function(){
        return 2
    }
}
console.log("module2")

module.exports = module2;
```
```
var module2 = require('./module2');
var module3 = require('./module3');

console.log(module2.print() + module3.print());
console.log('module1');
```
因为require是同步的,模块系统需要同步读取模块文件内容，并编译执行以得到模块接口。所以其更适合服务端，服务器读取模块都是在本地磁盘，加载速度很快。客户端还要等待模块请求成功，加载完毕。

CommonJS创建了两份模块的实例，一个在导出的时候，一个在引入的时候，而ES6 模块实时只读的。

### AMD

AMD 即(Asynchronous Module Definition),这种规范是异步的加载模块。RequireJs应用了这一规范。先定义所有依赖，然后在加载完成后的回调函数中执行。

```
define([
    'module4',
    'module5'
], function(module4,module5) {
    console.log("module2")
    return function(){
        return (2 + module4() + module5())
    }
});
```
AMD是优先浏览器的一种异步载入模块的解决方案。（记得，很多人认为一个个地载入小文件是很低效的（script标签是异步载入？），我们将在下一篇文章理介绍如何打包模块）

### CMD

CMD（Common Module Definition）即通用模块定义，CMD有个浏览器的实现SeaJS；

- 一个文件一个模块，所以经常就用文件名作为模块id
- CMD推崇依赖就近，所以一般不在define的参数中写依赖，在factory中写

```
define(function (require, exports, module) {
    console.log("module21")

    var module4 = require('module4');
    var module5 = require('module5');

    console.log("module2");

    module.exports = {
        print : function(){
            return 2 + module4.print() + module5.print();
        }
    };
});
```

### AMD与CMD区别

- 两者加载模块都是异步的;**AMD推崇依赖前置**，在定义模块的时候就要声明其依赖的模块，js可以方便知道依赖模块是谁，立即加载;**CMD推崇就近依赖**，只有在用到某个模块的时候再去require，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，立即加载; 
- **对依赖模块的执行时机处理不同**;AMD在加载模块完成后就会执行改模块，依赖模块的执行顺序和书写顺序不一定一致（demo 控制台5不一定在4后面），哪个先下载下来，哪个先执行，所有模块都加载执行完后会进入require的回调函数，执行主逻辑；CMD加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到require语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的。（demo 控制台5一定在4后面）

### UMD

在一些同时需要AMD和CommonJS功能的项目中，你需要使用另一种规范：Universal Module Definition（通用模块定义规范）。可以同时在客户端和服务端使用。


### 模块打包的意义

以前没有模块打包：

- 每个独立的<script>标签依次加载多个js文件，浏览器会停止网页渲染，网页失去响应的时间就会越长。

- js文件之间存在依赖关系，保证加载顺序，依赖关系很复杂的时候，代码的编写和维护都会变得困难。

为了解决这个问题，我们就需要进行模块打包，把所有的模块合并到一个或几个文件中，以此来减少HTTP请求数。这也可以被称作是从开发到上线前的构建环节。

### 打包模块的方法

如果你使用的是一些浏览器原生不支持的模块系统（例如CommonJS 或 AMD，以及ES6 模块的支持现在也不完整），你就需要使用一些专门的构建工具来把它们转换成浏览器支持的代码。模块系统经历了长久的演变，对应模块打包方案几经变迁。

### 打包 CommonJS

 Browserify分析依赖，构建。

（想象 打包前后 载入时间和编译时间的timeline）

### 打包 AMD

需要一些例如RequireJS 的AMD加载器让你在应用中按需加载模块代码。

AMD是异步加载模块，这也就意味着你不是必须把所有的代码打包到一个文件里，模块加载不影响后续语句执行。不过在实际应用中，为了避免用户过多的请求对服务器造成压力。大多数的开发者还是用构建工具来合并和压缩AMD的模块。

总的来说，在开发过程中，采用AMD的应用直到正式上线发布之前都不需要构建。

RequireJS

- 实现js文件的异步加载，避免网页失去响应；

- 管理模块之间的依赖性，便于代码的编写和维护。


### CommonJS与ES6区别

> require: node 和 es6 都支持的引入
> 
> export / import : 只有es6 支持的导出引入
> 
> module.exports / exports: 只有 node 支持的导出


- ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系(“静态优化”)，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西(“运行时加载”)。

- ES6模块是动态引用，如果使用import从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。CommonJS模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。


- ES6模块不是对象，而是通过export命令显式指定输出的代码，输入时也采用静态命令的形式。
CommonJS和AMD模块是一个对象。


- ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。

    CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
    
```
// counter.js
exports.count = 0
setTimeout(function () {
  console.log('increase count to', exports.count++, 'in counter.js after 500ms')
}, 500)

// commonjs.js
const {count} = require('./counter')
setTimeout(function () {
  console.log('read count after 1000ms in commonjs is', count)
}, 1000)

//es6.js
import {count} from './counter'
setTimeout(function () {
  console.log('read count after 1000ms in es6 is', count)
}, 1000)
```

```
➜  test node commonjs.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in commonjs is 0
➜  test babel-node es6.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in es6 is 1
```



reference :

https://juejin.im/post/5a422b036fb9a045211ef789

https://juejin.im/post/597ec55a51882556a234fcef

https://wmaqingbo.github.io/blog/2017/09/15/ES6%E6%A8%A1%E5%9D%97-%E5%92%8C-CommonJS-%E7%9A%84%E5%8C%BA%E5%88%AB/