import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./Components/App";
import { myStore } from "./store";

// Save a reference to the root element for reuse
const rootEl = document.getElementById("app");
// Create a reusable render method that we can call more than once
let render = () => {
    // Dynamically import our main App component, and render it
    const App = require("Components/App").default;

    // <PersistGate loading={null} persistor={store.persistor}>
    //             <App />
    //         </PersistGate>

    ReactDOM.render(
        <Provider store={myStore}>
            <App />
        </Provider>,
        rootEl,
    );
};

// For dev environment
if (module.hot) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = render;
    const renderError = (error: any) => {
        const RedBox = require("redbox-react").default;
        ReactDOM.render(
            <RedBox error={error} />,
            rootEl,
        );
    };

    // In development, we wrap the rendering function to catch errors,
    // and if something breaks, log the error and render it to the screen
    render = () => {
        try {
            renderApp();
        } catch (error) {
            console.error(error);
            renderError(error);
        }
    };

    // Whenever the App component file or one of its dependencies
    // is changed, re-import the updated component and re-render it
    module.hot.accept("Components/App", () => {
        setTimeout(render);
    });
}

// for initial run of prod and dev
render();

/*
    Need the following:
    1. Redux support [in progress]
    2. Route support [in progress]
    3. Axios/Backend Connection support [in progress]
    4. Environmental variable support [in progress]
    5. Unit testing/integration testing support [in progress]
    6. Language support [not started]
    7. Analytics support for google or other viewer analytic tooling [not started]
    8  Linting (tslint) [completed]
    9. TLA+ ? [not started]
*/
