import {
    ADD_TODO,
    TOGGLE_TODO,
    FETCH_TODO_REQUEST,
    FETCH_TODO_SUCCESS,
    FETCH_TODO_FAILURE
} from '../actions/actions-type';

const initalState = {
    isFetching : false,
    data : []
};

const reducer = (state = initalState,action) => {
    switch(action.type){
        case FETCH_TODO_REQUEST :
            return {
                ...state,
                isFetching : true
            };
        case FETCH_TODO_FAILURE :
            return {
                ...state,
                isFetching : false
            };

        case FETCH_TODO_SUCCESS :
            return {
                data : action.result.data,
                isFetching : false
            };
        default :
            return {
                ...state,
                data : reducerData(state.data,action)
            };
    }
};

const reducerData = (state,action) => {
    switch(action.type){
        case ADD_TODO :
            return [
                ...state,
                {
                    id          : action.id,
                    text        : action.text,
                    completed   : false
                }
            ];
        case TOGGLE_TODO :
            return state.map(todo => todo.id === action.id ?
                {...todo,completed : !todo.completed}
                :
                todo);
        default :
            return state;
    }
};


export default reducer;