import {
	GET_FOOD_LIST_SUCCESS,
  GET_FOOD_LIST_FAILED,
  GET_MEALS_SUCCESS,
	GET_MEALS_FAILED,
	ADD_FOOD_SUCCESS,
  ADD_FOOD_FAILED,
  ADD_MEAL_SUCCESS,
	ADD_MEAL_FAILED,
	REMOVE_FOOD_SUCCESS,
  REMOVE_FOOD_FAILED,
  REMOVE_MEAL_SUCCESS,
	REMOVE_MEAL_FAILED,
	CLEAR_FOODREDUCER_STATE
} from '../actions/foodActions'


const getInitialStateFromStorage = () => {
	if(sessionStorage.getItem("foodstate")) {
		let foodstate = JSON.parse(sessionStorage.getItem("foodstate"))
		return foodstate;
	} else {
		return {
      foodList:[],
      food:{},
      mealList:[],
      date: null,
			error:""
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("foodstate",JSON.stringify(state));
}

const initialState = getInitialStateFromStorage();

const foodReducer = (state = initialState,action) => {
	console.log("FoodReducer, action:",action);
	let tempState = {}
	switch(action.type) {
		case GET_FOOD_LIST_SUCCESS:
			tempState = {
				...state,
				foodList:action.foodList,
				error:""
			}
			saveToStorage(tempState);
      return tempState;

    case GET_FOOD_LIST_FAILED:
      tempState = {
        ...state,
        error:action.error
      }
      saveToStorage(tempState);
      return tempState;
      
    case GET_MEALS_SUCCESS:
      tempState = {
        ...state,
        meals:action.meals,
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

    case ADD_FOOD_SUCCESS:
      tempState = {
        ...state,
				error:""
      }
      saveToStorage(tempState);
      return tempState;

    case ADD_FOOD_FAILED:
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

    case REMOVE_FOOD_SUCCESS:
      tempState = {
        ...state,
				error:""
      }
      saveToStorage(tempState);
      return tempState;

    case REMOVE_FOOD_FAILED:
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

    case CLEAR_FOODREDUCER_STATE:
      tempState = {
        foodList:[],
        meals:[],
        error:"",
        
      }
      saveToStorage(tempState);
      return tempState;

    default:
      return state;
  }
}
export default foodReducer;