import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', 
    timeout: 10000, 
    withCredentials: true, 
});

// Add this to src/services/api.ts
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
export default apiClient;