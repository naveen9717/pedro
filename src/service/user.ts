import {
  UserDataCreate,
  UserDataUpdate,
  // UserInstEmailCpfError,
  UserInstEmailCpfResponse,
  // UserInstEmailCpfSuccess,
} from '../models/userDataInstall/userDataInstallData';
import {AxiosClient} from './axios-client';
import {apiAccess} from './utils/apiAccess';
import {baseUrl, baseUrls} from './utils/urls';

type DataUserEncrypt = {
  mensage: string;
  publicKeys: string;
};

const {apimKey, version} = apiAccess(baseUrl.env);

export const ApiUser = {
  async getByEmail(
    email: string,
    tokenB2c: string,
  ): Promise<{
    status: number;
    body: UserInstEmailCpfResponse;
  }> {
    const url = `${baseUrls.AUTH_BFF}/usuario/email/${email}`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'GET',

      headers: {
        Authorization: `bearer ${tokenB2c}`,
        'Ocp-Apim-Subscription-Key': apimKey,
        'api-version': version,
      },
    })
      .then(d => d)
      .catch(e => console.log('Error Get User by Email: ', e));
    // console.log('URL:', url);
    // console.log('TokenB2C:', tokenB2c);
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

  async getByCpf(
    // params: {
    cpf: string,
    tokenB2c: string,
    // Documento: string;
    // }
  ): Promise<{status: number; body: UserInstEmailCpfResponse}> {
    // const url = `${baseUrls}/criptografia/encriptar`;
    const url = `${baseUrls.AUTH_BFF}/usuario/cpf/${cpf}`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'GET',
      headers: {
        Authorization: `bearer ${tokenB2c}`,
        'Ocp-Apim-Subscription-Key': apimKey,
        'api-version': version,
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

  async getByEmailB2c(
    email: string,
    idB2c: string,
    tokenB2c: string,
  ): Promise<any> {
    const url = `${baseUrls.AUTH_BFF}/usuario/email/${email}/idB2c/${idB2c}`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'GET',
      headers: {
        Authorization: `bearer ${tokenB2c}`,
        'Ocp-Apim-Subscription-Key': apimKey,
        'api-version': version,
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

  async getToken(instalation: string, tokenB2c: string): Promise<any> {
    const url = `${baseUrls.AUTH_BFF}/legado/token-b2c/${tokenB2c}/numero-instalacao/${instalation}`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'GET',
      headers: {
        Authorization: `bearer ${tokenB2c}`,
        'Ocp-Apim-Subscription-Key': apimKey,
        'api-version': version,
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

  async updateUser(params: UserDataUpdate, tokenB2c: string): Promise<any> {
    const url = `${baseUrls.AUTH_BFF}/usuario`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'PUT',
      body: params,
      headers: {
        Authorization: `bearer ${tokenB2c}`,
        'Ocp-Apim-Subscription-Key': apimKey,
        'api-version': version,
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

  async createUser(params: UserDataCreate, tokenB2c: string): Promise<any> {
    const url = `${baseUrls.AUTH_BFF}/usuario`;
    const httpResponse = await AxiosClient.request({
      url,
      method: 'POST',
      body: params,
      headers: {
        Authorization: `bearer ${tokenB2c}`,
        'Ocp-Apim-Subscription-Key': apimKey,
        'api-version': version,
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
};
