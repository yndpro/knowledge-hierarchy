

- 在一个node执行一个文件时，会给这个文件内生成一个 exports和module对象，
而module又有一个exports属性。他们之间的关系如下图，都指向一块{}内存区域。

![image](https://user-gold-cdn.xitu.io/2017/7/31/6227d4e0917f4af649d9f9e750eddb09?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


```
//utils.js
let a = 100;

exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}

exports = '指向其他内存区'; //这里把exports的指向指走

//test.js
```

从上面可以看出，**其实require导出的内容是module.exports的指向的内存块内容**，并不是exports的。
简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的。