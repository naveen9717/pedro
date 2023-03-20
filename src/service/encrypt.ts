import {getData} from '../helpers/functions/utils';
import {AxiosClient} from './axios-client';
import {baseUrl, baseUrls} from './utils/urls';

type DataUserEncrypt = {
  mensage: string;
  publicKeys: string;
};

export const ApiEncrypt = {
  async postData(params: {
    Key: string;
    Instalacao: string;
    Documento: string;
  }): Promise<any> {
    // const url = `${baseUrl}/criptografia/encriptar`;
    const url = `${baseUrl.BASE}/agencia-webapi/api/chatboot/login-app-criptografia`;

    const tokenSession = await getData('tokenSession');

    const httpResponse = await AxiosClient.request({
      url,
      method: 'POST',
      body: params,
      headers: {
        tokenSessao: tokenSession,
        origem: 'WEB',
        tipoOrigem: 'WEB',
        clientId: 'agencia-virtual-cpfl-app',
        // profile: 'TeleAtendimento',
      },
    });

    return {status: httpResponse.statusCode, body: httpResponse.body};

    // switch (httpResponse.statusCode) {
    //   case 200:
    //   // return httpResponse.body;
    //   case 403:
    //     throw new AccessDeniedError();
    //   default:
    //     throw new UnexpectedError();
    // }
  },

  async getKey(): Promise<any> {
    const url = `${baseUrl.BASE}/agencia-webapi/api/criptografia`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'GET',
    }).catch(e => console.log('Get Key Error: ', e));

    return {status: httpResponse.statusCode, body: httpResponse.body};

    // switch (httpResponse.statusCode) {
    //   case 200:
    //   // return httpResponse.body;
    //   case 403:
    //     throw new AccessDeniedError();
    //   default:
    //     throw new UnexpectedError();
    // }
  },
};
