/*页面路由*/
/*window.location.href = 'http://www.baidu.com';
history.back();*/


/*hash router*/
/*window.onhashchange = function () {
    console.log("curren hash:" + window.location.hash);
};*/

/*window.location.href = "#test1";
window.location.href = "#test2";*/



/*h5 router*/
window.onpopstate = function (e) {
    console.log("h5 router:" + e.state);

    console.log(window.location.href);
    console.log(window.location.pathname);
    console.log(window.location.hash);
    console.log(window.location.search);
};

/*history.pushState("test1","","#test1");
history.pushState("test2","","/test/test2");
history.replaceState("test3","","/test/test3");*/


