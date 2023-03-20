import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  authorize,
  refresh,
  AuthConfiguration,
  AuthorizeResult,
} from 'react-native-app-auth';
import moment from 'moment';
import {AuthConfig} from './AuthConfig';
import jwt_decode from 'jwt-decode';
import {DecodedB2cData} from '../../models/b2c/data';

const config: AuthConfiguration = {
  // issuer: AuthConfig.issuer,
  clientId: AuthConfig.clientId,
  redirectUrl: AuthConfig.redirectUrl,
  scopes: ['openid', AuthConfig.clientId, 'offline_access'],
  // scopes: ['openid', 'offline_access'],
  additionalParameters: {
    prompt: 'select_account',
    p: 'B2C_1A_MOBILE_SIGNUP_SIGNIN_MFA_FRONT',
  },
  serviceConfiguration: {
    authorizationEndpoint:
      AuthConfig.serviceConfiguration.authorizationEndpoint,
    tokenEndpoint: AuthConfig.serviceConfiguration.tokenEndpoint,
    // revocationEndpoint: AuthConfig.serviceConfiguration.revocationEndpoint,
  },
};
console.log('Config: ', config);
export class AuthManager {
  static signInAsync = async (): Promise<{
    result: AuthorizeResult;
    jwtDecoded: DecodedB2cData | null;
  }> => {
    // | unknown
    console.log('--------------X');
    try {
      const result = await authorize(config);
      const jwtDecoded: DecodedB2cData = jwt_decode(result.accessToken);

      // Store the access token, refresh token, and expiration time in storage
      await AsyncStorage.setItem('userToken', result.accessToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
      await AsyncStorage.setItem(
        'expireTime',
        result.accessTokenExpirationDate,
      );
      return {result: result, jwtDecoded: jwtDecoded};
    } catch (error) {
      console.log('Error B2c: ', error);
      return {result: error, jwtDecoded: null};
    }
  };

  static signOutAsync = async () => {
    // Clear storage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('expireTime');
  };

  static getAccessTokenAsync = async () => {
    const expireTime = await AsyncStorage.getItem('expireTime');

    if (expireTime !== null) {
      // Get expiration time - 5 minutes
      // If it's <= 5 minutes before expiration, then refresh
      const expire = moment(expireTime).subtract(5, 'minutes');
      const now = moment();

      if (now.isSameOrAfter(expire)) {
        // Expired, refresh
        console.log('Refreshing token');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log(`Refresh token: ${refreshToken}`);
        const result = await refresh(config, {
          refreshToken: refreshToken || '',
        });

        // Store the new access token, refresh token, and expiration time in storage
        await AsyncStorage.setItem('userToken', result.accessToken);
        await AsyncStorage.setItem('refreshToken', result.refreshToken || '');
        await AsyncStorage.setItem(
          'expireTime',
          result.accessTokenExpirationDate,
        );

        return result.accessToken;
      }

      // Not expired, just return saved access token
      const accessToken = await AsyncStorage.getItem('userToken');
      return accessToken;
    }

    return null;
  };
}
