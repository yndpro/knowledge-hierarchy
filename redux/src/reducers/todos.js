import {
    ADD_TODO,
    SET_FILTER,
    TOGGLE_TODO
} from '../actions/actions-type';

export default (todos = [],action) => {
    switch(action.type){
        case ADD_TODO :
            return [
                ...todos,
                {
                    id          : action.id,
                    text        : action.text,
                    completed   : false
                }
            ];

        case TOGGLE_TODO :
            return todos.map(todo => todo.id === action.id ?
                {...todo,completed : !todo.completed}
                :
                todo);

        case SET_FILTER :
            return todos.filter(todo => {
                switch (action.filter) {
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

        default :
            return todos;
    }
}