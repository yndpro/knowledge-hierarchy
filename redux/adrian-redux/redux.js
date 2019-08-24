function createStore(reducer) {

    let state;
    let funs = [];

    const getState = () => state;

    const subscribe = fun => {
        funs.push(fun);
    };
    const dispatch = action => {
        state = reducer(state,action);
        funs.forEach(fun => fun())
    };

    return {
        getState,
        subscribe,
        dispatch
    }
}

function combinedreducer() {

}

export {createStore,combinedreducer}