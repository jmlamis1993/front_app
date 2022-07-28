import { types } from "../types/types"
import data from "../views/branch/data"

const initialState = {
    searchTerm : '',
    branches : data,
    activeEvent : null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.branchSearch:
    const aux =  state.branches.filter((val) => val.name.includes(payload))
    return{
      ...state,
      searchTerm: payload,
      branches : aux
    }
  case types.branchClearSearch:
    return {
      ...state,
      searchTerm: '',
      branches : data
    }
  case types.branchSetActive:   
    return { ...state, activeEvent : payload }
  case types.branchAddNew:

    return {
        ...state,
        branches :[ 
                   payload,            
                ...state.branches,                            
          ]  
    } 
    case types.branchClearActiveEvent:
        return {
            ...state,
            activeEvent : null
        }   
        case types.branchUpdate:
            return{
               ... state,
               branches : state.branches.map(
                 e => (e.id === payload.id) ? payload : e
               )
            }
            case types.branchDelete:              
                return{
                   ... state,
                   branches : state.branches.filter(             
                     e => (e.id !== payload)                
                   ),
                   activeEvent: null 
                }         

  default:
    return state
  }
}
