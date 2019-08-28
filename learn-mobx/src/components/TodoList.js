import React from 'react';
import TodoItem from './TodoItem';
import {inject, observer} from "mobx-react";

@inject(stores => ({
    getVisibleTodos : stores.todo.getVisibleTodos
}))

@observer
class TodoList extends React.Component{
    render() {
        let list = this.props.getVisibleTodos();
        return(
            <div>
                {list.length > 0 ?
                    <ul>
                        {list.map((item,key) =>
                            <TodoItem
                                key={key}
                                id={item.id}
                                text={item.text}
                                completed={item.completed}
                                onClick={() => {this.props.changeTodoCompleted(item.id)}}
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

export default TodoList