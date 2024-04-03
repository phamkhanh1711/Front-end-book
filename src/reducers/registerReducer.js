import { FETCH_REGISTER_ERROR, FETCH_REGISTER_REQUEST, FETCH_REGISTER_SUCCESS } from "../actions/types";

  export const INITIAL_STATE = {
    register: [],
  };
  
  const registerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_REGISTER_REQUEST:
        console.log("FETCH_REGISTER_REQUEST", action);
        return {
          ...state,
        };
  
      case FETCH_REGISTER_SUCCESS:
        console.log("FETCH_REGISTER_SUCCESS", action);
        return {
          ...state,
          register: action.dataUsers,
        };
      case FETCH_REGISTER_ERROR:
        console.log("FETCH_REGISTER_ERROR", action);
        return {
          ...state,
        };
  
      default:
        return state;
    }
  };
  
  export default registerReducer;
  