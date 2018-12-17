import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Login } from "./Login/Login"
import { Links } from "./Links"
import { NoMatch } from "./NoMatch"

export class App extends React.Component {
    // Login/Home page routing
    render() {
        return (
            <div>
                <main>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/test" component={Links} />
                            <Route component={NoMatch} />
                        </Switch>
                    </Router>
                </main>
            </div>
        )
    }
}