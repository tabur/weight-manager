import {loading,endLoading,logoutSuccess} from './loginActions';
import {history} from '../index.js';

export const GET_MEALS_SUCCESS = "GET_MEALS_SUCCESS"
export const GET_MEALS_FAILED = "GET_MEALS_FAILED"
export const ADD_MEAL_SUCCESS = "ADD_MEAL_SUCCESS"
export const ADD_MEAL_FAILED = "ADD_MEAL_FAILED"
export const EDIT_MEAL_SUCCESS = "EDIT_MEAL_SUCCESS"
export const EDIT_MEAL_FAILED = "EDIT_MEAL_FAILED"
export const REMOVE_MEAL_SUCCESS = "REMOVE_MEAL_SUCCESS"
export const REMOVE_MEAL_FAILED = "REMOVE_MEAL_FAILED"
export const CLEAR_MEALREDUCER_STATE = "CLEAR_MEALREDUCER_STATE"

export const getMeals = (token, date) => {
  return dispatch => 	{
    let request = {
      method:"GET",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token, "mealDate":date.toISOString()}
    }
    fetch("/api/diary",request).then(response => {
      dispatch(endLoading());
      if(response.ok) {
        response.json().then(data => {
          dispatch(getMealsSuccess(data));
        }).catch(error => {
          dispatch(getMealsFailed("Failed to parse JSON data:",error));
        })
      } else {
          if(response.status === 403) {
            dispatch(getMealsFailed("Session Failed."));
            dispatch(logoutSuccess());
            dispatch(clearMealReducerState());
          }
        else {
          dispatch(getMealsFailed("Server responded with status:",response.status));
        }
      }
    }).catch(error => {
      dispatch(endLoading());
      dispatch(getMealsFailed("Server responded with an error:",error));
    })
  }
}  

export const addMeal = (username, token, date, meal) => {
  let newMeal = {"owner": username, "date": date, "amount": meal.amount, "food": meal.food}
  return dispatch => 	{
    let request = {
      method:"POST",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token},
      body:JSON.stringify(newMeal)
    }
    dispatch(loading());
    fetch("/api/meal",request).then(response => {
      if(response.ok) {
        dispatch(addMealSuccess());
        history.push("/diary");
      } else {
        dispatch(endLoading());
        if(response.status === 403) {
          dispatch(addMealFailed("Session Failed."));
          dispatch(logoutSuccess());
          dispatch(clearMealReducerState());
        }
        else {
          dispatch(addMealFailed("Server responded with status:",response.status));
        }
      }
    }).catch(error => {
      dispatch(endLoading());
      dispatch(addMealFailed("Server responded with an error:"+error));
    })
    
  }
}

export const removeMeal = (token, id) => {
  return dispatch => 	{
    let request = {
      method:"DELETE",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token}
    }
    dispatch(loading());
    fetch("/api/meal/"+id,request).then(response => {
      
      if(response.ok) {
        dispatch(removeMealSuccess());
      } else {
        if(response.status === 403) {
          dispatch(removeMealFailed("Session Failed."));
          dispatch(logoutSuccess());
          dispatch(clearMealReducerState());
        }
        else {
          dispatch(removeMealFailed("Server responded with status:",response.status));
        }
      }
    }).catch(error => {
      dispatch(endLoading());
      dispatch(removeMealFailed("Server responded with an error:"+error));
    })
  }
}

export const getMealsSuccess = (mealList) => {
	return {
		type:GET_MEALS_SUCCESS,
		mealList:mealList
	}
}

export const getMealsFailed = (error) => {
	return {
		type:GET_MEALS_FAILED,
		error:error
	}
}

export const addMealSuccess = () => {
	return {
		type:ADD_MEAL_SUCCESS
	}
}

export const addMealFailed = (error) => {
	return {
		type:ADD_MEAL_FAILED,
		error:error
	}
}

export const removeMealSuccess = () => {
	return {
		type:REMOVE_MEAL_SUCCESS
	}
}

export const removeMealFailed = (error) => {
	return {
		type:REMOVE_MEAL_FAILED,
		error:error
	}
}

export const clearMealReducerState = () => {
  return {
		type:CLEAR_MEALREDUCER_STATE
	}
}
