import {getData, saveToken} from '../helpers/functions/utils';
import {AxiosClient} from './axios-client';
import {baseUrl, baseUrls} from './utils/urls';

type DataUserEncrypt = {
  mensage: string;
  publicKeys: string;
};

export const ApiToken = {
  async getAuthToken(params: {
    Usuario: string;
    Senha: string;
    // Documento: string;
  }): Promise<any> {
    // const url = `${baseUrl}/criptografia/encriptar`;
    const url = `${baseUrl.BASE}/agencia-webapi/api/chatboot/autenticacao`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'POST',
      body: params,
      headers: {
        clientId: 'agencia-virtual-cpfl-app',
      },
    });

    await saveToken('tokenAuth', httpResponse.body);
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

  async getSessionToken(params: {
    TokenAutenticacao?: string;
    Usuario: string;
    origem: string;
    tipoOrigem: string;
    // Documento: string;
  }): Promise<any> {
    // const url = `${baseUrl}/criptografia/encriptar`;
    const url = `${baseUrl.BASE}/agencia-webapi/api/chatboot/token-sessao`;
    const tokenAuth = await getData('tokenAuth');

    params.TokenAutenticacao = tokenAuth as string;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'POST',
      body: params,
      // TokenAutenticacao: tokenAuth,
      headers: {
        // tokenSessao: tokenAuth,
        clientId: 'agencia-virtual-cpfl-app',
        // profile: 'TeleAtendimento',
      },
    });

    await saveToken('tokenSession', httpResponse.body.TokenSessao);
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
