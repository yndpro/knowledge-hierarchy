import React from 'react';
import TodoItem from 'TodoItem';

export default class TodoList extends React.Component{
    render() {
        return(
            <div>
                {this.props.list.length > 0 ?
                    <ul>
                        {this.props.list.map((item,key) =>
                            <TodoItem
                                key={key}
                                id={item.id}
                                text={item.text}
                                completed={item.completed}
                                changeTodoCompleted={this.props.changeTodoCompleted}
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