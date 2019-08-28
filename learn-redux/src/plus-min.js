import {createStore,combinedreducer} from './adrian-redux.js';

function reducer(state = {num : 0},action) {
    if(!action) return state;
    switch (action.type) {
        case "PLUS" :
            return {
                num : state.num + 1
            };
        case "MIN" :
            return {
                num : state.num - 1
            };
        default :
            return {
                num : state.num
            };
    }
}

const store = createStore(reducer);

document.getElementById("root").innerHTML =`
            <div id="num"></div>
            <button id="plus">plus</button>
            <button id="min">min</button>`;

store.subscribe(function () {
    document.getElementById("num").innerHTML = store.getState().num;
});

document.getElementById("plus").addEventListener('click',function () {
    store.dispatch({type:"PLUS"})
});
document.getElementById("min").addEventListener('click',function () {
    store.dispatch({type:"MIN"})
});