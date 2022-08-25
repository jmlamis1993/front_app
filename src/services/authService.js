import axiosInstance from '../helpers/axios-orders';


export const authService = {
    login, 
    logout,
    changePassword,
    updateProfile,  
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
async function logout() { 
return axiosInstance()
.get('/api/user_profile_app/logout');
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

async function updateProfile(user) { 
  const id = JSON.parse(localStorage.getItem('user')).id;
  console.log(user);
  let formData = JSON.stringify({       
    'email': user.email,
    'name': user.name,
    'first_name': user.first_name,
    'last_name': user.last_name,
    'role': user.role,
    'address': user.address,
    'avatar': null,
    'phone_number': user.phone_number
    }) 
    console.log(formData);
return axiosInstance()
.put(`/api/user_profile_app/users/${id}`, formData);
}

