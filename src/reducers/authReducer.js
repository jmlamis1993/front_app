import { types } from "../types/types"

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.authLoggin:
    return {
      loggedIn: true,
      user: payload
      };
      case types.authLogout:
        return {
          loggedIn: false,
          user: {}
          };


    
  default:
    return state
  }
}
