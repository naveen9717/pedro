import axios from 'axios';

// http://127.0.0.1:3333/v1
// https://api.advoguide.staging.luby.com.br/v1'

const api = axios.create({
  baseURL: 'http://192.168.0.105:3333/v1',
});

export default api;
