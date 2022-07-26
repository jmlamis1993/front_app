import { types } from "../types/types"
import data from "../views/project/data"

const initialState = {
    searchTerm : '',
    projects : data,
    activeEvent : null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.projectSearch:
          const aux =  state.projects.filter((val) => val.name.includes(payload))
          return{
            ...state,
            searchTerm: payload,
            projects : aux
          }
        case types.projectClearSearch:
          return {
            ...state,
            searchTerm: '',
            projects : data
          }
        case types.projectSetActive:   
          return { ...state, activeEvent : payload }
        case types.projectAddNew:
      
          return {
              ...state,
              projects :[ 
                         payload,            
                      ...state.projects,                            
                ]  
          } 
          case types.projectClearActiveEvent:
              return {
                  ...state,
                  activeEvent : null
              }   
              case types.projectUpdate:
                  return{
                     ... state,
                     projects : state.projects.map(
                       e => (e.id === payload.id) ? payload : e
                     )
                  }
                  case types.projectDelete:              
                      return{
                         ... state,
                         projects : state.projects.filter(             
                           e => (e.id !== payload)                
                         ),
                         activeEvent: null 
                      }         
      
        default:
          return state
        }
}
