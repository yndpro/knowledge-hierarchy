import React from 'react';
import {connect} from 'react-redux';
import {toggleTodo,fetchTodos} from '../actions';
import TodoItem from '../components/TodoItem';
import {getFilter,getVisibleTodos} from '../selector/main';

const mapStateToProps = state => ({
    todos   : getVisibleTodos(state),
    filter  : getFilter(state)
});

const mapDispatchToProps = dispatch => ({
    toggleTodo : id => dispatch(toggleTodo(id)),
    fetchTodos  : () => {
        let res = dispatch(fetchTodos());
        console.log("dispatch fetchtodo return",res);
    },
});

class TodoItems extends React.Component{
    componentDidMount() {
        this.props.fetchTodos();
    }
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

