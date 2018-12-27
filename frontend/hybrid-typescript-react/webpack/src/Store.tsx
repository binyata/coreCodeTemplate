// Initialize store and have logout functionality
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './RootReducer'

const loggerMiddleware = createLogger();
const middleware = process.env.NODE_ENV !== 'production'
  ? [ thunkMiddleware, loggerMiddleware ]
  : [ thunkMiddleware ];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const myStore = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default myStore
