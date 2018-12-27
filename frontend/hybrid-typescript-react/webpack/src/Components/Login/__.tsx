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
} from './LoginConstants'
import myStore from 'store'
import React, {PropTypes} from 'react'
import { Link, Redirect } from 'react-router-dom'

/**
NOTES
1. need user/admin permission logic to chooose api-key correctly
2. I don't understand why we have a separate new and old subscription api calls...
3. will most likely send all returned data to redux to be used throughout site
4. Figure out a way to run promos as a background process. Probably will work well with notification system
*/

export class LoginActions extends React.Component {

  constructor(props: any) {
    super(props)
    this.logOutReroute = this.logOutReroute.bind(this)
  }

  logOutReroute(e: { target: HTMLInputElement; }) {
    this.props.history.push('/')
  }

  static readonly store: any = myStore
  CancelToken: any = axios.CancelToken
  source: any = this.CancelToken.source()

  // static readonly is another way of using const
  static readonly dispatchOcrAdmin = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_ADMIN, response: response })}
  static readonly dispatchOcrAdminClient = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_ADMIN_CLIENT, response: response })}
  static readonly dispatchOcrClient = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT, response: response })}
  static readonly dispatchOcrJwts = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_JWTS, response: response })}
  static readonly dispatchOcrTokens = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_TOKENS, response: response })}
  static readonly dispatchOcrUser = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_USER, response: response })}
  static readonly logOut = () => (dispatch: any) => {dispatch({ type: USER_LOGOUT })}
  static readonly fetchCatalogAttributesRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_CATALOG_ATTRIBUTES_REQUEST })}
  static readonly fetchCatalogAttributesSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CATALOG_ATTRIBUTES_SUCCESS, response: response })}
  static readonly fetchCatalogAttributesFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CATALOG_ATTRIBUTES_FAILURE, response: response })}
  static readonly fetchClientColorsRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT_COLORS_REQUEST })}
  static readonly fetchClientColorsSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT_COLORS_SUCCESS, response: response })}
  static readonly fetchClientColorsFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_CLIENT_COLORS_FAILURE, response: response })}
  static readonly fetchPromoTypesRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_PROMO_TYPES_REQUEST })}
  static readonly fetchPromoTypesSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_PROMO_TYPES_SUCCESS, response: response })}
  static readonly fetchPromoTypesFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_PROMO_TYPES_FAILURE, response: response })}
  static readonly fetchSubscriptionsRequest = () => (dispatch: any) => {dispatch({ type: SETUP_OCR_SUBSCRIPTIONS_REQUEST })}
  static readonly fetchSubscriptionsSuccess = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_SUBSCRIPTIONS_SUCCESS, response: response })}
  static readonly fetchSubscriptionsFailure = (response: any) => (dispatch: any) => {dispatch({ type: SETUP_OCR_SUBSCRIPTIONS_FAILURE, response: response })}

  static readonly loginCall = (user:string, pw:string) => {
    let data: any = {
      username: user,
      password: pw
    }
    let url = 'http://ocr-api.web:80/v2/user_auth/login'
    return axios.post(url, data)
  }

  generalStoreTask = (dataStorage: any) => {
    // Store User/admin info to local storage:
    LoginActions.storeClientUserToken(dataStorage).then(() => {
      // Store Subscription information
      LoginActions.storeSubscriptions().then(() => {
        LoginActions.store.dispatch(LoginActions.fetchSubscriptionsSuccess(JSON.parse(window.localStorage.getItem("setup-ocr-subscriptions"))))
      }).catch(error => {
        LoginActions.store.dispatch(LoginActions.fetchSubscriptionsFailure(error))
      })
      // Store Client Color Info
      LoginActions.storeClientColors()
      // Store Promo Info... will need to notify when done if it takes long
      this.storePromos()
      // Store Catalog Info
      LoginActions.storeCatalogInfo()
    }).catch(error => {
      console.log(error)
    })
  }

  static readonly storeClientUserToken = async(dataStorage: any) => {
    window.localStorage.clear();
    let storage = dataStorage.data.data

    // Will need to discuss on whether to have this as localStorage or Redux...
    LoginActions.store.dispatch(LoginActions.dispatchOcrAdmin(storage.admin))
    LoginActions.store.dispatch(LoginActions.dispatchOcrAdminClient(storage.admin_client))
    LoginActions.store.dispatch(LoginActions.dispatchOcrClient(storage.client))
    LoginActions.store.dispatch(LoginActions.dispatchOcrJwts(storage.jwts))
    LoginActions.store.dispatch(LoginActions.dispatchOcrTokens(dataStorage.data.tokens))
    LoginActions.store.dispatch(LoginActions.dispatchOcrUser(storage.user))

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

  static readonly storeSubscriptions = async() => {
    LoginActions.store.dispatch(LoginActions.fetchSubscriptionsRequest())
    let sendToLocalStorage = function(res: any) {
      if (localStorage.getItem("setup-ocr-subscriptions") === null) {
        window.localStorage.setItem("setup-ocr-subscriptions", JSON.stringify(res.data.data))
      } else {
        Array.prototype.push.apply(res.data.data, JSON.parse(window.localStorage.getItem("setup-ocr-subscriptions")))
        window.localStorage.setItem("setup-ocr-subscriptions", JSON.stringify(res.data.data))
      }
    }
    let clientUUID = JSON.parse(window.localStorage.getItem('setup-ocr-client')).uuid
    let url = `http://ocr-api.web:80/v4/admin/clients/${clientUUID}/subscriptions`
    axios.get(url).then( res => {
      console.log("returning subscriptions-v4")
      sendToLocalStorage(res)
    })

    let url2 = `http://ocr-api.web:80/v3/admin/client_subscriptions`
    const config2 = {
      params: {
        client_uuid: JSON.parse(window.localStorage.getItem('setup-ocr-client')).uuid,
        user_uuid: JSON.parse(window.localStorage.getItem('setup-ocr-user')).uuid,
      },
    }
    axios.get(url2, config2).then( res => {
      console.log("returning subscriptions-v3")
      sendToLocalStorage(res)
    })
  }

  static readonly storeClientColors = () => {
    let clientUUID = JSON.parse(window.localStorage.getItem('setup-ocr-client')).uuid
    let url = `http://ocr-api.web:80/v2/clients/${clientUUID}/client_prefs`
    LoginActions.store.dispatch(LoginActions.fetchClientColorsRequest())
    axios.get(url).then(pref => {
      console.log("results of color prefs")
      let prefColors = pref.data.data.filter( function(el: any) {
        return el.name === 'client_colors'
      })
      window.localStorage.setItem("setup-ocr-client-colors", prefColors[0].value)
      LoginActions.store.dispatch(LoginActions.fetchClientColorsSuccess(JSON.parse(prefColors[0].value)))
    }).catch(error => {
      LoginActions.store.dispatch(LoginActions.fetchClientColorsFailure(error))
    })
  }

  static readonly storeCatalogInfo = () => {
    let clientUUID = JSON.parse(window.localStorage.getItem('setup-ocr-client')).uuid
    let url = `http://ocr-api.web:80/v2/clients/${clientUUID}/catalog_attributes`
    const config = {
      params: {
        client_uuid: JSON.parse(window.localStorage.getItem('setup-ocr-client')).uuid,
      },
    }
    LoginActions.store.dispatch(LoginActions.fetchCatalogAttributesRequest())
    axios.get(url).then(res => {
      window.localStorage.setItem("setup-ocr-catalog-attributes", JSON.stringify(res.data.data))
      LoginActions.store.dispatch(LoginActions.fetchCatalogAttributesSuccess(res.data.data))
    }).catch(error => {
      LoginActions.store.dispatch(LoginActions.fetchCatalogAttributesFailure(error))
    })
  }

  storePromos = () => {
    let clientUUID = JSON.parse(window.localStorage.getItem('setup-ocr-client')).uuid
    let url: string = `http://ocr-api.web:80/v2/clients/${clientUUID}/promo_types`
    LoginActions.store.dispatch(LoginActions.fetchPromoTypesRequest())
    axios.get(url, {
      cancelToken: this.source.token
    }).then(res => {
      window.localStorage.setItem('setup-ocr-promo-types', JSON.stringify(res.data.data))
      LoginActions.store.dispatch(LoginActions.fetchPromoTypesSuccess(res.data.data))
    }).catch(error => {
      console.log(error)
      LoginActions.store.dispatch(LoginActions.fetchPromoTypesFailure(error))
    })
  }

  public logOutAction() {
    localStorage.clear();
    LoginActions.store.dispatch(LoginActions.logOut())
  }

  public cancelAllTokens() {
    console.log("test in function")
    this.source.cancel('All operations canceled through logout call')
    Redirect.
  }

}
