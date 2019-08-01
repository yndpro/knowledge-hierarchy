import {createStore} from "redux";
import reducer from "./reducers/index";
import {
    addTodo,
    toggleTodo,
    setFilter
} from './actions';


const store = createStore(reducer);

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});

store.dispatch(addTodo("new111"));
store.dispatch(addTodo("new222"));
store.dispatch(toggleTodo(1));
store.dispatch(setFilter("completed"));
store.dispatch(toggleTodo(1));
store.dispatch(setFilter("noCompleted"));