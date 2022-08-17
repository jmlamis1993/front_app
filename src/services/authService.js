import axiosInstance from '../helpers/axios-orders';


export const authService = {
    login,   
};



function login(username, password) { 

  let formData = JSON.stringify({       
    "username":username,
    "password":password,
    }) 

//Falta avatar
return axiosInstance()
.post('/api/user_profile_app/login', formData);
}


