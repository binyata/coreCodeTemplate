import axios from "axios";
import { myStore } from "store";
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
  USER_LOGOUT,
} from "./LoginConstants";

/*
 NOTES
 1. need user/admin permission logic to chooose api-key correctly
 2. I don't understand why we have a separate new and old subscription api calls...
 3. will most likely send all returned data to redux to be used throughout site
 4. Figure out a way to run promos as a background process. Probably will work well with notification system
*/

// export const store: any = myStore
export const CancelToken: any = axios.CancelToken;
export const source: any = CancelToken.source();
export const store: any = myStore;

// static readonly is another way of using const
export const loginRequest = (params: any) => (dispatch: any) => {
  dispatch({
      params,
      type: LOGIN_REQUEST,
  });
};
export const loginSuccess = (params: any, response: any) => (dispatch: any) => {
  dispatch({
      params,
      response,
      type: LOGIN_SUCCESS,
  });
};
export const loginFailure = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: LOGIN_FAILURE,
  });
};

export const dispatchOcrAdmin = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_ADMIN,
  });
};
export const dispatchOcrAdminClient = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_ADMIN_CLIENT,
  });
};
export const dispatchOcrClient = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_CLIENT,
  });
};
export const dispatchOcrJwts = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_JWTS,
  });
};
export const dispatchOcrTokens = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_TOKENS,
  });
};
export const dispatchOcrUser = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_USER,
  });
};
export const logOut = () => (dispatch: any) => {
  dispatch({
      type: USER_LOGOUT,
  });
};
export const fetchCatalogAttributesRequest = () => (dispatch: any) => {
  dispatch({
      type: SETUP_OCR_CATALOG_ATTRIBUTES_REQUEST,
  });
};
export const fetchCatalogAttributesSuccess = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_CATALOG_ATTRIBUTES_SUCCESS,
  });
};
export const fetchCatalogAttributesFailure = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_CATALOG_ATTRIBUTES_FAILURE,
  });
};
export const fetchClientColorsRequest = () => (dispatch: any) => {
  dispatch({
      type: SETUP_OCR_CLIENT_COLORS_REQUEST,
  });
};
export const fetchClientColorsSuccess = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_CLIENT_COLORS_SUCCESS,
  });
};
export const fetchClientColorsFailure = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_CLIENT_COLORS_FAILURE,
  });
};
export const fetchPromoTypesRequest = () => (dispatch: any) => {
  dispatch({
      type: SETUP_OCR_PROMO_TYPES_REQUEST,
  });
};
export const fetchPromoTypesSuccess = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_PROMO_TYPES_SUCCESS,
  });
};
export const fetchPromoTypesFailure = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_PROMO_TYPES_FAILURE,
  });
};
export const fetchSubscriptionsRequest = () => (dispatch: any) => {
  dispatch({
      type: SETUP_OCR_SUBSCRIPTIONS_REQUEST,
  });
};
export const fetchSubscriptionsSuccess = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_SUBSCRIPTIONS_SUCCESS,
  });
};
export const fetchSubscriptionsFailure = (response: any) => (dispatch: any) => {
  dispatch({
      response,
      type: SETUP_OCR_SUBSCRIPTIONS_FAILURE,
  });
};

export const loginCall: any = (user: string, pw: string) => (dispatch: any) => {
  let params: any = {
    password: pw,
    username: user,
  };
  // console.log("in login call");
  let url = "http://ocr-api.web:80/v2/user_auth/login";
  dispatch(loginRequest(params));
  return axios.post(url, params)
  .then((response) => {
    // console.log("dispatching success");
    dispatch(loginSuccess(params, response));
    // return true
  })
  .catch((error) => {
    dispatch(loginFailure(error));
    // console.log("dispatching failure");
    // return false
  });
};

export const generalStoreTask = (dataStorage: any) => {
  // Store User/admin info to local storage:
  storeClientUserToken(dataStorage).then(() => {
    // Store Subscription information
    storeSubscriptions().then(() => {
      store.dispatch(fetchSubscriptionsSuccess(JSON.parse(window.localStorage.getItem("setup-ocr-subscriptions"))));
    }).catch((error) => {
      store.dispatch(fetchSubscriptionsFailure(error));
    });
    // Store Client Color Info
    storeClientColors();
    // Store Promo Info... will need to notify when done if it takes long
    this.storePromos();
    // Store Catalog Info
    storeCatalogInfo();
  }).catch((error) => {
    // console.log(error);
  });
};

const storeClientUserToken = async(dataStorage: any) => {
  window.localStorage.clear();
  let storage = dataStorage.data.data;

  // Will need to discuss on whether to have this as localStorage or Redux...
  store.dispatch(dispatchOcrAdmin(storage.admin));
  store.dispatch(dispatchOcrAdminClient(storage.admin_client));
  store.dispatch(dispatchOcrClient(storage.client));
  store.dispatch(dispatchOcrJwts(storage.jwts));
  store.dispatch(dispatchOcrTokens(dataStorage.data.tokens));
  store.dispatch(dispatchOcrUser(storage.user));

  window.localStorage.setItem("setup-ocr-admin", JSON.stringify(storage.admin));
  window.localStorage.setItem("setup-ocr-admin-client", JSON.stringify(storage.admin_client));
  window.localStorage.setItem("setup-ocr-client", JSON.stringify(storage.client));
  window.localStorage.setItem("setup-ocr-jwts", JSON.stringify(storage.jwts));
  window.localStorage.setItem("setup-ocr-tokens", JSON.stringify(dataStorage.data.tokens));
  window.localStorage.setItem("setup-ocr-user", JSON.stringify(storage.user));

  // https://stackoverflow.com/questions/33387090/how-to-rewrite-code-to-avoid-tslint-object-access-via-string-literals
  /* tslint:disable:no-string-literal */
  axios.defaults.headers.common["X-USER-UUID"] = JSON.parse(window.localStorage.getItem("setup-ocr-user")).uuid;
  axios.defaults.headers.common["X-ADMIN-UUID"] = JSON.parse(window.localStorage.getItem("setup-ocr-admin")).uuid;
  axios.defaults.headers.common["Authorization"] =
  `Bearer ${JSON.parse(window.localStorage.getItem("setup-ocr-jwts")).admin}`;
  axios.defaults.headers.common["X-API-KEY"] = JSON.parse(window.localStorage.getItem("setup-ocr-tokens")).admin;
  /* tslint:enable:no-string-literal */
};

const storeSubscriptions = async() => {
  store.dispatch(fetchSubscriptionsRequest());
  let sendToLocalStorage = (res: any) => {
    if (localStorage.getItem("setup-ocr-subscriptions") === null) {
      window.localStorage.setItem("setup-ocr-subscriptions", JSON.stringify(res.data.data));
    } else {
      Array.prototype.push.apply(res.data.data, JSON.parse(window.localStorage.getItem("setup-ocr-subscriptions")));
      window.localStorage.setItem("setup-ocr-subscriptions", JSON.stringify(res.data.data));
    }
  };
  let clientUUID = JSON.parse(window.localStorage.getItem("setup-ocr-client")).uuid;
  let url = `http://ocr-api.web:80/v4/admin/clients/${clientUUID}/subscriptions`;
  axios.get(url).then( (res) => {
    // console.log("returning subscriptions-v4");
    sendToLocalStorage(res);
  });

  let url2 = `http://ocr-api.web:80/v3/admin/client_subscriptions`;
  const config2 = {
    params: {
      client_uuid: JSON.parse(window.localStorage.getItem("setup-ocr-client")).uuid,
      user_uuid: JSON.parse(window.localStorage.getItem("setup-ocr-user")).uuid,
    },
  };
  axios.get(url2, config2).then( (res) => {
    // console.log("returning subscriptions-v3");
    sendToLocalStorage(res);
  });
};

const storeClientColors = () => {
  let clientUUID = JSON.parse(window.localStorage.getItem("setup-ocr-client")).uuid;
  let url = `http://ocr-api.web:80/v2/clients/${clientUUID}/client_prefs`;
  store.dispatch(fetchClientColorsRequest());
  axios.get(url).then((pref) => {
    // console.log("results of color prefs");
    let prefColors = pref.data.data.filter( (el: any) => {
      return el.name === "client_colors";
    });
    window.localStorage.setItem("setup-ocr-client-colors", prefColors[0].value);
    store.dispatch(fetchClientColorsSuccess(JSON.parse(prefColors[0].value)));
  }).catch((error) => {
    store.dispatch(fetchClientColorsFailure(error));
  });
};

const storeCatalogInfo = () => {
  let clientUUID = JSON.parse(window.localStorage.getItem("setup-ocr-client")).uuid;
  let url = `http://ocr-api.web:80/v2/clients/${clientUUID}/catalog_attributes`;
  const config = {
    params: {
      client_uuid: JSON.parse(window.localStorage.getItem("setup-ocr-client")).uuid,
    },
  };
  store.dispatch(fetchCatalogAttributesRequest());
  axios.get(url).then((res) => {
    window.localStorage.setItem("setup-ocr-catalog-attributes", JSON.stringify(res.data.data));
    store.dispatch(fetchCatalogAttributesSuccess(res.data.data));
  }).catch((error) => {
    store.dispatch(fetchCatalogAttributesFailure(error));
  });
};

const storePromos = () => {
  let clientUUID = JSON.parse(window.localStorage.getItem("setup-ocr-client")).uuid;
  let url: string = `http://ocr-api.web:80/v2/clients/${clientUUID}/promo_types`;
  store.dispatch(fetchPromoTypesRequest());
  axios.get(url, {
    cancelToken: this.source.token,
  }).then((res) => {
    window.localStorage.setItem("setup-ocr-promo-types", JSON.stringify(res.data.data));
    store.dispatch(fetchPromoTypesSuccess(res.data.data));
  }).catch((error) => {
    // console.log(error);
    store.dispatch(fetchPromoTypesFailure(error));
  });
};

export function logOutAction() {
  localStorage.clear();
  return true
}

function cancelAllTokens() {
  // console.log("test in function");
  this.source.cancel("All operations canceled through logout call");
  // Redirect.
}
