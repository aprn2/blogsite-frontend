import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

async function login(credentials) {
    let res;
    try{
        res = await axiosClient.post('/auth/login', credentials);
        return {data: res.data};
    }catch(e) {
        throwApproprietError(e);
    }
}

function throwApproprietError(e) {
    if(e.status === 400) throw {
        name: 'Bad Data',
        message: 'data is not submitted in a valid format',
    }
    if(e.status === 401) throw {
        name: 'UnAuthorized',
        message: 'wrong credentials',
    }
}

export {login};
