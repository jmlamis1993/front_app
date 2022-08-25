
import { types } from "../types/types";
import { userService } from "../services/userService";
import { uiOpenAlert } from "./ui";


export const userStartLoading = () =>{
    return async(dispatch) =>{
       try {
          const response = await userService.ListUsers(); 
          
          if(response.status === 200){
             dispatch(userLoaded(response.data));
          }       
       } catch (error) {
         dispatch(uiOpenAlert('error',error.response.data.error))   
      }
    }
 }
 const userLoaded = (event) =>({
   type:types.userLoader,
   payload:event, 
 })
 