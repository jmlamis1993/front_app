import { types } from "../types/types";
import { branchService } from "../services/branchService";
import { prepareBranch } from "../helpers/prepareBranch";



export const branchStartLoading = () =>{
   return async(dispatch) =>{
      try {
         const response = await branchService.ListBranch();        
         if(response.status === 200){
            const branch = prepareBranch(response.data);   
            console.log(branch);                     
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
export const branchAddNew = (event) => ({
    type: types.branchAddNew,
    payload: event
});
export const branchSetActive = (event) => ({
    type: types.branchSetActive,
    payload: event
});
export const branchUpdate = (event) => ({
   type : types.branchUpdate,
   payload : event  
});
export const branchClearActiveEvent = () => ({
   type: types.branchClearActiveEvent
})
export const branchDelete= (id) => ({
    type : types.branchDelete,
    payload : id
     
 })
 export const branchSearch= (text) => ({
    type : types.branchSearch,
    payload : text
     
 })
 export const branchClearSearch= () => ({
   type : types.branchClearSearch,
})