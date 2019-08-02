import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import reducer from "./reducers";
import {Provider} from 'react-redux';
import AddTodo from './container/AddTodo';
import TodoItems from './container/TodoItems';
import FilterTodo from './container/FilterTodo';

const store = createStore(reducer);

class ReactTodoList extends React.Component{
    render() {
        return(
            <div>
                <AddTodo/>
                <TodoItems/>
                <FilterTodo/>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ReactTodoList/>
    </Provider>,
    document.getElementById("root")
);