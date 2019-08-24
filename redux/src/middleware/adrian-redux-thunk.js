function createThunkMiddleware(){
    return ({dispatch,getState}) => next => action => {
        if(typeof action === "function"){
            return action(dispatch,getState)    //action 为异步方法
        }
        return next(action);
    }
}


// 需要注意的是，每个中间件最里层处理 action 参数的函数返回值都会影响 Store 上的 dispatch 函数的返回值（执行调用是从左到右 嵌套调用执行;返回是从右到左返回，最左返回值二分影响最大，套娃最大），但每个中间件中这个函数返回值可能都不一样。
// 就比如上面这个中间件，返回的可能是一个 action 函数，也有可能返回的是下一个中间件返回的结果。
// 因此，dispatch 函数调用的返回结果通常是不可控的，我们最好不要依赖于 dispatch 函数的返回值。


const thunk = createThunkMiddleware();

export default thunk