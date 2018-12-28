import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    RouteProps,
    Switch,
  } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import { NoMatch } from "./NoMatch";
import ProtectedRoute from "./ProtectedRoute";

export interface ProtectedRouteProps extends RouteProps {
    authenticationPath: string;
    isAuthenticated: boolean;
}

interface AppProps {
    isAuth: boolean;
}

interface AppState {
    defaultProtectedRouteProps: ProtectedRouteProps;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: any ) {
        super(props);
        this.state = {
            defaultProtectedRouteProps: {
                authenticationPath: "/login",
                isAuthenticated: this.props.isAuth,
            },
        };
    }
    public componentWillMount() { return true; }
    public componentDidMount() { return true; }
    public componentWillReceiveProps(newProps: any) { return true; }
    public shouldComponentUpdate(newProps: any, newState: any) { return true; }
    public componentDidUpdate(prevProps: any, prevState: any) { return true; }
    public componentWillUnmount() { return true; }
    public componentWillUpdate(nextProps: any, nextState: any) {
        if (this.props.isAuth !== nextProps.isAuth) {
            this.setState({
                defaultProtectedRouteProps:
                {
                    authenticationPath: "/login",
                    isAuthenticated: nextProps.isAuth,
                },
            });
        }
    }
    public render() {
        console.log(this.props)
        return (
            <div>  
                <main>
                    <Router>
                        <Switch>
                            <Route exact path="/public" component={Home} />
                            <Route exact path="/login" component={Login}/>
                            <ProtectedRoute
                                {...this.state.defaultProtectedRouteProps}
                                exact={true}
                                path="/"
                                component={Home}
                            />
                            <Route component={NoMatch} />
                        </Switch>
                    </Router>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        isAuth: state.generalStorage.isAuth.authStatus,
    };
}

export default connect(
    mapStateToProps,
)(App);
