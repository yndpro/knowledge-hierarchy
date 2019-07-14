import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from 'components/AddTodo';
import TodoList from 'components/TodoList';
import FilterTodo from 'components/FilterTodo';

class ReactTodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todo : [],
            filter : "all"
        }
    }
    addTodo(newTodo){
        this.setState({
            todo : [...this.state.todo, newTodo]
        })
    }
    render() {
        return(
            <div>
                <AddTodo addTodo={this.addTodo}/>
                <TodoList list={this.todo}/>
                <FilterTodo/>
            </div>
        )
    }
}

ReactDOM.render(
    <ReactTodoList/>,
    document.getElementById("root")
);