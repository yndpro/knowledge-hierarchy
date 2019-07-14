import React from 'react';

let id = 0;

export default class AddTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text : ""
        }
    }
    onValueChange(e){
        this.setState({
            text : e.target.value
        })
    }
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
                <input type="text" onChange={e => this.onValueChange(e)}/>
                <button onClick={this.handleAddTodo}>AddTodo</button>
            </div>

        )
    }
}