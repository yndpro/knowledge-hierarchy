import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions';

const mapDispatchToProps = dispatch => ({
    addTodo : text => dispatch(addTodo(text)),
});

class AddTodo extends React.Component{
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

export default connect(
    null,
    mapDispatchToProps
)(AddTodo)