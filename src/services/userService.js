
import axiosInstance from '../helpers/axios-orders';


export const userService = {
    ListUsers,   
};
async function ListUsers() { 
    return axiosInstance()
     .get('/api/user_profile_app/users');
   }