const axios = require('axios');

const config = {
  baseURL: process.env.BASE_URL,
  headers: {
    'Access-Control-Allow-Methods': '*'
  }
}

const _axios = axios.create(config);

const get = async url => await _axios.get(url);

const post = async (url, body) => await _axios.post(url, body);

const put = async (url, body) => await _axios.put(url, body);

module.exports = { get, post, put };