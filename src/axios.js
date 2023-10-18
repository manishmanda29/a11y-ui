import axios from "axios"; 

const Axios = axios.create({
  baseURL : 'https://localhost:8081',
  headers: {
    ContentType: "application/json",
    timeout : 1000,
  },
});
axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );
export default Axios;