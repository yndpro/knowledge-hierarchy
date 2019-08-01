import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_FILTER
} from './actions-type';

let id = 0;

export const addTodo = (text) => ({
    type : ADD_TODO,
    id : id++,
    text : text
});

export const toggleTodo = (id) => ({
    type : TOGGLE_TODO,
    id : id
});

export const setFilter = (filter) => ({
    type : SET_FILTER,
    filter : filter
});