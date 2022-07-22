import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import uiReducer from "./uiReducer";
import branchReducer from "./branchReducer"

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    branch : branchReducer,
    //TODO:AuthReducer
    //TODO:CalendarReducer
})