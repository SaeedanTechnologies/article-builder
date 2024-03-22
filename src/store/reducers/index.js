import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from './adminReducers'
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import tabChangeReducer from "./tabChangeReducer";
const rootReducer = combineReducers({
    admin: adminReducer,
    auth: authReducer,
    user: userReducer,
    tab: tabChangeReducer,
    
    
})

export default rootReducer