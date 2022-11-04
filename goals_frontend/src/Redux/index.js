import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlicer";


const store = configureStore({
    reducer : {
        auth : userReducer,
    }
})

export default store;