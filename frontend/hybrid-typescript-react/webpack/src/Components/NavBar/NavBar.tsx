import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "Styles/navBar.scss";
import { logOutAction } from "Components/Login/LoginActions"
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";

interface NavBarProps {
    logout: any;
    history: { push: any; }
}

class NavBar extends React.Component<NavBarProps, {}>  {
    constructor(props: any) {
        super(props)
        this.logOutCall = this.logOutCall.bind(this)
    }

    public render() {
        console.log(this.props)
        return (
            <div className={styles.overAllLayout}>
                <ul className={styles.navStructure}>
                    <li><button onClick={this.logOutCall}>logout</button></li>
                    <li><button>Link2</button></li>
                    <li><button>Link1</button></li>
                    <li><button>Link1</button></li>
                </ul>
            </div>
        );
    }

    private logOutCall(e: any): void {
        console.log("log out call")
        // console.log(this.props)
        // logOutAction()
    }
}

// function mapDispatchToProps(dispatch: any, ownProps: any) {
//     return {
//         logout: (auth: {username: string, password: string}) => {
//             dispatch(loginCall(auth.username, auth.password)).then((response: any) => {
                
//             });
//         },
//     };
// }

export default withRouter(NavBar)
