import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import uiReducer from "./uiReducer";
import branchReducer from "./branchReducer"
import projectReducer from "./projectReducer";
import  authReducer  from "./authReducer";
import  userReducer  from "./userReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    branch : branchReducer,
    project : projectReducer,
    auth : authReducer,
    user : userReducer
    //TODO:AuthReducer
    //TODO:CalendarReducer
})