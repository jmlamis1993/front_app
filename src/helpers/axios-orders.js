import axios from 'axios';
export default  (history = null) => {
 const baseURL = 'http://127.0.0.1:8000/';  

const AUTH_BASIC_HEADERS = {
    headers: {
      //Authorization: `Basic ${btoa(AUTH_CREDENTIALS)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin' :'*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',

    },
  };
  
  
  const axiosInstance = axios.create({   
    baseURL: baseURL,
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json" ,     
    }
  });
  
 /* axiosInstance.interceptors.request.use((request) => {
    let  token = localStorage.getItem('user');
    const hasAuthHeader = request.headers.Authorization;
   
    if (token  && !hasAuthHeader) {
      setAuthHeader(request);
    }
       return request;
    
   });
   const setAuthHeader=(request) =>
    {
    let  token  = JSON.parse(localStorage.getItem('user'));   
    if (token) {
      request.headers.common.Authorization = `Bearer ${token.access_token}`;
      request.headers.common['Content-Type'] = 'application/json';
      request.headers.common['Access-Control-Allow-Origin'] = '*';
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
    let  token  = JSON.parse(localStorage.getItem('user')).refresh_token;
    const params = `grant_type=refresh_token&refresh_token=${
     token
    }`;   

    return axios
      .post(REFRESH_TOKEN_URL, params, AUTH_BASIC_HEADERS)
      .then((result) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(result));
        this.reload();
        // return this.retry(request);
      })
      .catch((errorResponse) => {
        // if (this.isInvalidToken(errorResponse)) {
          localStorage.removeItem('user');
          window.location = "/";
        // }
        return errorResponse;
      });
  }*/

  return axiosInstance;
};
