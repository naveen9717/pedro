import axios from 'axios';
import {getAccessToken} from './localStorage';

const Http = axios.create({
  baseURL:
    'http://servicosonlineq.cpfl.com.br:7171/agencia-webapi/api/chatboot',
});

Http.interceptors.request.use(async config => {
  let isExistToken;
  await getAccessToken().then(token => (isExistToken = token));
  if (isExistToken) {
    config.headers.Authorization = `Bearer ${isExistToken}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});
export default Http;
