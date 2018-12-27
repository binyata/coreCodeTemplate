import * as React from 'react'
import {
    Route,
    Redirect,
    BrowserRouter as Router,
    RouteProps,
    Switch
  } from 'react-router-dom';
import Login from "./Login/Login"
import { Home } from "./Home/Home"
import { NoMatch } from "./NoMatch"
import { connect } from 'react-redux'

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {
        let redirectPath: string = '';
        if (!this.props.isAuthenticated) {
            redirectPath = this.props.authenticationPath;
        }
        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{pathname: redirectPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}

interface appProps {
    isAuth: boolean
}

interface appState {
    defaultProtectedRouteProps: ProtectedRouteProps;
}

class App extends React.Component<appProps, appState> {
    constructor(props:any ) {
        super(props)
        this.state = {
            defaultProtectedRouteProps: {
                isAuthenticated: this.props.isAuth,
                authenticationPath: '/login'
            }
        }
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
     }
     componentDidMount() {
        console.log('Component DID MOUNT!')
     }
     componentWillReceiveProps(newProps: any) {    
        console.log('Component WILL RECIEVE PROPS!')
        console.log(newProps)
     }
     shouldComponentUpdate(newProps: any, newState: any) {
        return true;
     }
     componentWillUpdate(nextProps: any, nextState: any) {
        console.log('Component WILL UPDATE!');
        console.log(nextProps)
        console.log(nextState)

        if (this.props.isAuth !== nextProps.isAuth) {
            this.setState({ defaultProtectedRouteProps: 
                {
                    isAuthenticated: nextProps.isAuth,
                    authenticationPath: '/login'
                }
            })
        }
     }
     componentDidUpdate(prevProps: any, prevState: any) {
        console.log('Component DID UPDATE!')
        console.log(prevProps)
        console.log(prevState)
     }
     componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
     }
    render() {
        console.log(this.state.defaultProtectedRouteProps)
        return (
            <div>  
                <main>
                    <Router>
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <ProtectedRoute
                                {...this.state.defaultProtectedRouteProps}
                                exact={true}
                                path='/'
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
        isAuth: state.generalStorage.isAuth.authStatus
    }
}

export default connect(
    mapStateToProps
)(App)