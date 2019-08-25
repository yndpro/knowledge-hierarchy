//中间件本质上是增强store上dispatch能力的函数
//每个中间件所要做的最后一个事情肯定是要去处理一个action，所以每个中间件最内层函数接受一个action
//({dispatch,getState}) => next => action  一个什么都不干的中间件


function createLoggerMiddleware(){
    return ({dispatch,getState}) => next => action => {    //返回的那个以 action 为参数的函数才是处理 action 对象的函数, （原生dispatch发送到reducer的操作是最后一个中间件）
        console.group(action.type);
        console.log("state:",getState());
        let result = next(action);           //next 是一个函数，调用了它，就代表着这个中间件完成了自己的职能，并将对 action 控制权交予下一个中间件 (最后一个就是到reducer)
        console.log("new state:",getState());
        console.groupEnd();
        return "7788";
    }
}

//（链式调用，从左到右地串型执行，原先dispatch的操作是在串行的末端）
//dispatch和next都能发送action，最外层dispatch是加强了所有中间件能力的new dispatch，用这个dispatch发送的action都会经历（从头到尾）每个中间件的处理；而通过next是直接到下一个中间件，不会从第一个中间件开始。

const logger = createLoggerMiddleware();

export default logger