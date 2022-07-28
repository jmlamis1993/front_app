import { types } from "../types/types";
import { calendarService } from "../services/calendarServices";


export const eventStartAddNew = (event) => { 

     return async(dispatch) =>{
        const response = await calendarService.AddEvent(event);
        console.log(response);

     }
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});
export const eventUpdated = (event) => ({
   type : types.eventUpdate,
   payload : event  
});
export const eventClearActiveEvent = () => ({
   type: types.eventClearActiveEvent
})
export const eventDeleted= () => ({
    type: types.eventDeleted
 })