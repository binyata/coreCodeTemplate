import { any } from "prop-types";

export function createRequestReducer(obj: { FETCH_REQUEST:any, FETCH_SUCCESS:any, FETCH_FAILURE:any, initialState:any }) {
    return function(state: any = {
        type: null,
        isFetching: false,
        response: obj.initialState,
        status: null
      }, action: any) {
        switch (action.type) {
          case obj.FETCH_REQUEST:
            return {
              type: action.type,
              isFetching: true,
              response: obj.initialState,
              status: null
            };
          case obj.FETCH_SUCCESS:
            return {
              type: action.type,
              isFetching: false,
              response: action.response,
              status: 'success'
            };
          case obj.FETCH_FAILURE:
            return {
              type: action.type,
              isFetching: false,
              response: action.response,
              status: 'error'
            };
          default:
            return state;
        }
      };
  }
  