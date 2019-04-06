/**
 * Created by 4399-1068 on 2017/4/7.
 */


/*领取激活码接口
@descrition 领取激活码接口（1个参数）
@interface  _zt._ztUrl + "-ajaxGetCode-prize-" + prize + "-_AJAX_-1"
@method POST
@param prize 是奖品id
*/
Mock.mock('http://ajaxGetCode-prize.cn', {
    "status":1,
    "msg":"恭喜获得礼包码",
    "data":{
        "prizeName":"礼包名称",
        "code":"2453254234",
    }
});



/*预约*/
Mock.mock('http://ajaxYy.cn', {
    "status":1,
    "msg":"XXXXX",
    "data":{

    }
});



/*test*/
Mock.mock('http://ajaxTest.cn', {
    "status":1,
    "msg":"XXXXX",
    "data":{
        "time" : 5
    }
});



/*签到*/
Mock.mock('http://ajaxSign.cn', {
    "status":1,
    "msg":"签到成功",
    "data":{
        "num":8,
        "n":"5",
        "j":"3",
        "Ymd":"20170503",
        "lastTimes":888890
    }
});





Mock.mock('http://ajaxWriteUserInfo.cn', {
    "status":1,
    "msg":"报名成功",
    "data":{}
});

Mock.mock('http://ajaxShare.cn', {
    "status":1,
    "msg":"1",
    "data":{
        "status":1
    }
});



Mock.mock('http://ajaxLottery.cn', {
    "status":1,
    "msg":"抽奖成功",
    "data":{
        "prize":1,
        "prizeName":"游戏礼包（普通）",
        "step":2,
        "lastTimes":900,
        "code":24332432,
        "kind":4,
        "url":"http:\/\/ssjj.4399.com"
    }
});


Mock.mock('http://ajaxGetCode.cn', {
    "status":1,
    "msg":"抽签成功",
    "data":{
        "id":"",
        "prizeName":"礼包名称",
        "code":"2453254234",
        "pid":"66",
        "kind":"1",
        "url":"http:\/\/ssjj.4399.com"
    }
});







Mock.mock('http://ajaxGetMyPrizes.cn', {
    "status": 1,
    "msg": "奖品信息",
    "data": {
        "count": 32,//总个数
        "pagecount": 4, //总页数
        "list": [
            {
                //基本字段
                "id": "1",//中奖id
                "prize": "0",//奖品id
                "prizeName": "XXXXX1",//奖品名称
                "kind": 1,//奖品类型

                //如果是礼包 kind = 1
                "code": "1267645584_0",//礼包

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": 1, // 是否已经填写了用户信息0 未填写 1 已填写
                "uname": "xxxx",//用户姓名
                "uphone": "110",//用户联系方式
                "uaddress": "xxxxxx",//用户地址

                "url":"http:\/\/ssjj.4399.com"
            },

            {
                //基本字段
                "id": "1",//中奖id
                "prize": "0",//奖品id
                "prizeName": "XXXXX1",//奖品名称
                "kind": 3,//奖品类型

                //如果是礼包 kind = 1
                "code": "1267645584_22",//礼包

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": 1, // 是否已经填写了用户信息0 未填写 1 已填写
                "uname": "aaaa",//用户姓名
                "uphone": "110",//用户联系方式
                "uaddress": "423423r234324",//用户地址
                "idcard":"111111"
            },

            {
                //基本字段
                "id": "1",//中奖id
                "prize": "0",//奖品id
                "prizeName": "XXXXX2",//奖品名称
                "kind": 1,//奖品类型

                //如果是礼包 kind = 1
                "code": "1267645584_1",//礼包

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": 1, // 是否已经填写了用户信息0 未填写 1 已填写
                "uname": "xxxx",//用户姓名
                "uphone": "110",//用户联系方式
                "uaddress": "xxxxxx",//用户地址

                "url":"http:\/\/ssjj.4399.com"
            },


            {
                //基本字段
                "id": "1",//中奖id
                "prize": "77",//奖品id
                "prizeName": "XXXXX4",//奖品名称
                "kind": 3,//奖品类型

                //如果是礼包 kind = 1
                "code": "1267645584_22",//礼包

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": 0 // 是否已经填写了用户信息0 未填写 1 已填写

            },

            {
                //基本字段
                "id": "1",//中奖id
                "prize": "2",//奖品id
                "prizeName": "XXXXX4",//奖品名称
                "kind": 4,//奖品类型

                //如果是礼包 kind = 1
                "code": "1267645584_22",//礼包

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": 0 // 是否已经填写了用户信息0 未填写 1 已填写

            }

        ]
    }
});




/*签到*/
Mock.mock('http://ajaxGetSignTbl.cn', {
    "status": 1,
    "msg": "签到数据！",
    "data": {
        "tbl": [
            {
                "n": "5",
                "j": "1",
                "Ymd": "20170501",
                "cur": 0
            },
            {
                "n": "5",
                "j": "2",
                "Ymd": "20170502",
                "cur": 1,
                "type": 1
            },
            {
                "n": "5",
                "j": "3",
                "Ymd": "20170503",
                "cur": 0
            },
            {
                "n": "5",
                "j": "4",
                "Ymd": "20170504",
                "cur": 0,
                "type": 2
            },
            {
                "n": "5",
                "j": "5",
                "Ymd": "20170505",
                "cur": 0
            },
            {
                "n": "5",
                "j": "6",
                "Ymd": "20170506",
                "cur": 0
            },
            {
                "n": "5",
                "j": "7",
                "Ymd": "20170507",
                "cur": 0
            },
            {
                "n": "5",
                "j": "8",
                "Ymd": "20170508",
                "cur": 0
            },
            {
                "n": "5",
                "j": "9",
                "Ymd": "20170509",
                "cur": 0
            },
            {
                "n": "5",
                "j": "10",
                "Ymd": "20170510",
                "cur": 0
            },
            {
                "n": "5",
                "j": "11",
                "Ymd": "20170511",
                "cur": 0
            },
            {
                "n": "5",
                "j": "12",
                "Ymd": "20170512",
                "cur": 0
            },
            {
                "n": "5",
                "j": "13",
                "Ymd": "20170513",
                "cur": 0
            },
            {
                "n": "5",
                "j": "14",
                "Ymd": "20170514",
                "cur": 0
            },
            {
                "n": "5",
                "j": "15",
                "Ymd": "20170515",
                "cur": 0
            },
            {
                "n": "5",
                "j": "16",
                "Ymd": "20170516",
                "cur": 0
            },
            {
                "n": "5",
                "j": "17",
                "Ymd": "20170517",
                "cur": 0
            },
            {
                "n": "5",
                "j": "18",
                "Ymd": "20170518",
                "cur": 0
            },
            {
                "n": "5",
                "j": "19",
                "Ymd": "20170519",
                "cur": 0
            },
            {
                "n": "5",
                "j": "20",
                "Ymd": "20170520",
                "cur": 0
            },
            {
                "n": "5",
                "j": "21",
                "Ymd": "20170521",
                "cur": 0
            },
            {
                "n": "5",
                "j": "22",
                "Ymd": "20170522",
                "cur": 0
            },
            {
                "n": "5",
                "j": "23",
                "Ymd": "20170523",
                "cur": 0
            },
            {
                "n": "5",
                "j": "24",
                "Ymd": "20170524",
                "cur": 0
            },
            {
                "n": "5",
                "j": "25",
                "Ymd": "20170525",
                "cur": 0
            },
            {
                "n": "5",
                "j": "26",
                "Ymd": "20170526",
                "cur": 0
            },
            {
                "n": "5",
                "j": "27",
                "Ymd": "20170527",
                "cur": 0
            },
            {
                "n": "5",
                "j": "28",
                "Ymd": "20170528",
                "cur": 0
            },
            {
                "n": "5",
                "j": "29",
                "Ymd": "20170529",
                "cur": 0
            },
            {
                "n": "5",
                "j": "30",
                "Ymd": "20170530",
                "cur": 0
            },
            {
                "n": "5",
                "j": "31",
                "Ymd": "20170531",
                "cur": 0
            }
        ]
    }
});