import axios from 'axios'
import {
  SETUP_OCR_ADMIN,
  SETUP_OCR_ADMIN_CLIENT,
  SETUP_OCR_CLIENT,
  SETUP_OCR_JWTS,
  SETUP_OCR_TOKENS,
  SETUP_OCR_USER,
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
  USER_LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './LoginConstants'
import myStore from 'store'

/**
NOTES
1. need user/admin permission logic to chooose api-key correctly
2. I don't understand why we have a separate new and old subscription api calls...
3. will most likely send all returned data to redux to be used throughout site
4. Figure out a way to run promos as a background process. Probably will work well with notification system
*/

export const store: any = myStore
export const CancelToken: any = axios.CancelToken
export const source: any = CancelToken.source()

// static readonly is another way of using const
export const loginRequest = (params: any) => (dispatch: any) => {dispatch({ type: LOGIN_REQUEST, params })}
export const loginSuccess = (params: any, response: any) => (dispatch: any) => {dispatch({ type: LOGIN_SUCCESS, params, response })}
export const loginFailure = (response: any) => (dispatch: any) => {dispatch({ type: LOGIN_FAILURE, response })}


export const dispatchOcrAdmin = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_ADMIN, response: response })}
export const dispatchOcrAdminClient = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_ADMIN_CLIENT, response: response })}
export const dispatchOcrClient = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT, response: response })}
export const dispatchOcrJwts = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_JWTS, response: response })}
export const dispatchOcrTokens = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_TOKENS, response: response })}
export const dispatchOcrUser = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_USER, response: response })}
export const logOut = () => (dispatch: any) => {dispatch({ type: USER_LOGOUT })}
export const fetchCatalogAttributesRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_CATALOG_ATTRIBUTES_REQUEST })}
export const fetchCatalogAttributesSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CATALOG_ATTRIBUTES_SUCCESS, response: response })}
export const fetchCatalogAttributesFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CATALOG_ATTRIBUTES_FAILURE, response: response })}
export const fetchClientColorsRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT_COLORS_REQUEST })}
export const fetchClientColorsSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT_COLORS_SUCCESS, response: response })}
export const fetchClientColorsFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT_COLORS_FAILURE, response: response })}
export const fetchPromoTypesRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_PROMO_TYPES_REQUEST })}
export const fetchPromoTypesSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_PROMO_TYPES_SUCCESS, response: response })}
export const fetchPromoTypesFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_PROMO_TYPES_FAILURE, response: response })}
export const fetchSubscriptionsRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_SUBSCRIPTIONS_REQUEST })}
export const fetchSubscriptionsSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_SUBSCRIPTIONS_SUCCESS, response: response })}
export const fetchSubscriptionsFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_SUBSCRIPTIONS_FAILURE, response: response })}

export const loginCall: any = (user:string, pw:string) => (dispatch: any) => {
  let params: any = {
    username: user,
    password: pw
  }
  console.log("in login call")
  let url = 'http://ocr-api.web:80/v2/user_auth/login'
  dispatch(loginRequest(params));
  return axios.post(url, params)
  .then((response) => {
    console.log("dispatching success")
    dispatch(loginSuccess(params, response))
    //return true
  })
  .catch((error) => {
    dispatch(loginFailure(error))
    console.log("dispatching failure")
    //return false
  });
}

export const generalStoreTask = (dataStorage: any) => {
  // Store User/admin info to local storage:
  storeClientUserToken(dataStorage).then(() => {
    // Store Subscription information
    // LoginActions.storeSubscriptions().then(() => {
    //   LoginActions.store.dispatch(LoginActions.fetchSubscriptionsSuccess(JSON.parse(window.localStorage.getItem("setup-ocr-subscriptions"))))
    // }).catch(error => {
    //   LoginActions.store.dispatch(LoginActions.fetchSubscriptionsFailure(error))
    // })
    // // Store Client Color Info
    // LoginActions.storeClientColors()
    // Store Promo Info... will need to notify when done if it takes long
    //storePromos()
    // Store Catalog Info
    // LoginActions.storeCatalogInfo()
  }).catch(error => {
    console.log(error)
  })
}

export const storeClientUserToken = async(dataStorage: any) => {
  window.localStorage.clear();
  let storage = dataStorage.data.data

  // Will need to discuss on whether to have this as localStorage or Redux...
  store.dispatch(dispatchOcrAdmin(storage.admin))
  store.dispatch(dispatchOcrAdminClient(storage.admin_client))
  store.dispatch(dispatchOcrClient(storage.client))
  store.dispatch(dispatchOcrJwts(storage.jwts))
  store.dispatch(dispatchOcrTokens(dataStorage.data.tokens))
  store.dispatch(dispatchOcrUser(storage.user))

  window.localStorage.setItem('setup-ocr-admin', JSON.stringify(storage.admin))
  window.localStorage.setItem('setup-ocr-admin-client', JSON.stringify(storage.admin_client))
  window.localStorage.setItem('setup-ocr-client', JSON.stringify(storage.client))
  window.localStorage.setItem('setup-ocr-jwts', JSON.stringify(storage.jwts))
  window.localStorage.setItem('setup-ocr-tokens', JSON.stringify(dataStorage.data.tokens))
  window.localStorage.setItem('setup-ocr-user', JSON.stringify(storage.user))

  axios.defaults.headers.common['X-USER-UUID'] = JSON.parse(window.localStorage.getItem('setup-ocr-user')).uuid
  axios.defaults.headers.common['X-ADMIN-UUID'] = JSON.parse(window.localStorage.getItem('setup-ocr-admin')).uuid
  axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(window.localStorage.getItem('setup-ocr-jwts')).admin}`
  axios.defaults.headers.common['X-API-KEY'] = JSON.parse(window.localStorage.getItem('setup-ocr-tokens')).admin
}

// export const storePromos = () => {
//   let clientUUID = JSON.parse(window.localStorage.getItem('setup-ocr-client')).uuid
//   let url: string = `http://ocr-api.web:80/v2/clients/${clientUUID}/promo_types`
//   store.dispatch(fetchPromoTypesRequest())
//   axios.get(url, {
//     cancelToken: source.token
//   }).then(res => {
//     window.localStorage.setItem('setup-ocr-promo-types', JSON.stringify(res.data.data))
//     store.dispatch(fetchPromoTypesSuccess(res.data.data))
//   }).catch(error => {
//     console.log(error)
//     store.dispatch(fetchPromoTypesFailure(error))
//   })
// }

// export const logOutAction = () => {
//   source.cancel('All operations canceled through logout call')
//   localStorage.clear();
//   store.dispatch(logOut())
// }
