import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_FILTER,
    FETCH_TODO_REQUEST,
    FETCH_TODO_SUCCESS,
    FETCH_TODO_FAILURE
} from './actions-type';

let id = 0;

const fetchTodoRequest = () => ({
    type : FETCH_TODO_REQUEST,
});

const fetchTodoSuccess = result => ({
    type : FETCH_TODO_SUCCESS,
    result : result
});

const fetchTodoFailure = error => ({
    type : FETCH_TODO_FAILURE,
    error : error
});

export const fetchTodos = () => {
    return dispatch => {
        dispatch(fetchTodoRequest());
        setTimeout(function () {
            const result = {
                    "status" : "1",
                    "data" : [
                    {
                        "id" : "3424",
                        "text" : "learn redux1",
                        "completed" : false
                    }
                ]
            };
            dispatch(fetchTodoSuccess(result));
        },1000)
        /*return fetch('/ajaxGetRoleInfo').then(result => {
            console.log("result",result);
            dispatch(fetchTodoSuccess(result));
        },error => {
            dispatch(fetchTodoFailure(error));
        })*/
    };
};

export const addTodo = text => ({
    type : ADD_TODO,
    id : id++,
    text : text
});

export const toggleTodo = id => ({
    type : TOGGLE_TODO,
    id : id
});

export const setFilter = filter => ({
    type : SET_FILTER,
    filter : filter
});