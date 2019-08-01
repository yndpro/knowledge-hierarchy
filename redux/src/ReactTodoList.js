import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './container/AddTodo';
import TodoItems from './container/TodoItems';
import FilterTodo from './container/FilterTodo';

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
    <ReactTodoList/>,
    document.getElementById("root")
);