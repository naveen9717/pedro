import { AuthConfiguration } from 'react-native-app-auth';

export const config = {
  appId: 'cc852e11-4c72-46a6-b20e-b859e897714d',
  appScopes: [
    'openid',
    'offline_access',
    // 'profile',
    // 'User.Read',
    // 'MailboxSettings.Read',
    // 'Calendars.ReadWrite',
  ],
  authorizationEndpoint:
    'https://login.microsoftonline.com/46556455-c885-4111-90f9-f8c565eacd53/oauth2/v2.0/authorize',
  tokenEndpoint:
    'https://login.microsoftonline.com/46556455-c885-4111-90f9-f8c565eacd53/oauth2/v2.0/token',
  // revocationEndpoint:
  //   'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1a_signup_signin_mfa_front',
};

export const AuthConfig: AuthConfiguration = {
  // issuer: 'https://login.microsoftonline.com/46556455-c885-4111-90f9-f8c565eacd53/oauth2/v2.0/',
  clientId: config.appId,
  redirectUrl: 'customScheme://chiaradia-b2c',
  scopes: ['openid', config.appId, 'offline_access'],
  // additionalParameters: { prompt: 'login' },
  serviceConfiguration: {
    authorizationEndpoint: config.authorizationEndpoint,
    tokenEndpoint: config.tokenEndpoint,
    // revocationEndpoint: config.revocationEndpoint,
  },
};

// export const config = {
//   appId: '8b46fbef-388c-4f25-8a5b-1fd3eb7c6696',
//   appScopes: [
//     'openid',
//     'offline_access',
//     // 'profile',
//     // 'User.Read',
//     // 'MailboxSettings.Read',
//     // 'Calendars.ReadWrite',
//   ],
//   authorizationEndpoint:
//     'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1a_signup_signin_mfa_front',
//   tokenEndpoint:
//     'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1a_signup_signin_mfa_front',
//   revocationEndpoint:
//     'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1a_signup_signin_mfa_front',
// };

// export const AuthConfig: AuthConfiguration = {
//   issuer: 'https://cpflb2chomolog.b2clogin.com/d8bfbca6-9739-4694-8fff-9591356df486/v2.0/',
//   clientId: config.appId,
//   redirectUrl: 'https://www.authmobile.com.br',
//   scopes: ['openid', config.appId, 'offline_access'],
//   additionalParameters: { prompt: 'select_account' },
//   serviceConfiguration: {
//     authorizationEndpoint: config.authorizationEndpoint,
//     tokenEndpoint: config.tokenEndpoint,
//     revocationEndpoint: config.revocationEndpoint,
//   },
// };
