import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterTodo from './components/FilterTodo';
import { inject, observer,Provider } from 'mobx-react';
import stores from './stores';

@inject(stores => ({
    fetchTodo : stores.todo.fetchTodo
}))

@observer
class ReactTodoList extends React.Component{
    componentDidMount() {
        this.props.fetchTodo();
    }
    render() {
        return(
            <div>
                <AddTodo/>
                <TodoList/>
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