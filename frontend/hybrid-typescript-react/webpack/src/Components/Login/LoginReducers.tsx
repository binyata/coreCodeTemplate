import {createRequestReducer} from "CustomReducer";
import { combineReducers } from "redux";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SETUP_OCR_ADMIN,
  SETUP_OCR_ADMIN_CLIENT,
  SETUP_OCR_CATALOG_ATTRIBUTES_FAILURE,
  SETUP_OCR_CATALOG_ATTRIBUTES_REQUEST,
  SETUP_OCR_CATALOG_ATTRIBUTES_SUCCESS,
  SETUP_OCR_CLIENT,
  SETUP_OCR_CLIENT_COLORS_FAILURE,
  SETUP_OCR_CLIENT_COLORS_REQUEST,
  SETUP_OCR_CLIENT_COLORS_SUCCESS,
  SETUP_OCR_JWTS,
  SETUP_OCR_PROMO_TYPES_FAILURE,
  SETUP_OCR_PROMO_TYPES_REQUEST,
  SETUP_OCR_PROMO_TYPES_SUCCESS,
  SETUP_OCR_SUBSCRIPTIONS_FAILURE,
  SETUP_OCR_SUBSCRIPTIONS_REQUEST,
  SETUP_OCR_SUBSCRIPTIONS_SUCCESS,
  SETUP_OCR_TOKENS,
  SETUP_OCR_USER,
} from "./LoginConstants";

export const test = (state = {}, action: any) => {
  return {
    something: 1,
    something1: 2,
    something2: 3,
    something3: 4,
  };
};

export const loginRequest = createRequestReducer({
  FETCH_FAILURE: LOGIN_FAILURE,
  FETCH_REQUEST: LOGIN_REQUEST,
  FETCH_SUCCESS: LOGIN_SUCCESS,
  initialState: [],
});

function getIsAuthCheck() {
  if (localStorage.getItem("authStatus") === null) {
    return { authStatus: false };
  } else {
    return { authStatus: true };
  }
}

export const isAuth = (state = getIsAuthCheck(), action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      window.localStorage.setItem("authStatus", JSON.stringify({ authStatus: true }));
      return { authStatus: true };
    case LOGIN_FAILURE:
    default:
      return state;
  }
};

export const setupOcrCatalog = createRequestReducer({
  FETCH_FAILURE: SETUP_OCR_CATALOG_ATTRIBUTES_FAILURE,
  FETCH_REQUEST: SETUP_OCR_CATALOG_ATTRIBUTES_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_CATALOG_ATTRIBUTES_SUCCESS,
  initialState: [],
});

export const setupOcrClientColors = createRequestReducer({
  FETCH_FAILURE: SETUP_OCR_CLIENT_COLORS_FAILURE,
  FETCH_REQUEST: SETUP_OCR_CLIENT_COLORS_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_CLIENT_COLORS_SUCCESS,
  initialState: [],
});

export const setupOcrPromoTypes = createRequestReducer({
  FETCH_FAILURE: SETUP_OCR_PROMO_TYPES_FAILURE,
  FETCH_REQUEST: SETUP_OCR_PROMO_TYPES_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_PROMO_TYPES_SUCCESS,
  initialState: [],
});

export const setupOcrSubscriptions = createRequestReducer({
  FETCH_FAILURE: SETUP_OCR_SUBSCRIPTIONS_FAILURE,
  FETCH_REQUEST: SETUP_OCR_SUBSCRIPTIONS_REQUEST,
  FETCH_SUCCESS: SETUP_OCR_SUBSCRIPTIONS_SUCCESS,
  initialState: [],
});

const generalStorage = combineReducers({
  isAuth,
  loginRequest,
  setupOcrCatalog,
  setupOcrClientColors,
  setupOcrPromoTypes,
  setupOcrSubscriptions,
  test,
});

export default generalStorage;
