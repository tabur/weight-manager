import {trackPromise} from 'react-promise-tracker';
import clearFoodReducerState from './foodActions';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

// async actions
export const onLogin = (user) => {
  return dispatch => 	{
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
    }
    trackPromise(
      fetch("/login",request).then(response => {
        if(response.ok) {
          response.json().then(data => {
            dispatch(loginSuccess(user.username, data.token)); 
          }).catch(error => {
            dispatch(loginFailed("Failed to parse response. Reason:",error));
          })
        } else {
          dispatch(loginFailed("Server responded with status:",response.status));
        }
      }).catch(error => {
        dispatch(loginFailed("Server responded with an error:",error));
      })
    );
  }
}
	
export const onLogout = (token) => {
  return dispatch => 	{
    let request = {
      method:"POST",
      mode:"cors",
      headers: {"Content-type":"application/json",
      "token":token}
    }
    trackPromise(
      fetch("/logout",request).then(response => {
        dispatch(logoutSuccess());
      }).catch(error => {
        dispatch(logoutFailed("Server responded with an error",error));
      })
    );
  }
}

export const loginSuccess = (username, token) => {
  return {
    type:LOGIN_SUCCESS,
    username:username,
    token:token
  }
}

export const loginFailed = (error) => {
  return {
    type:LOGIN_FAILED,
    error:error
  }
}

export const logoutSuccess = () => {
  return {
    type:LOGOUT_SUCCESS
  }
}

export const logoutFailed = (error) => {
  return {
    type:LOGOUT_FAILED
  }
}
