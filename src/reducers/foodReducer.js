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
		let contactstate = JSON.parse(sessionStorage.getItem("foodstate"))
		return contactstate;
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
	console.log("ContactReducer, action:",action);
	let tempState = {}
	switch(action.type) {
		case FETCH_CONTACTS_SUCCESS:
			tempState = {
				...state,
				list:action.list,
				error:""
			}
			saveToStorage(tempState);
			return tempState;