import axios from 'axios';

const baseURL = 'https://dancefest-backend-app-inital.herokuapp.com';

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
