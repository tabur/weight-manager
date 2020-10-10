import {logoutSuccess} from './loginActions';
import {history} from '../index.js';
import {trackPromise} from 'react-promise-tracker';

export const GET_FOOD_LIST_SUCCESS = "GET_FOOD_LIST_SUCCESS";
export const GET_FOOD_LIST_FAILED = "GET_FOOD_LIST_FAILED";
export const GET_FOOD_SUCCESS = "GET_FOOD_SUCCESS";
export const GET_FOOD_FAILED = "GET_FOOD_FAILED";
export const ADD_FOOD_SUCCESS = "ADD_FOOD_SUCCESS";
export const ADD_FOOD_FAILED = "ADD_FOOD_FAILED";
export const REMOVE_FOOD_SUCCESS = "REMOVE_FOOD_SUCCESS";
export const REMOVE_FOOD_FAILED = "REMOVE_FOOD_FAILED";
export const EDIT_FOOD_SUCCESS = "EDIT_FOOD_SUCCESS";
export const EDIT_FOOD_FAILED = "EDIT_FOOD_FAILED";
export const CLEAR_FOODREDUCER_STATE = "CLEAR_FOODREDUCER_STATE";

export const getFoodList = (token) => {
  return dispatch => 	{
    let request = {
      method:"GET",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token}			
    }
    trackPromise(
      fetch("/api/food",request).then(response => {
        if(response.ok) {
          response.json().then(data => {
            dispatch(getFoodListSuccess(data));
          }).catch(error => {
            dispatch(getFoodListFailed("Failed to parse JSON data:",error));
          })
        } else {
          if(response.status === 403) {
            dispatch(getFoodListFailed("Session Failed."));
            dispatch(logoutSuccess());
            dispatch(clearFoodReducerState());
          }
          else {
            dispatch(getFoodListFailed("Server responded with status:",response.status));
          }
        }
      }).catch(error => {
        dispatch(getFoodListFailed("Server responded with an error:",error));
      })
    );
  }
}

export const getFood = (token, id) => {
  return dispatch => 	{
    let request = {
      method:"GET",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token}			
    }
    trackPromise(
      fetch("/api/food/"+id,request).then(response => {
        if(response.ok) {
          response.json().then(data => {
            dispatch(getFoodSuccess(data));
          }).catch(error => {
            dispatch(getFoodFailed("Failed to parse JSON data:",error));
          })
        } else {
          if(response.status === 403) {
            dispatch(getFoodFailed("Session Failed."));
            dispatch(logoutSuccess());
            dispatch(clearFoodReducerState());
          }
          else {
            dispatch(getFoodFailed("Server responded with status:",response.status));
          }
        }
      }).catch(error => {
        dispatch(getFoodFailed("Server responded with an error:",error));
      })
    );
  }
}


export const addFood = (token, food) => {
  return dispatch => 	{
    let request = {
      method:"POST",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token},
      body:JSON.stringify(food)
    }
    trackPromise(
      fetch("/api/food",request).then(response => {
        if(response.ok) {
          dispatch(addFoodSuccess());
          history.push("/addmeal");
        } 
        else {
          if(response.status === 403) {
            dispatch(addFoodFailed("Session Failed."));
            dispatch(logoutSuccess());
            dispatch(clearFoodReducerState());
          }
          else {
            dispatch(addFoodFailed("Server responded with status:",response.status));
          }
        }
      }).catch(error => {
        dispatch(addFoodFailed("Server responded with an error:"+error));    
      })
    );
  }
}  

export const removeFood = (token, id) => {
  return dispatch => 	{
    let request = {
      method:"DELETE",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token}
    }
    trackPromise(
      fetch("/api/food/"+id,request).then(response => {
        if(response.ok) {
          dispatch(removeFoodSuccess());
        } else {
          if(response.status === 403) {
            dispatch(removeFoodFailed("Session Failed."));
            dispatch(logoutSuccess());
            dispatch(clearFoodReducerState());
          }
          else {
            dispatch(removeFoodFailed("Server responded with status:",response.status));
          }
        }
      }).catch(error => {
        dispatch(removeFoodFailed("Server responded with an error:"+error));
      })
    );
  }
}


export const editFood = (token, id, food) => {
  return dispatch => 	{
    let request = {
      method:"PUT",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token},
      body:JSON.stringify(food)
    }
    trackPromise(
      fetch("/api/food/"+id,request).then(response => {
        if(response.ok) {
          dispatch(editFoodSuccess());
          history.push("/addmeal");
        } else {
          if(response.status === 403) {
            dispatch(editFoodFailed("Session Failed."));
            dispatch(logoutSuccess());
            dispatch(clearFoodReducerState());
          }
          else {
            dispatch(editFoodFailed("Server responded with status:",response.status));
          }
        }
      }).catch(error => {
        dispatch(editFoodFailed("Server responded with an error:"+error));
      })
    );
  }
}

export const clearFoodReducerState = () => {
  return {
		type:CLEAR_FOODREDUCER_STATE
	}
}

export const getFoodListSuccess = (list) => {
	return {
		type:GET_FOOD_LIST_SUCCESS,
		foodList:list
	}
}

export const getFoodListFailed = (error) => {
	return {
		type:GET_FOOD_LIST_FAILED,
		error:error
	}
}

export const getFoodSuccess = (food) => {
	return {
		type:GET_FOOD_SUCCESS,
		food:food
	}
}

export const getFoodFailed = (error) => {
	return {
		type:GET_FOOD_FAILED,
		error:error
	}
}

export const addFoodSuccess = () => {
	return {
		type:ADD_FOOD_SUCCESS
	}
}

export const addFoodFailed = (error) => {
	return {
		type:ADD_FOOD_FAILED,
		error:error
	}
}

export const removeFoodSuccess = () => {
	return {
		type:REMOVE_FOOD_SUCCESS
	}
}

export const removeFoodFailed = (error) => {
	return {
		type:REMOVE_FOOD_FAILED,
		error:error
	}
}

export const editFoodSuccess = () => {
	return {
		type:EDIT_FOOD_SUCCESS
	}
}

export const editFoodFailed = (error) => {
	return {
		type:EDIT_FOOD_FAILED,
		error:error
	}
}