import { types } from "../types/types";


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