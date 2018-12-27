import * as React from 'react'
import * as styles from 'Styles/navBar.scss'
import { logOutAction } from 'Components/Login/LoginActions';

export class NavBar extends React.Component  {
    private logOutButton(): void {
        console.log("logging out...")
        logOutAction()
    }
    render() {
        return (
            <div className={styles.overAllLayout}>
                <ul className={styles.navStructure}>
                    <li><button>Link1</button></li>
                    <li><button>Link1</button></li>
                    <li><button>Link1</button></li>
                    <li><button>Link1</button></li>
                </ul>
                <button onClick={this.logOutButton}>Logout</button>
            </div>
        )
    }
}