import React from 'react';

export default class TodoItem extends React.Component{
    render() {
        let className = this.props.completed ? {"text-decoration":"line-through"} : "";
        return(
            <li className={className}
                onClick={() => this.props.changeTodoCompleted(this.props.id)}
            >
                {this.props.text}
            </li>
        )
    }
}