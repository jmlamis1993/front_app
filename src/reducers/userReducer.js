import { types } from "../types/types"

const initialState = {
    users:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case types.userLoader:
    return{
        ...state,
        users: payload
      }  

  default:
    return state
  }
}

