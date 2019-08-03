const Mock = require('mockjs');

Mock.mock(/\/data\/getTodo/,{
    "status" : "1",
    "data" : [
        {
            "id" : "3424",
            "text" : "fdgdsdg",
            "completed" : false
        }
    ]
});
