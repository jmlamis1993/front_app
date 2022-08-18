import axios from 'axios';
export default  (history = null) => {
 const baseURL = 'http://127.0.0.1:8000/';
  
  
  const axiosInstance = axios.create({   
    baseURL: baseURL,
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json" ,     
    }
  });
  
 axiosInstance.interceptors.request.use((request) => {
    let  token = localStorage.getItem('token');
    const hasAuthHeader = request.headers.Authorization;
   
    if (token  && !hasAuthHeader) {
      setAuthHeader(request,token);
    }
       return request;
    
   });
   const setAuthHeader=(request,token) =>
    {
      
    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`;
      request.headers.common['Content-Type'] = 'application/json';
      request.headers.common['Accept'] = '*/*';
    }  
  };
  
  axiosInstance.interceptors.response.use(      
    (response) =>    
       new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 403 || error.response.status=== 401) {       
       refreshToken(error.response.request);
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );
  const refreshToken = (request) =>
  {
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   window.location = "/";   
  };

  return axiosInstance;
};
