//uuid package to generate random id
import { v4 as uuidv4 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from "./types";

// export const setAlert = (msg,alertType) => dispatch => {}

//  redux-thunk, which works as a middleware. setAlert returns the function, which is being called with the dispatch as first parameter of that function.
export const setAlert = (msg, alertType, timeout = 5000) => {
    const id = uuidv4()

    return (dispatch) => {
        //dispatch to reducers/alert.js
        dispatch(
            {
                type: SET_ALERT,
                payload: {
                    msg,
                    alertType,
                    id
                }
            },
            setTimeout(() => dispatch({
                type: REMOVE_ALERT,
                payload: id
            }), timeout)
      )
    }
}