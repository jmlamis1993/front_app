import { types } from "../types/types";
import { uiOpenAlert, uiCloseModalTags } from "./ui"; 
import { tagService } from "../services/tagService";

const tagsAddNew = (event) => ({
    type: types.tagAddNew,
    payload: event
});

export const tagsStartAddNew = (event) => {
   return async(dispatch) =>{
    try {     
       const response = await tagService.AddTags(event);
       if(response.status === 201){          
         const tag = response.data;     
         dispatch(tagsAddNew(tag));
         dispatch(uiCloseModalTags());
      }     
       
    } catch (error) {
      dispatch(uiOpenAlert('error',error.response.data.error))   
    }
   }
};
export const tagsStartLoading = () =>{
   return async(dispatch) =>{
      try {
         const response = await tagService.ListTags();         
         if(response.status === 200){
            const tags = response.data;                       
            dispatch(tagsLoaded(tags));
         }       
      } catch (error) {
         dispatch(uiOpenAlert('error',error.response.data.error))  
      }
   }
}
const tagsLoaded = (event) =>({
  type:types.tagLoader,
  payload:event, 
})