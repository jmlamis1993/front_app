import axiosInstance from '../helpers/axios-orders';


export const branchService = {
    ListBranch,
    AddBranch,
    UpdateBranch,
    DeleteBranch
};

async function ListBranch() { 
   return axiosInstance()
    .get('/api/crm_app/companie/list');
  }

  async function AddBranch(event){
    const owner = JSON.parse(localStorage.getItem('user')).id;
    let formData = JSON.stringify({       
        "name":event.name,
        "category": event.category,
        "avatar":event.avatar,
        "address":event.address,
        "website":event.website,
        "phone_number":event.phone,
        "description":event.description,
        "tags":[1],
        "owner":owner
        }) 
   
    //Falta avatar
    return axiosInstance()
    .post('api/crm_app/companie/create', formData);
  
}

async function UpdateBranch(event){
    const owner = JSON.parse(localStorage.getItem('user')).id;
    let formData = JSON.stringify({       
        "name":event.name,
        "category":event.category,
        "avatar":event.avatar,
        "address":event.address,
        "website":event.website,
        "phone_number":event.phone,
        "description":event.description,
        "tags":[1],
        "owner":owner
        }) 
        return axiosInstance()
       .put(`api/crm_app/companie/list/${event.id}`, formData);
}

async function DeleteBranch(id){
    
        return axiosInstance()
       .delete(`api/crm_app/companie/list/${id}`);
}
  