import logo from "Images/logo.jpg";
import * as React from "react";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";
import * as styles from "Styles/main.scss";
import { generalStoreTask, loginCall } from "./LoginActions";

interface LoginProps {
    isAuth: boolean;
    location: any;
    login: any;
    testPropToDeleteLater: any;
}

interface LoginState {
    buttonIsDisabled: boolean;
    password: string;
    username: string;
}

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            buttonIsDisabled: true,
            password: "",
            username: "",
        };
        this.onChangeUsernameInput = this.onChangeUsernameInput.bind(this);
        this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
        this.loginClick = this.loginClick.bind(this);
    }

    public render() {
        const { buttonIsDisabled, password, username } = this.state;
        const { isAuth } = this.props;
        if (isAuth) {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            return <Redirect to={from}/>;
        }
        return (
            <div className={styles.loginFormBackground}>
                <div className={styles.formLayout}>
                    <input
                        type="field"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={this.onChangeUsernameInput}
                        autoComplete="current-user"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={this.onChangePasswordInput}
                        autoComplete="current-password"
                    />
                    <button disabled={buttonIsDisabled} onClick={this.loginClick}>Login</button>
                </div>
                <div className={styles.logoLayout}>
                    Powered by Edge Ascential 2019 &nbsp;&nbsp;
                    <img src={logo} width="90" height="90" />
                </div>
            </div>
        );
    }

    private onChangeUsernameInput(e: { target: HTMLInputElement; }): void {
        this.setState({ username: e.target.value, buttonIsDisabled: false });
    }
    private onChangePasswordInput(e: { target: HTMLInputElement; }): void {
        this.setState({ password: e.target.value, buttonIsDisabled: false });
    }
    private loginClick(e: any): void {
        // let submittedUserName: string = this.state.username
        // let submittedPassword: string = this.state.password
        let submission: any = { password: "1Starcraftnerd!", username: "thomaslee" };
        // this.props.login({username:this.state.username, password:this.state.password})
        this.props.login(submission);
        this.setState({
            buttonIsDisabled: true,
            password: "",
            username: "",
        });
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
      isAuth: state.generalStorage.isAuth.authStatus,
      testPropToDeleteLater: state.generalStorage.test,
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        login: (auth: {username: string, password: string}) => {
            dispatch(loginCall(auth.username, auth.password)).then((response: any) => {
                return response;
            });
        },
    };
}

// First have you component name not being with Uppercase
// letter and second remove the export default from the component,
// otherwise when you will be importing it as default you wouldn't
// be using the component that you have connected the store with
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
