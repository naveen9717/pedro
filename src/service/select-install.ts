import {LoginUrlData} from '../models/loginUrl/loginUrlData';
import {LoginUrlDataReducer} from '../models/reducer/loginUrl';
import {LOGIN_URL} from '../redux/actions/actionsTypes';
import {ApiEncrypt} from './encrypt';

export const installSelect = (
  inst: string,
  doc: string,
  dispatch: (arg0: {type: string; data: LoginUrlDataReducer}) => void,
  navigate: (arg0: never) => void,
  hideLoading: () => void,
  instLength: number,
) => {
  // console.log('Mensagem: ', `${inst}|${doc}`);
  // const openpgp = require('openpgp');

  ApiEncrypt.getKey()

    .then(async response => {
      if (response.status === 200 || response.status === 201) {
        const sData = {
          Key: response.body,
          Instalacao: inst,
          Documento: doc,
        };
        // console.log('Rsponse PGP: ', response.body);

        ApiEncrypt.postData(sData)
          .then(async r => {
            if (r.status === 200 || r.status === 201) {
              const url: LoginUrlData = {
                encrypt: r.body,
                clientId: 'agencia-virtual-cpfl-app',
                internetGratis: 'false',
                instLength: instLength,
              };

              dispatch({type: LOGIN_URL, data: url});
              navigate('routesLoggedInWV' as never);
            } else {
              console.log('Err status: ', r.status);
            }
          })
          .catch(error => {
            console.log('Error: ', error);

            console.log(error?.response?.data);
            console.log(error?.response?.status);
            console.log(error?.response?.headers);
          });
      } else {
        console.log('Response error', response);
      }
    })
    .catch(e => {
      console.log('Error: ', e);
    })
    .finally(() => hideLoading());
};
