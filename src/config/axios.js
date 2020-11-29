const axios = require('axios');

const config = {
  baseURL: process.env.BASE_URL,
  headers: {
    'Access-Control-Allow-Methods': '*'
  }
}

const _axios = axios.create(config);

const get = async url => {
  const response = await _axios.get(url)
  .then(response => response)
  .catch(error => error.response);
  
  return response;
}

const post = async (url, body) => {
  const response = await _axios.post(url, body)
  .then(response => response)
  .catch(error => error.response);
  
  return response;
}

const put = async (url, body) => {
  const response = await _axios.put(url, body)
  .then(response => response)
  .catch(error => error.response);
  
  return response;
}

module.exports = { get, post, put };