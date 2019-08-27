import React from 'react';

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