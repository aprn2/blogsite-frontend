import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

async function login(credentials) {
    console.log(credentials)
    return await axiosClient.post('/auth/login', credentials);
}

export {login};
