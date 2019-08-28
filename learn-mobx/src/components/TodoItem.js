import React from 'react';
import {observer} from "mobx-react";

@observer
export default class TodoItem extends React.Component{
    render() {
        let style = this.props.completed ? {textDecoration:"line-through"} : {};
        return(
            <li style={style}
                onClick={() => this.props.onClick()}
            >
                {this.props.text}
            </li>
        )
    }
}