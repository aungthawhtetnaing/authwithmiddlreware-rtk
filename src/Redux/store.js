import { configureStore } from "@reduxjs/toolkit";
import registerUserReducer from "./Components/registerSlice"
import loginUsersReducer from "./Components/loginSlice"
import logoutUsersReducer from "./Components/logoutSlice"
const store =configureStore({
    reducer:{
        register:registerUserReducer,
        login:loginUsersReducer,
        logout:logoutUsersReducer
    }
})

export default store