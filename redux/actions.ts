import { IReduxState } from "../interfaces/IReduxState";

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

export const storeJWT = (payload: IReduxState) => {
    return { type: LOGIN_USER, payload }
}

export const logoutUser = (payload: IReduxState) => {
    return { type: LOGOUT_USER, payload }
}