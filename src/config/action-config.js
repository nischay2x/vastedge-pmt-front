export const auth = {
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT' 
}

export const projects = {
    LIST: 'LIST',
    
}

export function handleAxiosError (error) {
    console.log(error);
    const res = error.response?.data;
    if(res.error) alert(res.error);
    else alert(error.message);
}