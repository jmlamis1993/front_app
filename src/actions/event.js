import { types } from "../types/types";
import { calendarService } from "../services/calendarServices";
import { prepareEvent } from "../helpers/prepareEvent";


export const eventStartAddNew = (event) => { 

     return async(dispatch) =>{
      try {
         const response = await calendarService.AddEvent(event);
         if(response.status === 201){          
           const evento = response.data;
           event.id = evento.task.id;
           event.user = {
            _id : evento.task.owner.id,
            name: evento.task.owner.email,
          } ;  
           dispatch(eventAddNew(event));
         }     
         
      } catch (error) {
         console.log(error);  
      }
     }
};

export const eventStartLoading = () =>{

   return async(dispatch) =>{
      try {
         const response = await calendarService.ListEvents();  
         if(response.status === 200){
            const eventos = prepareEvent(response.data);            
            dispatch(eventLoaded(eventos));
         }           
         
      } catch (error) {
         
      }
   }
}
const eventLoaded = (event) =>({
  type:types.eventLoader,
  payload:event, 
})

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});
export const eventStartUpdate = (event) =>{
   return async(dispatch) =>{
      try {
         const response = await calendarService.UpdateEvent(event);
         if(response.status === 200){       
           
           dispatch(eventUpdated(event));
         }     
         
      } catch (error) {
         console.log(error);  
      }
     }
}
const eventUpdated = (event) => ({
   type : types.eventUpdate,
   payload : event  
});
export const eventClearActiveEvent = () => ({
   type: types.eventClearActiveEvent
})
export const eventDeleted= () => ({
    type: types.eventDeleted
 })