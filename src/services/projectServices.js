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

    let formData = JSON.stringify({       
        "name": "IOT",
        "status": "Termination",
        "description": "asdsasd",
        "start_date": "2022-07-31T23:37:08Z",
        "finish_date": "2022-07-31T23:37:10Z",
        "companie": 1,
        "members": [1],
        "owner": [1]
        }) 
   
    //Falta avatar
    return axiosInstance()
    .post('api/crm_app/proyect/create', formData);
  
}

async function UpdateProject(event){

    let formData = JSON.stringify({
        "name": "IOT",
        "status": "Termination",
        "description": "asdsasd",
        "start_date": "2022-07-31T23:37:08Z",
        "finish_date": "2022-07-31T23:37:10Z",
        "companie": 1,
        "members": [1],
        "owner": [1]
        })
        return axiosInstance()
       .put(`api/crm_app/proyect/list/${event.id}`, formData);
}

async function DeleteProject(id){
    
        return axiosInstance()
       .delete(`api/crm_app/proyect/list/${id}`);
}
  