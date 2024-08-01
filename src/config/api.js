import axios from 'axios';


const api = axios.create({
    baseURL: 'https://promptopia-back.onrender.com/',
})

export default api;