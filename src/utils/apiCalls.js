import axios from "axios";
import { isSheduledLogout, userCxtStore } from "./store";

const baseURL =  'http://localhost:3000';
let accessToken = '';

if(isSheduledLogout.get()) {
    try {
        await logout();
        isSheduledLogout.set(false);
    }catch(e) {
    }
}

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
                if(e.response.status === 401) {
                    // action to logout
                    userCxtStore.set(undefined);
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



async function login(credentials) {
    let res;
    try{
        res = await axiosClient.post('/auth/login', credentials);
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

export async function logout() {
    let res;
    try{
        res = await axiosClient.delete('/auth/logout');
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

export async function createPost(post) {
    let res;
    try{
        res = await axiosClient.post('/post', post)
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

export async function likePost(postId) {
    let res;
    try{
        return res = await axiosClient.post('like', {} , {
            params: {
                postId: postId
            }
        })
    }catch(e) {
        throwApproprietError(e);
    }
}

export async function removeLikePost(postId) {
    let res;
    try{
        return res = await axiosClient.delete('like', {
            params: {
                postId: postId
            }
        })
    }catch(e) {
        throwApproprietError(e);
    }
}

export async function getLikedPosts() {
    let res;
    try{
        res = await axiosClient.get('like');
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

export async function isLiked(postId) {
    let res;
    try{
        res = await axiosClient.get('like', {
            params: {
                postId: postId
            }
        })
        console.log(res.data)
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

export async function createImage(form) { // here image is send via multipart/form
    let res;
    try{
        res = await axiosClient.post('/image', form)
        return res.data;
    }catch(e) {
        throwApproprietError(e);
    }
}

export async function getImage(filename) {
    try{
        const response = await axiosClient.get(`http://localhost:3000/image/${filename}`, {
            responseType: 'blob',
        });
        return URL.createObjectURL(response.data);
    }catch(e) {
        throwApproprietError(e);
    }
};


export async function editPost(id, postContent) {
    let res;
    try{
        res = await axiosClient.patch(`/post/${id}`, postContent);
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

function throwApproprietError(error) {
    if(error.status === 400) {
        const e = new Error();
        e.name = 'Bad Data'
        e.message = error?.response?.data?.message ?? 'data is not submitted in a valid format'
        throw e;
    }
    if(error.status === 404) {
        const e = new Error();
        e.name = 'Resource not found'
        e.message = error?.response?.data?.message ?? 'requested resource is not found'
        throw e;
    }
    if(error.status === 401) {
        const e = new Error();
        e.name = 'UnAuthorized'
        e.message = error?.response?.data?.message ?? 'wrong credentials'
        throw e;
    }
    if(error.code === 'ERR_NETWORK') {
        const e = new Error();
        e.name = 'Network error'
        e.message = 'The server is not accessible'
        throw e;
    }
}

export {login, signUp, userNameAvailable, getRecentPosts, searchPost, getPostById};
