
import { types } from "../types/types";
import { authService } from "../services/authService";
import { history } from '../helpers/history';

export const startlogin = (username, password) => {
    return async (dispatch) => {
      try {
        const response = await authService.login(username, password);
        if (response.status === 201) {  
           localStorage.setItem('user', JSON.stringify(response.data.user));  
           localStorage.setItem('token', response.data.token.key);        
           dispatch(authLoggin(response.data.user));
           history.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  const authLoggin = (event) => ({
    type: types.authLoggin,
    payload: event,
  });

 


