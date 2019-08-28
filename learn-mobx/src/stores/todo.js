import {observable,action,computed} from "mobx";

let id = 0;

class Todo {
    id = id++;
    @observable text        = text;
    @observable completed   = false;
}

class TodoModel {
    @observable todos = [];
    @observable filter = "all";

    @action.bound
    addTodo(text){
        let newTodo = new Todo();
        newTodo.text = text;
        this.todos.push(newTodo);
    }

    @computed
    get visibleTodos(){
        return this.todos.filter(todo => {
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

    @action.bound
    changeFilter(filter){
        this.filter = filter;
    }

    @action.bound
    changeTodoCompleted(id){
        this.todos = this.todos.map(todo => {
            return todo.id === id ?
                {...todo,completed : !todo.completed}
                :
                todo
        });
    }


}

const todo = new TodoModel();
export default todo;