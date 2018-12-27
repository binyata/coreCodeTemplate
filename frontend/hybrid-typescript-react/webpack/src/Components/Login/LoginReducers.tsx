import { combineReducers } from 'redux';
import {
  SETUP_OCR_ADMIN,
  SETUP_OCR_ADMIN_CLIENT,
  SETUP_OCR_CLIENT,
  SETUP_OCR_USER,
  SETUP_OCR_JWTS,
  SETUP_OCR_TOKENS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SETUP_OCR_CATALOG_ATTRIBUTES_REQUEST,
  SETUP_OCR_CATALOG_ATTRIBUTES_SUCCESS,
  SETUP_OCR_CATALOG_ATTRIBUTES_FAILURE,
  SETUP_OCR_CLIENT_COLORS_REQUEST,
  SETUP_OCR_CLIENT_COLORS_SUCCESS,
  SETUP_OCR_CLIENT_COLORS_FAILURE,
  SETUP_OCR_PROMO_TYPES_REQUEST,
  SETUP_OCR_PROMO_TYPES_SUCCESS,
  SETUP_OCR_PROMO_TYPES_FAILURE,
  SETUP_OCR_SUBSCRIPTIONS_REQUEST,
  SETUP_OCR_SUBSCRIPTIONS_SUCCESS,
  SETUP_OCR_SUBSCRIPTIONS_FAILURE,
} from './LoginConstants'
// import isEmpty from 'lodash'
import {createRequestReducer} from 'CustomReducer'
import appReducer from 'store'

export const test = (state = {}, action: any) => {
  return {
    something: 1,
    something1: 2,
    something2: 3,
    something3: 4
  }
}

export const loginRequest = createRequestReducer({
  FETCH_REQUEST: LOGIN_REQUEST,
  FETCH_SUCCESS: LOGIN_SUCCESS,
  FETCH_FAILURE: LOGIN_FAILURE,
  initialState: []
});

export const isAuth = (state = { authStatus: false }, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { authStatus: true }
    case LOGIN_FAILURE:  
    default:
      return state;
  }
}

export const setupOcrCatalog = createRequestReducer({
  FETCH_REQUEST: SETUP_OCR_CATALOG_ATTRIBUTES_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_CATALOG_ATTRIBUTES_SUCCESS,
  FETCH_FAILURE: SETUP_OCR_CATALOG_ATTRIBUTES_FAILURE,
  initialState: []
});

export const setupOcrClientColors = createRequestReducer({
  FETCH_REQUEST: SETUP_OCR_CLIENT_COLORS_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_CLIENT_COLORS_SUCCESS,
  FETCH_FAILURE: SETUP_OCR_CLIENT_COLORS_FAILURE,
  initialState: []
});

export const setupOcrPromoTypes = createRequestReducer({
  FETCH_REQUEST: SETUP_OCR_PROMO_TYPES_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_PROMO_TYPES_SUCCESS,
  FETCH_FAILURE: SETUP_OCR_PROMO_TYPES_FAILURE,
  initialState: []
});

export const setupOcrSubscriptions = createRequestReducer({
  FETCH_REQUEST: SETUP_OCR_SUBSCRIPTIONS_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_SUBSCRIPTIONS_SUCCESS,
  FETCH_FAILURE: SETUP_OCR_SUBSCRIPTIONS_FAILURE,
  initialState: []
});

const generalStorage = combineReducers({
  setupOcrCatalog,
  setupOcrClientColors,
  setupOcrPromoTypes,
  setupOcrSubscriptions,
  test,
  loginRequest,
  isAuth
});

export default generalStorage;
