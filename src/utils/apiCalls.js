import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

async function login(credentials) {
    let res;
    try{
        res = await axiosClient.post('/auth/login', credentials);
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}
async function signUp(userData) {
    let res;
    try{
        res = await axiosClient.post('/user', userData);
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

function throwApproprietError(e) {
    if(e.status === 400) throw {
        name: 'Bad Data',
        message: e.response.data.message || 'data is not submitted in a valid format',
    }
    if(e.status === 401) throw {
        name: 'UnAuthorized',
        message: 'wrong credentials',
    }
    if(e.code === 'ERR_NETWORK') throw {
        name: 'Network error',
        message: 'The server is not accessible'
    }
}

export {login, signUp};
