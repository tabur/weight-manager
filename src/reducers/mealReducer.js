import {
  GET_MEALS_SUCCESS,
	GET_MEALS_FAILED,
  ADD_MEAL_SUCCESS,
	ADD_MEAL_FAILED,
  REMOVE_MEAL_SUCCESS,
  REMOVE_MEAL_FAILED,
  EDIT_MEAL_SUCCESS,
  EDIT_MEAL_FAILED,
  CLEAR_MEALREDUCER_STATE,
} from '../actions/mealActions'

const initialState = {
  mealList: []
}

const mealReducer = (state = initialState,action) => {
	console.log("MealReducer, action:",action);
	let tempState = {}
	switch(action.type) {
    case GET_MEALS_SUCCESS:
      tempState = {
        ...state,
        mealList:action.mealList,
        error:""
      }
      return tempState;

    case GET_MEALS_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      return tempState;

    case ADD_MEAL_SUCCESS:
      tempState = {
        ...state,
        error:""
      }
      return tempState;

    case ADD_MEAL_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      return tempState;

    case REMOVE_MEAL_SUCCESS:
      tempState = {
        ...state,
        error:""
      }
      return tempState;

    case REMOVE_MEAL_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      return tempState;
    
    case EDIT_MEAL_SUCCESS:
      tempState = {
        ...state,
        error:""
      }
      return tempState;
  
    case EDIT_MEAL_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      return tempState;

    case CLEAR_MEALREDUCER_STATE:
      tempState = {
        mealList:[],
        error:"",
        
      }
      return tempState;

    default:
      return state;
  }
}

export default mealReducer;