export const getFilter = state => state.filter;

export const getVisibleTodos = state => {

    let {todos:{data},filter} = state;

    return data.filter(todo => {
        switch (filter) {
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
};


