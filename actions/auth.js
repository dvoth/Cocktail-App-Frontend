import {
  USER_LOADED,
  USER_LOADING, 
  AUTH_ERROR, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT_SUCCESS, 
  LOGOUT_FAIL,
  REGISTER_SUCCESS, 
  REGISTER_FAIL
} from './types'
import { handleErrors } from './messages';
import {API_URL} from '@env';

// CHECK TOKEN AND LOAD USER

export function loadUser() {
  return (dispatch, getState) => {
      dispatch({ type: USER_LOADING })

      return(fetch(API_URL+'/user', tokenConfig(getState))
        .then(res => {
          // If we get a 401 it's probably because there was an invalid token
          if (res.status == 401) {
            // Throw an error so we don't attempt to dispatch anything to redux on 401
            throw new Error(res.status)
          } else {
            return res.json()
          }
        })
        .then(json => {
            console.log("load user success")
            console.log(json)
            dispatch({
                type: USER_LOADED,
                payload: json
            })
        }).catch(err => {
            // dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
      )
  }
}

// REGISTER USER
export const register = (username, password, password2, email) => (dispatch) => {
  // Headers
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username, 
      password, 
      email 
    })
  }

  fetch(API_URL+'/auth/register', config)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: json,
    });
  })
  .catch((err) => {
    // dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: REGISTER_FAIL
    });
  });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password 
      })
    };

    fetch(API_URL+'/auth/login', config)
      .then(handleErrors)
      .then(json => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: json,
          });
        })
        .catch((err) => {
          const arrayOfErrors = Object.entries(JSON.parse(err.message))
          dispatch({
            type: LOGIN_FAIL,
            payload: arrayOfErrors
          });
        });
  };

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  config = tokenConfig(getState)
  config['method'] = 'POST'

  fetch(API_URL+'/auth/logout', config)
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    }).catch(err => {
        // dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: LOGOUT_FAIL
        })
    })
}

// Setup config with token - helper function
export const tokenConfig = getState => {
  //get token from state
  const token = getState().auth.token

  // Headers
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

  //If token, add to headers config
  if (token) {
      config.headers['Authorization'] = `Token ${token}`
  }

  return config
}
