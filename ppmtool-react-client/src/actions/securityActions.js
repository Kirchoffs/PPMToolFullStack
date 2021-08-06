import axios from "../api/axios";
import setJWTToken from "../securityUtils/setJWTToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwtDecode from "jwt-decode";
import setAlert from "./alertActions";

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
    } catch (errors) {
        Object.values(errors.response.data).forEach(error => {
            dispatch(setAlert(error, 'danger'));
        });
        dispatch({
            type: GET_ERRORS,
            payload: errors.response.data
        })
    }
}

export const login = loginRequest => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", loginRequest);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        const decoded = jwtDecode(token);
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
    } catch(errors) {
        Object.values(errors.response.data).forEach(error => {
            dispatch(setAlert(error, 'danger'));
        });
        dispatch({
            type: GET_ERRORS,
            payload: errors.response.data
        })
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
  };
