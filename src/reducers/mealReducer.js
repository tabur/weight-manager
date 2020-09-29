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


const getInitialStateFromStorage = () => {
	if(sessionStorage.getItem("mealstate")) {
		let mealstate = JSON.parse(sessionStorage.getItem("mealstate"))
		return mealstate;
	} else {
		return {
      mealList:[],
			error:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("mealstate",JSON.stringify(state));
}

const initialState = getInitialStateFromStorage();

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
      saveToStorage(tempState);
      return tempState;

    case GET_MEALS_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      saveToStorage(tempState);
      return tempState;

    case ADD_MEAL_SUCCESS:
      tempState = {
        ...state,
        error:""
      }
      saveToStorage(tempState);
      return tempState;

    case ADD_MEAL_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      saveToStorage(tempState);
      return tempState;

    case REMOVE_MEAL_SUCCESS:
      tempState = {
        ...state,
        error:""
      }
      saveToStorage(tempState);
      return tempState;

    case REMOVE_MEAL_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      saveToStorage(tempState);
      return tempState;
    
    case EDIT_MEAL_SUCCESS:
      tempState = {
        ...state,
        error:action.error
      }
      saveToStorage(tempState);
      return tempState;
  
    case EDIT_MEAL_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      saveToStorage(tempState);
      return tempState;

    case CLEAR_MEALREDUCER_STATE:
    tempState = {
      mealList:[],
      error:"",
      
    }
    saveToStorage(tempState);
    return tempState;

    default:
      return state;
  }
}

export default mealReducer;