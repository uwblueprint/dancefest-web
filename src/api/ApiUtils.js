import axios from 'axios';
import { baseURL } from './PathConstants';

const get = (url) => {
    let config = {
        url: url,
        baseURL: baseURL,
        method: 'get'
    };

    return axios.request(config);
}

const post = (url, body) => {
    let config = {
        url: url,
        baseURL: baseURL,
        method: 'post',
        data: body
    };

    return axios.request(config);
}

export { post, get };


