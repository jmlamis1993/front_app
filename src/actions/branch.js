import { types } from "../types/types";
import { branchService } from "../services/branchService";
import { prepareBranch } from "../helpers/prepareBranch";

export const branchStartLoading = () =>{
   return async(dispatch) =>{
      try {
         const response = await branchService.ListBranch();        
         if(response.status === 200){
            const branch = prepareBranch(response.data);   
            dispatch(branchLoaded(branch));
         }       
      } catch (error) {
         console.log(error); 
      }
   }
}
const branchLoaded = (event) =>({
  type:types.branchLoader,
  payload:event, 
})
const branchAddNew = (event) => ({
    type: types.branchAddNew,
    payload: event
});
export const branchStartAddNew = (event) => {
   return async(dispatch) =>{
    try {     
       const response = await branchService.AddBranch(event);
       console.log(response);
       if(response.status === 201){          
         const e= response.data;         
         event.id = e.branch.id;
         event.avatar= e.branch.avatar;
         event.user = {
          _id : e.branch.owner.id,
          name: e.branch.owner.name,
          email:e.branch.owner.email,
        };  
         dispatch(branchAddNew(event));
         //dispatch(uiCloseProjectModal());    
       }     
       
    } catch (error) {
       console.log(error);  
    }
   }
};
export const branchSetActive = (event) => ({
    type: types.branchSetActive,
    payload: event
});
const branchUpdate = (event) => ({
   type : types.branchUpdate,
   payload : event  
});
export const branchStartUpdate = (event) =>{
   return async(dispatch) =>{
      try {
         const response = await branchService.UpdateBranch(event);
         if(response.status === 200){           
           dispatch(branchUpdate(event));
         }     
         
      } catch (error) {
         console.log(error);  
      }
     }
}
export const branchClearActiveEvent = () => ({
   type: types.branchClearActiveEvent
})
const branchDelete= (id) => ({
    type : types.branchDelete,
    payload : id
     
 })
 export const branchStartDelete = () => {
   return async(dispatch, getState) =>{
      const {id} = getState().branch.activeEvent;
      
      try {
         const response = await branchService.DeleteBranch(id);
         if(response.status === 204){ 
           dispatch(branchDelete(id));
           dispatch(branchClearActiveEvent());

         }
         
      } catch (error) {
         console.log(error);  
      }
     }
}
 export const branchSearch= (text) => ({
    type : types.branchSearch,
    payload : text
     
 })
 export const branchClearSearch= () => ({
   type : types.branchClearSearch,
})