
import axiosInstance from '../axios-orders';


export const userService = {
    ListBranch,
};

function ListBranch() { 
   return axiosInstance()
    .get('/api/crm_app/companie/list');
  }
  
