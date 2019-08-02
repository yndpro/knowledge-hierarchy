import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../actions';


const mapStateToProps = state => ({
    filter : state.filter
});

const mapDispatchToProps = dispatch => ({
    setFilter : filter => dispatch(setFilter(filter)),
});

class FilterTodo extends React.Component{
    render() {
        return(
            <div>
                <button onClick={() => this.props.setFilter("all")}>all</button>
                <button onClick={() => this.props.setFilter("completed")}>completed</button>
                <button onClick={() => this.props.setFilter("noCompleted")}>noCompleted</button>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterTodo)