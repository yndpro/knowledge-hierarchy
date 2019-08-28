import React from 'react';
import {inject, observer} from "mobx-react";

@inject(stores => ({
    onChangeFilter : filter => stores.todo.changeFilter(filter)
}))

@observer
export default class FilterTodo extends React.Component{
    render() {
        return(
            <div>
                <button onClick={() => this.props.onChangeFilter("all")}>all</button>
                <button onClick={() => this.props.onChangeFilter("completed")}>completed</button>
                <button onClick={() => this.props.onChangeFilter("noCompleted")}>noCompleted</button>
            </div>
        )
    }
}