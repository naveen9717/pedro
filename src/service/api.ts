// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   USER_INSTALL_ALL_DATA,
//   USER_INSTALL_IS_LOADING,
// } from '../redux/actions/actionsTypes';
// import {userDataInstallState} from '../redux/reducer/userDataInstall';
// import {store} from '../redux/store';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {baseUrls} from './utils/urls';

export const api = axios.create({
  baseURL: baseUrls.AUTH,
});

api.interceptors.request.use((config: AxiosRequestConfig) => config);

api.interceptors.response.use(
  (response: any) => response,
  (err: {message: string}) => {
    err.message = handleError(err);
    return Promise.reject(err);
  },
);

function handleError(err: AxiosError) {
  let message = 'Erro desconhecido, tente novamente em breve.';
  if (!err.response) {
    message =
      'Não foi possivel comunicar com o servidor, tente novamente em alguns minutos.';
  } else if (err.response.data.error) {
    ({message} = err.response.data.error);
  } else if (Array.isArray(err.response.data)) {
    ({message} = err.response.data[0]);
  } else if (err.response.data) {
    ({message} = err.response.data);
  }
  return message;
}
