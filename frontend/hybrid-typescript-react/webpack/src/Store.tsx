// Initialize store and have logout functionality
import { applyMiddleware, compose, createStore, Store } from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from "redux-thunk";
import rootReducer from "./RootReducer";

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)
const loggerMiddleware = createLogger();
const middleware = process.env.NODE_ENV !== "production"
? [ thunk, loggerMiddleware ]
: [ thunk ];
const initialState = {};
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const myStore = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

// let persistor = persistStore(store)

if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
        module.hot.accept("./RootReducer", () => {
            const newRootReducer = require("./RootReducer").default;
            myStore.replaceReducer(newRootReducer);
        });
    }
}
