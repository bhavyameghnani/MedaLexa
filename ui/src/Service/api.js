import axios from 'axios'; 
const axiosService = axios.create({ baseURL: 'http://localhost:5000/', });
export default axiosService;