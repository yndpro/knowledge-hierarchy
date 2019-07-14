import React from 'react';

export default class FilterTodo extends React.Component{
    handleAddTodo(){
        this.props.addTodo({
            id : id++,
            text : this.state.text,
            completed : false
        })
    }
    render() {
        return(
            <div>
                <button onClick={this.handleAddTodo}>AddTodo</button>
            </div>
        )
    }
}