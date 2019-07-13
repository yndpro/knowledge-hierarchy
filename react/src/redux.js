import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [
            ]
        }
    }
    render() {
        return(
            <div>
                {this.state.list.length > 0 ?
                <ul>
                    {this.state.list.map((item,key) => {
                        <li key={key}>{item.title}</li>
                    })}
                </ul> : "empty"
                }
            </div>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById("root")
);