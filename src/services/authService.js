import axiosInstance from '../helpers/axios-orders';


export const authService = {
    login, 
    changePassword,  
};



async function login(username, password) { 

  let formData = JSON.stringify({       
    "username":username,
    "password":password,
    }) 

//Falta avatar
return axiosInstance()
.post('/api/user_profile_app/login', formData);
}

async function changePassword(oldPassword, newPassword) { 
  const id = JSON.parse(localStorage.getItem('user')).id;
  let formData = JSON.stringify({    
    "password":newPassword,
    }) 

//Falta avatar
return axiosInstance()
.put(`/api/user_profile_app/users/change_password/${id}`, formData);
}

