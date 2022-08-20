import axiosInstance from '../helpers/axios-orders';


export const projectService = {
    ListProject,
    AddProject,
    UpdateProject,
    DeleteProject
};

function ListProject() { 
   return axiosInstance()
    .get('/api/crm_app/proyect/list');
  }

  async function AddProject(event){

    const members = event.members.map((e) => e.id); 
    const owner = JSON.parse(localStorage.getItem('user')).id;
    console.log(owner)

    let formData = JSON.stringify({       
        "name": event.name,
        "status": event.status,
        "description": event.description,
        "start_date": event.start,
        "finish_date": event.end,
        "companie": event.companie,
        "members": members,
        "owner": owner
        }) 
   
    //Falta avatar
    return axiosInstance()
    .post('api/crm_app/proyect/create', formData);
  
}

async function UpdateProject(event){
    const members = event.members.map((e) => e.id); 
    const owner = JSON.parse(localStorage.getItem('user')).id;
    console.log(owner)
    let formData = JSON.stringify({
        "name": event.name,
        "status": event.status,
        "description": event.description,
        "start_date": event.start,
        "finish_date": event.end,
        "companie": event.companie,
        "members": members,
        "owner": owner
        })
        return axiosInstance()
       .put(`api/crm_app/proyect/list/${event.id}`, formData);
}

async function DeleteProject(id){
    
        return axiosInstance()
       .delete(`api/crm_app/proyect/list/${id}`);
}
  