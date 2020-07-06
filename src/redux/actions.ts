import { IClosetItemWImages } from "../interfaces/IClosetItemWImages";

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const ADD_CLOSET_ITEM = "ADD_CLOSET_ITEM";
const SET_CLOSET_ITEMS = "SET_CLOSET_ITEMS";

export const storeJWT = (payload: {token: string}) => {
    return { type: LOGIN_USER, payload }
}

export const logoutUser = () => {
    return { type: LOGOUT_USER }
}

export const addClosetItem = (payload: {newItem: IClosetItemWImages}) => {
    return { type: ADD_CLOSET_ITEM, payload }
}

export const setClosetItems = (payload: {closetItemsWImages: IClosetItemWImages[]}) => {
    return { type: SET_CLOSET_ITEMS, payload }
}
