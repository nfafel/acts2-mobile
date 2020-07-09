import { IUser } from "../interfaces";

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

export interface ILoginUserPayload {
    token: string;
    user: IUser | null;
}

export const storeUser = (payload: ILoginUserPayload) => {
    return { type: LOGIN_USER, payload }
}

export const logoutUser = () => {
    return { type: LOGOUT_USER }
}
