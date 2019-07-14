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
    onChangeFilter(filter){
        this.setState({
            filter : filter
        })
    }
    changeTodoCompleted(id){
        let todo = this.state.todo.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        this.setState({
            todo : this.state.todo
        })
    }
    setVisibleTodos(){
        let todos;
        switch (this.state.filter) {
            case 'completed' :
                todos = this.state.todo.filter(todo => todo.completed === true);
                break;
            case 'noCompleted' :
                todos = this.state.todo.filter(todo => todo.completed === false);
                break;
            case 'all' :
                todos = this.state.todo;
                break;
            default :
                todos = this.state.todo;
        }
        return todos;
    }
    render() {
        let visibleTodos = this.setVisibleTodos();
        return(
            <div>
                <AddTodo addTodo={this.addTodo}/>
                <TodoList list={visibleTodos} changeTodoCompleted={changeTodoCompleted}/>
                <FilterTodo onChangeFilter={this.onChangeFilter}/>
            </div>
        )
    }
}

ReactDOM.render(
    <ReactTodoList/>,
    document.getElementById("root")
);