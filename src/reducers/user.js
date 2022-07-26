import { auth } from "../config/action-config";

const initialUser = { isLoggedIn: false, err: false }

const userReducer = (user = initialUser, action) => {
    const { payload, type } = action;
    switch(type) {
        case auth.FETCH_SUCCESS: return { ...payload, isLoggedIn: true, err: false };
        case auth.FETCH_FAILURE: return { isLoggedIn: false, err: payload.message };
        case auth.LOGIN_SUCCESS: return { ...payload, isLoggedIn: true, err: false };
        case auth.LOGIN_FAILURE: return { isLoggedIn: false, err: payload.message };
        case auth.LOGOUT: return initialUser;
        default: return user;
    }
}

export default userReducer;
