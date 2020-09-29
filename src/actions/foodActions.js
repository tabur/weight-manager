import {loading,endLoading,logoutSuccess} from './loginActions'

export const GET_FOOD_LIST_SUCCESS = "GET_FOOD_LIST_SUCCESS"
export const GET_FOOD_LIST_FAILED = "GET_FOOD_LIST_FAILED"
export const ADD_FOOD_SUCCESS = "ADD_FOOD_SUCCESS"
export const ADD_FOOD_FAILED = "ADD_FOOD_FAILED"
export const REMOVE_FOOD_SUCCESS = "REMOVE_FOOD_SUCCESS"
export const REMOVE_FOOD_FAILED = "REMOVE_FOOD_FAILED"
export const EDIT_FOOD_SUCCESS = "EDIT_FOOD_SUCCESS"
export const EDIT_FOOD_FAILED = "EDIT_FOOD_FAILED"
export const CLEAR_FOODREDUCER_STATE = "CLEAR_FOODREDUCER_STATE"

export const getFoodList = (token) => {
  return dispatch => 	{
    let request = {
      method:"GET",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token}			
    }
    dispatch(loading());
    fetch("/api/food",request).then(response => {
      dispatch(endLoading());
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
      dispatch(endLoading());
      dispatch(getFoodListFailed("Server responded with an error:",error));
    })
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
    dispatch(loading());
    fetch("/api/food",request).then(response => {
      dispatch(endLoading());
      if(response.ok) {
        dispatch(addFoodSuccess())
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
      dispatch(endLoading());
      dispatch(addFoodFailed("Server responded with an error:"+error));    })
  }
}  

export const removeFood = (token, id) => {
  return dispatch => 	{
    let request = {
      method:"DELETE",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token}
    }
    dispatch(loading());
    fetch("/api/food/"+id,request).then(response => {
      
      if(response.ok) {
        dispatch(removeFoodSuccess());
      } else {
        dispatch(endLoading());
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
      dispatch(endLoading());
      dispatch(removeFoodFailed("Server responded with an error:"+error));
    })
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