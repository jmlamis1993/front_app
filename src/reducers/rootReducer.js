import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import uiReducer from "./uiReducer";
import branchReducer from "./branchReducer"
import projectReducer from "./projectReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    branch : branchReducer,
    project : projectReducer,
    //TODO:AuthReducer
    //TODO:CalendarReducer
})