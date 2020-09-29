import {
  LOADING,
  END_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "../actions/loginActions";

const getInitialStateFromStorage = () => {
	if(sessionStorage.getItem("loginstate")) {
		let loginstate = JSON.parse(sessionStorage.getItem("loginstate"))
		return loginstate;
	} else {
		return {
        token:"",
        username: "",
				isLogged:false,
				loading:false,
				error:""
				}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialStateFromStorage();

const loginReducer = (state = initialState, action) => {
  console.log("LoginReducer, action:",action);
  
  let tempState = {}
  
	switch(action.type) {
		case LOADING:
			return {
				...state,
				loading:true,
				error:""
      }
      
		case END_LOADING: 
			return {
				...state,
				loading:false,
				error:""
			}
		
		case LOGIN_SUCCESS:
			tempState = {
				isLogged:true,
        token:action.token,
        username:action.username,
				error:"",
				loading:false
			}
			saveToStorage(tempState);
      return tempState;
      
		case LOGIN_FAILED: 
			tempState ={
				...state,
				error:action.error,
				loading:false
			}
			saveToStorage(tempState);
      return tempState;
      
		case LOGOUT_SUCCESS:
			tempState ={
				isLogged:false,
        token:"",
        username:"",
				error:"",
				loading:false
			}
			saveToStorage(tempState);
      return tempState;	
      
		case LOGOUT_FAILED: 
			tempState ={
				isLogged:false,
        token:"",
        username:"",
				error:action.error,
				loading:false
			}
			saveToStorage(tempState);
      return tempState;	
      
		default:
			return state;
	}
}

export default loginReducer;