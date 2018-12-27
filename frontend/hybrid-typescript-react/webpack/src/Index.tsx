import * as React from "react";
import * as ReactDOM from "react-dom"
import App from './Components/App'
import { Provider } from 'react-redux'
import myStore from './store'

ReactDOM.render(
    (
        <Provider store={myStore}>
            <App />
        </Provider>
    ),
    document.getElementById("app")
);

/*
    Need the following:
    1. Redux support
    2. Route support
    3. Axios/Backend Connection support
    4. Environmental variable support
    5. Unit testing/integration testing support
    6. Language support
    7. Analytics support for google or other viewer analytic tooling
    8  Linting (tslint)
    9. TLA+ ?
*/