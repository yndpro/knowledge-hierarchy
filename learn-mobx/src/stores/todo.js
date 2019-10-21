import {observable, action, computed, runInAction} from "mobx";

const getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve({
                code : 100,
                data : [
                    {
                        "id" : "3424",
                        "text" : "1111111111",
                        "completed" : false
                    },
                    {
                        "id" : "4344",
                        "text" : "222222",
                        "completed" : false
                    },
                    {
                        "id" : "434433",
                        "text" : "3333333",
                        "completed" : false
                    }
                ]
            })
        },3000)
    });
};

let id = 0;

class Todo {
    id = id++;
    @observable text        = "";
    @observable completed   = false;
}

class TodoModel {
    @observable todos = [];
    @observable filter = "all";
    @observable state = "done";

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
    async fetchTodo(){
        this.state = "pending";
        try{
            const res = await getData();
            runInAction(() => {
                this.state = "done";
                this.todos = res.data;
            })
        }catch (e) {
            runInAction(() => {
                this.state = "error";
            })
        }
    }

    @action.bound
    addTodo(text){
        let newTodo = new Todo();
        newTodo.text = text;
        this.todos.push(newTodo);
        console.log(this);
    }

    @action.bound
    changeFilter(filter){
        console.log('1', this);
        this.filter = filter;
        console.log('2', this);
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