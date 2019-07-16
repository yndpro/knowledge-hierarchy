import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterTodo from './components/FilterTodo';

let id = 0;

class ReactTodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos   : [],
            filter  : "all"
        }
    }
    addTodo(text){
        let newTodo = {
            id          : id++,
            text        : text,
            completed   : false
        };
        this.setState({
            todos : [...this.state.todos, newTodo]
        })
    }
    changeFilter(filter){
        this.setState({
            filter : filter
        })
    }
    changeTodoCompleted(id){
        console.log(id);
        let todos = this.state.todos.map(todo => {
            console.log(todo);
            return todo.id === id ? todo : todo
        });
        this.setState({
            todos : todos
        })
    }
    getVisibleTodos(){
        return this.state.todos.filter(todo => {
            switch (this.state.filter) {
                case 'completed' :
                    return todo.completed === true;
                case 'noCompleted' :
                    return todo.completed === false;
                case 'all' :
                    return true;
                default :
                    return false;
            }
        });
    }
    render() {
        return(
            <div>
                <AddTodo addTodo={text=>this.addTodo(text)}/>
                <TodoList
                    list={this.getVisibleTodos()}
                    changeTodoCompleted={id=>this.changeTodoCompleted(id)}
                />
                <FilterTodo onChangeFilter={filter=>this.changeFilter(filter)}/>
            </div>
        )
    }
}

ReactDOM.render(
    <ReactTodoList/>,
    document.getElementById("root")
);