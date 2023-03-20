import {ApiUrls} from '../constants';
import {
  IAuth,
  IUser,
  ISignIn,
  ISignInGoogle,
  ISignInFacebook,
} from '../interfaces';
import Http from '../lib/Http';

class AuthServices {
  async login(dataUser: any): Promise<ISignIn | any> {
    return await Http.post(ApiUrls.auth.login(), dataUser);
  }

  async loginGoole(dataUser: any): Promise<ISignInGoogle | any> {
    return await Http.post(ApiUrls.auth.loginGoogle(), dataUser);
  }

  async loginFacebook(dataUser: any): Promise<ISignInFacebook | any> {
    return await Http.post(ApiUrls.auth.loginFacebook(), dataUser);
  }

  async myProfile(): Promise<IAuth | any> {
    return await Http.get(ApiUrls.auth.myProfile());
  }
}

export const authServices = new AuthServices();
