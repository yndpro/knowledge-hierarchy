
function createLoggerMiddleware(){
    return ({dispatch,getState}) => next => action => {    //返回的那个以 action 为参数的函数才是处理 action 对象的函数, （原生dispatch是最后一个中间件）
        console.log("action type:",action.type);
        console.log("state:",getState());
        next(action);           //next 是一个函数，调用了它，就代表着这个中间件完成了自己的职能，并将对 action 控制权交予下一个中间件
        console.log("state:",getState());
    }
}

const logger = createLoggerMiddleware();

export default logger