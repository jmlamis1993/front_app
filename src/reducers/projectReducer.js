import { types } from "../types/types"


const initialState = {
    searchTerm : '',
    projects : [],
    activeEvent : null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
      case types.projectLoader:
        return{
          ...state,
          projects: payload
        }
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
            projects : []
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
