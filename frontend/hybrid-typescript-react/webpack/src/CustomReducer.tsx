export function createRequestReducer(
    obj: { FETCH_REQUEST: any, FETCH_SUCCESS: any, FETCH_FAILURE: any, initialState: any },
  ) {
    return (state: any = {
        isFetching: false,
        response: obj.initialState,
        status: null,
        type: null,
      }, action: any) => {
        switch (action.type) {
          case obj.FETCH_REQUEST:
            return {
              isFetching: true,
              response: obj.initialState,
              status: null,
              type: action.type,
            };
          case obj.FETCH_SUCCESS:
            return {
              isFetching: false,
              response: action.response,
              status: "success",
              type: action.type,
            };
          case obj.FETCH_FAILURE:
            return {
              isFetching: false,
              response: action.response,
              status: "error",
              type: action.type,
            };
          default:
            return state;
        }
      };
  }
