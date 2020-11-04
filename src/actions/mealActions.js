import {logoutSuccess} from './userActions';
import {history} from '../index.js';
import {trackPromise} from 'react-promise-tracker';

export const GET_MEALS_SUCCESS = "GET_MEALS_SUCCESS";
export const GET_MEALS_FAILED = "GET_MEALS_FAILED";
export const ADD_MEAL_SUCCESS = "ADD_MEAL_SUCCESS";
export const ADD_MEAL_FAILED = "ADD_MEAL_FAILED";
export const EDIT_MEAL_SUCCESS = "EDIT_MEAL_SUCCESS";
export const EDIT_MEAL_FAILED = "EDIT_MEAL_FAILED";
export const REMOVE_MEAL_SUCCESS = "REMOVE_MEAL_SUCCESS";
export const REMOVE_MEAL_FAILED = "REMOVE_MEAL_FAILED";
export const CLEAR_MEALREDUCER_STATE = "CLEAR_MEALREDUCER_STATE";

export const getMeals = (token, date) => {
  return dispatch => 	{
    let request = {
      method:"GET",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token, "mealDate":date.toISOString()}
    }
    trackPromise(
      fetch("/api/diary",request).then(response => {
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
        dispatch(getMealsFailed("Server responded with an error:",error));
      }));
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
    trackPromise(
      fetch("/api/meal",request).then(response => {
        if(response.ok) {
          dispatch(addMealSuccess());
          history.push("/diary");
        } else {
          
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
        dispatch(addMealFailed("Server responded with an error:"+error));
      })
    );
  }
}

export const removeMeal = (token, id, date) => {
  return dispatch => 	{
    let request = {
      method:"DELETE",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token}
    }
    trackPromise(
      fetch("/api/meal/"+id,request).then(response => {
        if(response.ok) {
          dispatch(removeMealSuccess());
          dispatch(getMeals(token, date))
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
        dispatch(removeMealFailed("Server responded with an error:"+error));
      })
    );
  }
}

// TODO 
export const editMeal = (username, token, date, meal) => {
  let newMeal = {"owner": username, "date": date, "amount": meal.amount, "food": meal.food}
  return dispatch => 	{
    let request = {
      method:"PUT",
      mode:"cors",
      headers:{"Content-type":"application/json", "token":token},
      body:JSON.stringify(newMeal)
    }
    trackPromise(
      fetch("/api/meal",request).then(response => {
        if(response.ok) {
          dispatch(editMealSuccess());
          //history.push("/diary");
        } else {
          
          if(response.status === 403) {
            dispatch(editMealFailed("Session Failed."));
            dispatch(logoutSuccess());
            dispatch(clearMealReducerState());
          }
          else {
            dispatch(editMealFailed("Server responded with status:",response.status));
          }
        }
      }).catch(error => {
        dispatch(editMealFailed("Server responded with an error:"+error));
      })
    );
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

export const editMealSuccess = () => {
	return {
		type:EDIT_MEAL_SUCCESS
	}
}

export const editMealFailed = (error) => {
	return {
		type:EDIT_MEAL_FAILED,
		error:error
	}
}

export const clearMealReducerState = () => {
  return {
		type:CLEAR_MEALREDUCER_STATE
	}
}
