import * as authApi from "../api/auth";

export const getProjectsByUserId = (id, query, token) => async(dispatch) => {
    
}

export const getProjects = (limit, offset, token) => async(dispatch) => {
    try {
        const { data } = await authApi.fetchTokenUser(token);
        dispatch({ type: authType.FETCH_SUCCESS, payload: {...data.data, token} })
    } catch (error) {
        handleAxiosError(error);
        dispatch({ type: authType.FETCH_FAILURE, payload: { message: "Please Try Login Again" } })
    }
}