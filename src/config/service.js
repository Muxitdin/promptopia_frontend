import api from "./api.js";
import { getFromLocalStorage } from "./localstorage.js";

api.interceptors.request.use((req) => {
    const token = getFromLocalStorage("token");
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

const Service = {
    // auth
    getAuth: async () => {
        const { data } = await api.get('/api/auth');
        return data;
    },
    createNewUser: async (user) => {
        const { data } = await api.post("/api/auth/register", user);
        return data
    },
    loginUser: async (user) => {
        const { data } = await api.post("/api/auth/login", user);
        return data
    },
};

export default Service;