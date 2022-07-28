import { types } from "../types/types";


export const projectAddNew = (event) => ({
    type: types.projectAddNew,
    payload: event
});
export const projectSetActive = (event) => ({
    type: types.projectSetActive,
    payload: event
});
export const projectUpdate = (event) => ({
   type : types.projectUpdate,
   payload : event  
});
export const projectClearActiveEvent = () => ({
   type: types.projectClearActiveEvent
})
export const projectDelete= (id) => ({
    type : types.projectDelete,
    payload : id
     
 })
 export const projectSearch= (text) => ({
    type : types.projectSearch,
    payload : text
     
 })
 export const projectClearSearch= () => ({
   type : types.projectClearSearch,
})