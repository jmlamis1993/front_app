import { types } from "../types/types";
import { projectService } from "../services/projectServices";
import { prepareProjects } from "../helpers/prepereProjects";



 const projectAddNew = (event) => ({
    type: types.projectAddNew,
    payload: event
});
export const eventStartAddNew = (event) => { 

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
        } ;  
         dispatch(projectAddNew(event));
       }     
       
    } catch (error) {
       console.log(error);  
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
         console.log(error); 
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