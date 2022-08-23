import axiosInstance from '../helpers/axios-orders';


export const tagService = {
    ListTags,
    AddTags,   
};

async function ListTags() { 
   return axiosInstance()
    .get('/api/crm_app/tag/list');
  }

  async function AddTags(event){
    let formData = JSON.stringify({       
        "name": event.name,
        }) 
    return axiosInstance()
    .post('/api/crm_app/tag/create', formData);
  
}