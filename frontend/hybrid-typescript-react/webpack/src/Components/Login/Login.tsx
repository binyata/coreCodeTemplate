import * as React from 'react'
import logo from 'Images/logo.jpg'
import * as styles from 'Styles/main.scss'
import { Link, Redirect } from 'react-router-dom'
import { loginAction, generalStoreTask } from './LoginActions'

export class Login extends React.Component<{}, { username: string, password: string, buttonIsDisabled: string, loggedIn: boolean }> {

    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            password: '',
            buttonIsDisabled: "disabled",
            loggedIn: false
        }
        this.onChangeUsernameInput = this.onChangeUsernameInput.bind(this)
        this.onChangePasswordInput = this.onChangePasswordInput.bind(this)
        this.loginClick = this.loginClick.bind(this)
    }

    private onChangeUsernameInput(e: { target: HTMLInputElement; }): void {
        this.setState({ username: e.target.value })
    }
    private onChangePasswordInput(e: { target: HTMLInputElement; }): void {
        this.setState({ password: e.target.value })
    }
    private loginClick(e: any): void {
        console.log("logging in...")
        console.log(this.state)
        //this.setState({ loggedIn: true })
        // Look for best practices on clearing form on submit.
        // let submittedUserName: string = this.state.username
        // let submittedPassword: string = this.state.password
        let submittedUserName: string = 'thomaslee'
        let submittedPassword: string = '1Starcraftnerd!'
        this.setState({
            username: '',
            password: '',
            buttonIsDisabled: "",
        })
        // better to run the logical operations on the API side
        loginAction(submittedUserName, submittedPassword).then(res => {
            console.log('successful')
            this.setState({
                buttonIsDisabled: "disabled",
                loggedIn: true,
            })
            generalStoreTask(res)
        }).catch(error => {
            console.log('failed')
            // more error logic...
            console.log(error)
            this.setState({
                buttonIsDisabled: "disabled",
            })
        })
    }
 
    render() {
        const { username, password, buttonIsDisabled } = this.state
        if (this.state.loggedIn) {
            console.log("you have successfully logged in!")
            return <Redirect to='/test' />
        }
        return (
            <div className={styles.oneTest}>
                <img src={logo} />
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
                <button 
                    disabled={!buttonIsDisabled}
                    onClick={this.loginClick}>Login
                </button>
            </div>
        )
    }
}