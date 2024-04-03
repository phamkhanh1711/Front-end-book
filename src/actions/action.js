import axios from "axios";
import { FETCH_LOGIN_ERROR, FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_REGISTER_ERROR, FETCH_REGISTER_REQUEST, FETCH_REGISTER_SUCCESS } from "./types";

export const fetchRegisterRequest = () => {
    return {
      type: FETCH_REGISTER_REQUEST,
    };
  };
  export const fetchRegisterSuccess = (data) => {
    return {
      type: FETCH_REGISTER_SUCCESS,
      dataUsers: data,
    };
  };
  
  export const fetchRegisterError = () => {
    return {
      type: FETCH_REGISTER_ERROR,
    };
  };


  export const fetchRegister = (username , email, password, role_id) => {
    return async (dispatch) => {
      dispatch(fetchRegisterRequest());
      try {
        const response = await axios.post(
          "http://localhost:8081/register",
          { username , email, password, role_id }
        );
        console.log(response);
        dispatch(fetchRegisterSuccess(response));
        return response; // Optionally return data
      } catch (error) {
        dispatch(fetchRegisterError(error));
        throw error; // Re-throw error for handling in component
      }
    };
  };



  export const fetchLoginRequest = () => {
    return {
      type: FETCH_LOGIN_REQUEST,
    };
  };
  export const fetchLoginSuccess = (data) => {
    return {
      type: FETCH_LOGIN_SUCCESS,
      dataUsers: data,
    };
  };
  
  export const fetchLoginError = () => {
    return {
      type: FETCH_LOGIN_ERROR,
    };
  };


  export const fetchLogin = (email, password) => {
    return async (dispatch) => {
      dispatch(fetchLoginRequest());
      try {
        const response = await axios.post(
          "http://localhost:8081/login",
          { email, password}
        );
        console.log(response);
        dispatch(fetchLoginSuccess(response.data));
        return response.data; // Optionally return data
      } catch (error) {
        dispatch(fetchLoginError(error));
        throw error; // Re-throw error for handling in component
      }
    };
  };