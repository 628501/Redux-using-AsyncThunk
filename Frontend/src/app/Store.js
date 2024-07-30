import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import UserReducer  from "../Slices/UserSlice";

const store = configureStore({
    reducer:{
        usersInfo: UserReducer,
    },
    devTools: composeWithDevTools()
})

export default store;