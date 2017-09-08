import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import routes from './routes';

class Root extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <Link to="/">
                        <img
                            src="https://cdn.ifelse.io/images/logos/react-logo.svg"
                            className="App-logo"
                            alt="logo"
                        />
                    </Link>
                    <h2>
                        Server-side rendering with React Router v4 and React 16
                        (Fiber)
                    </h2>
                </div>
                <ul
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Link to="/">home</Link>
                    <Link to="/static">static page</Link>
                    <Link to="/dynamic">dynamic page</Link>
                </ul>
                <hr />
                <Switch>
                    {routes.map(route => (
                        <Route
                            path={route.path}
                            key={route.path}
                            exact={route.exact}
                            render={props =>
                                React.createElement(
                                    route.component,
                                    Object.assign({}, props, {
                                        data: this.props
                                    })
                                )}
                        />
                    ))}
                </Switch>
            </div>
        );
    }
}

export default Root;
