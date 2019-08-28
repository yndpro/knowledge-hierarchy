import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterTodo from './components/FilterTodo';
import { inject, observer,Provider } from 'mobx-react';
import stores from './stores';

@inject(stores => ({
    todos : stores.todo.todos,
    filter : stores.todo.filter
}))

@observer
class ReactTodoList extends React.Component{
    render() {
        return(
            <div>
                <AddTodo/>
                <TodoList
                    changeTodoCompleted={id=>this.changeTodoCompleted(id)}
                />
                <FilterTodo/>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider {...stores}>
        <ReactTodoList/>
    </Provider>,
    document.getElementById("root")
);