
import { types } from "../types/types";
import { userService } from "../services/userService";

export const userStartLoading = () =>{
    return async(dispatch) =>{
       try {
          const response = await userService.ListUsers(); 
          
          if(response.status === 200){
             dispatch(userLoaded(response.data));
          }       
       } catch (error) {
          console.log(error); 
       }
    }
 }
 const userLoaded = (event) =>({
   type:types.userLoader,
   payload:event, 
 })