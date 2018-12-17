import { combineReducers } from 'redux';
import { USER_LOGOUT } from 'Components/Login/LoginConstants'
import generalStorage from 'Components/Login/LoginReducers'
// add more reducers later
export const appReducer = combineReducers({
  generalStorage
})

// to support logging out that clears redux overall state:
export const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action)
}
