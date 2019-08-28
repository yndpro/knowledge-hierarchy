import {observable,action,computed} from "mobx";

let id = 0;

class Todo {
    @observable todos = [];
    @observable filter = "all";

    @action
    addTodo(text){
        let newTodo = {
            id          : id++,
            text        : text,
            completed   : false
        };
        this.todos.push(newTodo);
    }

    @action
    getVisibleTodos(){
        console.log("2:",this);
        this.todos.filter(todo => {
            switch (this.filter) {
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

    @action
    changeTodoCompleted(id){
        this.todos = this.todos.map(todo => {
            return todo.id === id ? {...todo,completed : !todo.completed} : todo
        });
    }


}

const todo = new Todo();
export default todo;