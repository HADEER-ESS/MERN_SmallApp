import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/authSlicer";
import goalReducer from "./features/goalsSlicer";

const store = configureStore({
    reducer : {
        auth : userReducer,
        goal : goalReducer
    }
})

export default store;