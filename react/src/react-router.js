import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';


/*Basic Routing*/
/*function Index() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}


ReactDOM.render(
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/Users">Users</Link></li>
            </ul>
            <Route path="/" exact component={Index}/>
            <Route path="/About" component={About}/>
            <Route path="/Users" component={Users}/>
        </div>
    </Router>,
    document.getElementById("root")
);*/






/*Nested Routing*/

function Index() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Topic({match}) {
    return <h2>{`request is ${match.params.id}`}</h2>;                {/*响应体*/}
}

function Topics({match}) {
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li><Link to={`${match.path}/1`}>Topic1</Link></li>
                <li><Link to={`${match.path}/2`}>Topic2</Link></li>  {/*router包裹请求体*/}
            </ul>
            <Route path={match.path} exact render={() => <div>please select a topic</div>}/>   {/*router包裹响应体*/}
            <Route path={`${match.path}/:id`} component={Topic}/>
        </div>
    );
}

ReactDOM.render(
    <Router>
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/Topics">Topics</Link></li>
                </ul>
            </nav>
            <Route path="/" exact component={Index}/>
            <Route path="/About" component={About}/>
            <Route path="/Topics" component={Topics}/>
        </div>
    </Router>,
    document.getElementById("root")
);