import * as authApi from "../api/auth";

import { auth as actionType, handleAxiosError } from "../config/action-config.js";

export const getUser = (token) => async(dispatch) => {
    try {
        const { data } = await authApi.fetchTokenUser(token);
        dispatch({ type: actionType.FETCH_SUCCESS, payload: {...data.data, token} })
    } catch (error) {
        handleAxiosError(error);
        dispatch({ type: actionType.FETCH_FAILURE, payload: { message: "Please Try Login Again" } })
    }
}

export const loginWithEmail = ({email, password}) => async (dispatch) => {
    try {
        const { data } = await authApi.emailLogin(email, password);
        localStorage.setItem("token", data.token);
        dispatch({ type: actionType.LOGIN_SUCCESS, payload: data })
    } catch (error) {
        handleAxiosError(error);
        dispatch({ type: actionType.LOGIN_FAILURE, payload: error })        
    }
} 

export const logout = () => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: actionType.LOGOUT, payload: null })
}
