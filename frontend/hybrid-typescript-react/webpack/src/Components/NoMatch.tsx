import * as React from 'react'
import * as styles from 'Styles/main.scss'

export class NoMatch extends React.Component {
    render() {
        return (
            <div className={styles.oneTest}>
                <h1>No Match for Route was Found.</h1>
            </div>
        )
    }
}