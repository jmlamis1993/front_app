import { types } from "../types/types"
const initialState = {
    tags : [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case types.tagLoader:
    return{
        ...state,
        tags: payload
      }
    case types.tagAddNew:
        return {
            ...state,
              tags :[ 
                         payload,            
                      ...state.tags,                            
                ]  
        }

  default:
    return state
  }
}
