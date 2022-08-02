import axiosInstance from '../helpers/axios-orders';


export const branchService = {
    ListBranch,
    AddBranch,
    UpdateBranch,
    DeleteBranch
};

function ListBranch() { 
   return axiosInstance()
    .get('/api/crm_app/companie/list');
  }

  async function AddBranch(event){
    console.log(event);

    let formData = JSON.stringify({       
        "name": event.name,
        "status": event.status,
        "description": event.description,
        "start_date": event.start,
        "finish_date": event.end,
        "companie": 1,
        "members": [1],
        "owner": 1
        }) 
   
    //Falta avatar
    return axiosInstance()
    .post('api/crm_app/proyect/create', formData);
  
}

async function UpdateBranch(event){
    let formData = JSON.stringify({
        "name": event.name,
        "status": event.status,
        "description": event.description,
        "start_date": event.start,
        "finish_date": event.end,
        "companie": 1,
        "members": [1],
        "owner": 1
        })
        return axiosInstance()
       .put(`api/crm_app/proyect/list/${event.id}`, formData);
}

async function DeleteBranch(id){
    
        return axiosInstance()
       .delete(`api/crm_app/proyect/list/${id}`);
}
  