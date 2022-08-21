import { types } from "../types/types";
import { projectService } from "../services/projectServices";
import { prepareProjects } from "../helpers/prepereProjects";
import { uiCloseProjectModal } from "./ui";
import { uiOpenAlert } from "./ui";




 const projectAddNew = (event) => ({
    type: types.projectAddNew,
    payload: event
});

export const projectStartAddNew = (event) => {
   return async(dispatch) =>{
    try {     
       const response = await projectService.AddProject(event);
       if(response.status === 201){          
         const evento = response.data;         
         event.id = evento.proyect.id;
         event.user = {
          _id : evento.proyect.owner.id,
          name: evento.proyect.owner.name,
          email:evento.proyect.owner.email,
        };  
         dispatch(projectAddNew(event));
         dispatch(uiCloseProjectModal());    
       }     
       
    } catch (error) {
      dispatch(uiOpenAlert('error',error.response.data.error))   
    }
   }
};
export const projectStartLoading = () =>{
   return async(dispatch) =>{
      try {
         const response = await projectService.ListProject();  
         
         if(response.status === 200){
            const projects = prepareProjects(response.data);                        
            dispatch(projectLoaded(projects));
         }       
      } catch (error) {
         dispatch(uiOpenAlert('error',error.response.data.error))  
      }
   }
}
const projectLoaded = (event) =>({
  type:types.projectLoader,
  payload:event, 
})

export const projectSetActive = (event) => ({
    type: types.projectSetActive,
    payload: event
});
 const projectUpdate = (event) => ({
   type : types.projectUpdate,
   payload : event  
});
export const projectStartUpdate = (event) =>{
   return async(dispatch) =>{
      try {
         const response = await projectService.UpdateProject(event);
         if(response.status === 200){           
           dispatch(projectUpdate(event));
           dispatch(projectClearActiveEvent()); 
           dispatch(uiCloseProjectModal()); 
         }     
         
      } catch (error) {
         dispatch(uiOpenAlert('error',error.response.data.error))  
      }
     }
}


export const projectClearActiveEvent = () => ({
   type: types.projectClearActiveEvent
})

const projectDelete= (id) => ({
    type : types.projectDelete,
    payload : id
     
 })
 export const projectStartDelete = () => {
   return async(dispatch, getState) =>{
      const {id} = getState().project.activeEvent;
      
      try {
         const response = await projectService.DeleteProject(id);
         if(response.status === 204){ 
           dispatch(projectDelete(id));
         }
         
      } catch (error) {
         dispatch(uiOpenAlert('error',error.response.data.error))  
      }
     }
}
 export const projectSearch= (text) => ({
    type : types.projectSearch,
    payload : text
     
 })
 export const projectClearSearch= () => ({
   type : types.projectClearSearch,
})