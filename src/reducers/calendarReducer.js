import { typographyClasses } from "@mui/material";
import moment from "moment";
import { types } from "../types/types";

/*{
  id:1,
  task_name: 'Cumpleaños del Jefe',
  project: '',
  time_spent: 0,   
  est_time: 0,  
  description: '',  
  tags: '',  
  priority: '',  
  type: '',      
  status: '',         
  start: moment().toDate(),         
  end: moment().add(2,'hours').toDate(),      
user:{
  _id : 1,
  name: 'Fernando',
}
 }*/

const initialState = {
    events: [],
    activeEvent : null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case types.eventSetActive:
    return { ...state,  activeEvent : payload}
    
    case types.eventAddNew:
    return {
        ...state,
        events:[            
                ...state.events,
                 payload            
          ]  
    } 
    case types.eventClearActiveEvent:
    return {
        ...state,
        activeEvent : null
    } 
    case types.eventUpdate:
        return{
           ... state,
           events : state.events.map(
             e => (e.id === payload.id) ? payload : e
           )
        }    
    case types.eventDeleted:
          return{
             ... state,
             events : state.events.filter(             
               e => (e.id !== state.activeEvent.id) 
             ),
             activeEvent: null 
          }  
    case types.eventLoader:
      return{
        ...state,
        events: [...payload]
      }

  default:
    return state
  }
}

 


