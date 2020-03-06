import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import {IReduxState} from '../interfaces/IReduxState';
import { IClosetItemWImages } from "../interfaces/IClosetItemWImages";

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const ADD_CLOSET_ITEM = "ADD_CLOSET_ITEM";
const SET_CLOSET_ITEMS = "SET_CLOSET_ITEMS";

const initialState: IReduxState = {
    token: "",
    closetItemsWImages: null
};

function rootReducer(state = initialState, action: any) {
    switch(action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, action.payload);

        case LOGOUT_USER:
            return Object.assign({}, state, {token: ""});

        case ADD_CLOSET_ITEM: 
            var newClosetItemsWImages: IClosetItemWImages[];
            if (state.closetItemsWImages === null) {
                newClosetItemsWImages = [action.payload.newItem];
            } else {
                newClosetItemsWImages = [...state.closetItemsWImages, action.payload.newItem];
            }
            return Object.assign({}, state, {closetItemsWImages: newClosetItemsWImages});

        case SET_CLOSET_ITEMS:
            return Object.assign({}, state, action.payload);
        
        default: 
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)
export const persistor = persistStore(store)

export default store;