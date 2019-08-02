import React from 'react';
import {connect} from 'react-redux';
import {toggleTodo} from '../actions';
import TodoItem from '../components/TodoItem';

const getVisibleTodos = (todos,filter) => {
    return todos.filter(todo => {
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

const mapStateToProps = state => ({
    todos   : getVisibleTodos(state.todos,state.filter),
    filter  : state.filter
});

const mapDispatchToProps = dispatch => ({
    toggleTodo : id => dispatch(toggleTodo(id)),
});

class TodoItems extends React.Component{
    render() {
        return(
            <div>
                {this.props.todos.length > 0 ?
                    <ul>
                        {this.props.todos.map((item,key) =>
                            <TodoItem
                                key={key}
                                id={item.id}
                                text={item.text}
                                completed={item.completed}
                                onClick={() => {this.props.toggleTodo(item.id)}}
                            />
                        )}
                    </ul>
                    :
                    "empty"
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoItems)

