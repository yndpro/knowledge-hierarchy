import React from 'react';
import ReactDOM from 'react-dom';
import './test/api';
import {createStore,applyMiddleware,compose} from "redux";
import reducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "./middleware/adrian-logger";
import {Provider} from 'react-redux';
import AddTodo from './container/AddTodo';
import TodoItems from './container/TodoItems';
import FilterTodo from './container/FilterTodo';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(
        loggerMiddleware,
        thunkMiddleware
    )
));

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