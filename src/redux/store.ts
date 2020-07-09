import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import {IReduxState} from '../interfaces/IReduxState';

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

const initialState: IReduxState = {
    token: "",
    user: null,
};

function rootReducer(state = initialState, action: any) {
    switch(action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, action.payload);

        case LOGOUT_USER:
            return Object.assign({}, state, {token: "", user: null});
        
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
