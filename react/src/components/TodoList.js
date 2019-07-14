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
                                name={item.name}
                                completed={item.completed}
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