import {API_URL} from '../config';
import axios from 'axios';
import {_getAcessToken, _logout} from '../api/auth';

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

let client = axios.create({
  baseURL: API_URL,
  headers,
  withCredentials: false,
});

client.interceptors.request.use(async config => {
  let token = await _getAcessToken()
    .then(token => token)
    .catch(err => console.log('errrtok https axios', err));
  console.log('Token.....', token);
  if (token != undefined) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('-------config--------', config);
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (res) {
    const {response} = res;
    console.log('response.............', response);
    return Promise.reject({status: response, ...response.data});
  },
);

export default {
  get: async function (url, data) {
    return new Promise((resolve, reject) => {
      console.log('data', data);
      client
        .get(url, {params: data})
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  post: async function (url, user) {
    return new Promise((resolve, reject) => {
      client
        .post(url, user)
        .then(res => {
          console.log('This is Regis Form Res', res, user)
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  put: async function (url, data) {
    console.log("This is Api Post Url", url, data)
    return new Promise((resolve, reject) => {
      client
        .put(url, data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delete: async function (url, data) {
    return new Promise((resolve, reject) => {
      client
        .delete(url, data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetch: options => client(options),
  //
};
