import * as React from 'react'
import logo from 'Images/logo.jpg'
import * as styles from 'Styles/main.scss'
import { loginCall, generalStoreTask } from './LoginActions'
import { connect } from 'react-redux';

interface loginProps {
    testPropToDeleteLater: any,
    login: any
}

interface loginState {
    username: string, 
    password: string, 
    buttonIsDisabled: boolean, 
}

class Login extends React.Component<loginProps, loginState> {

    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            password: '',
            buttonIsDisabled: true,
        }
        this.onChangeUsernameInput = this.onChangeUsernameInput.bind(this)
        this.onChangePasswordInput = this.onChangePasswordInput.bind(this)
        this.loginClick = this.loginClick.bind(this)
    }

    private onChangeUsernameInput(e: { target: HTMLInputElement; }): void {
        this.setState({ username: e.target.value, buttonIsDisabled: false })
    }
    private onChangePasswordInput(e: { target: HTMLInputElement; }): void {
        this.setState({ password: e.target.value, buttonIsDisabled: false })
    }
    private loginClick(e: any): void {
        console.log("logging in...")
        // let submittedUserName: string = this.state.username
        // let submittedPassword: string = this.state.password
        let submission: any = {username:"thomaslee", password:"1Starcraftnerd!"}
        //this.props.login({username:this.state.username, password:this.state.password})
        this.props.login(submission)
        this.setState({
            username: '',
            password: '',
            buttonIsDisabled: true,
        })
    }
 
    render() {
        const { username, password, buttonIsDisabled } = this.state
        const { testPropToDeleteLater, login } = this.props
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
        )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
      testPropToDeleteLater: state.generalStorage.test,
    }
}
  
function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        login: (auth: {username: string, password:string}) => {
            dispatch(loginCall(auth.username, auth.password)).then((response: any) => {
                console.log("GREETINGS!")
            })
        }
    }
}

// First have you component name not being with Uppercase 
// letter and second remove the export default from the component,
// otherwise when you will be importing it as default you wouldn't
// be using the component that you have connected the store with
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)