/**
 * Created by Adrian.
 */



 window.onload = function() {
    // body...

    var list = document.getElementById('list');
    var box = getChildNodes(list);
    
    
    function getChildNodes(el){

        var childArr = el.children || el.childNodes;
        var childArrTemp = new Array();
        for(var i = 0,len = childArr.length;i < len;i++){
            if(childArr[i].nodeType == 1){
                childArrTemp.push(childArr[i]);
            }
        }
        return childArrTemp;
    }


    var praiseBox = function(el){

        var box = el.parentNode.parentNode.parentNode;
        var totalPraise = box.getElementsByClassName('praises-total')[0];
        var countPraise = parseInt(totalPraise.getAttribute('total'));

        if(el.innerHTML == "赞"){
            totalPraise.innerHTML = countPraise==1 ? '我觉得很赞' : '我和'+countPraise+'人都觉得很赞';
            countPraise += 1;
            totalPraise.setAttribute('total',countPraise);
            el.innerHTML = "取消赞";
        }else{
            countPraise -= 1;
            totalPraise.innerHTML = countPraise==0 ? '' : countPraise+'人都觉得很赞';
            totalPraise.setAttribute('total',countPraise);
            el.innerHTML = "赞"; 
        }
    } 

    /**
     * 事件代理
     */
    box[0].onclick = function(e){
        
        var el = e.srcElement;
        switch(el.className){

            case 'praise':
                praiseBox(el);
                break

        }


        

    }





 }