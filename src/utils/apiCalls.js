import axios from "axios";

const baseURL =  'http://localhost:3000';
let accessToken = '';

const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
});

//let token = await getToken().then(data => data.accessToken);
let tokenRefetching = false;
const pending401Requests = [];

axiosClient.interceptors.response.use(
    res => res,
    async error => {
        // rejecting if not unAuthorized or the response is from a retry request
        if(error.response.status !== 401 || error.config._retry) {
            return Promise.reject(error);
        }
        error.config._retry = true;
        let pendingReq = new Promise((resolve, reject) => pending401Requests.push({
            resolve,
            reject,
            config: error.config
        }));

        if (! tokenRefetching) {
            // lock to prevent multiple refetch of token
            tokenRefetching = true;

            try{
                let token = await axiosClient.get('/token');
                accessToken = token.data.accessToken;
                for(const req of pending401Requests) {
                    try{
                        const retriedRes = await axiosClient.request(req.config);
                        req.resolve(retriedRes);
                    }catch(e) {
                        req.reject(e);
                    }
                }
            }catch(e) {
                if(! e.response) {
                    // action to logout and reject
                    // TODO
                    // navigate to login page
                }
                for(const req of pending401Requests) {
                    req.reject(error);
                }
            }
            pending401Requests.length = 0;
            tokenRefetching = false;
        }
        // on resolving the below req the retry attempt is completed :)
        return pendingReq;
    }
);

axiosClient.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    }
);

async function getToken() {
    try{
        let token = await axiosClient.get('/token').then(res=> res.data);
        return token;
    }catch(e) {
        throwApproprietError(e);
    }
}

async function login(credentials) {
    let res;
    try{
        res = await axiosClient.post('/auth/login', credentials);
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

async function userNameAvailable(userName) {
    let res;
    try{
        res = await axiosClient.get('/user/'+ userName);
        return false;
    }catch(e) {
        return true;
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

async function getPostById(id) {
    let res;
    try{
        res = await axiosClient.get(`/post/${id}`);
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

async function searchPost(keyword) {
    let res;
    try{
        res = await axiosClient.get('/post/search/', {
            params: {
                s: keyword
            }
        });
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

async function getRecentPosts() {
    let res;
    try{
        res = await axiosClient.get('/post');
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

async function getImage(id) {
    let res;
    try{
        res = await axiosClient.get(`/image/${id}`);
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

function throwApproprietError(e) {
    if(e.status === 400) {
        const e = new Error();
        e.name = 'Bad Data'
        e.message = e.response.data.message || 'data is not submitted in a valid format'
        throw e;
    }
    if(e.status === 404) {
        const e = new Error();
        e.name = 'Resource not found'
        e.message = e.response.data.message || 'requested resource is not found'
        throw e;
    }
    if(e.status === 401) {
        const e = new Error();
        e.name = 'UnAuthorized'
        e.message = 'wrong credentials'
        throw e;
    }
    if(e.code === 'ERR_NETWORK') {
        const e = new Error();
        e.name = 'Network error'
        e.message = 'The server is not accessible'
        throw e;
    }
}

export {login, signUp, userNameAvailable, getRecentPosts, getImage, searchPost, getPostById};
