import React from 'react';
import {inject, observer} from "mobx-react";

@inject(stores => ({
    addTodo : text => stores.todo.addTodo(text)
}))

@observer
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
        if(this.state.text){
            this.props.addTodo(this.state.text)
        }
    }
    render() {
        return(
            <div>
                <input type="text" onChange={e => this.onValueChange(e)}/>
                <button onClick={() => this.handleAddTodo()}>AddTodo</button>
            </div>

        )
    }
}
