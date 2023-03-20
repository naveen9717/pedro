// Provided by Erick Holanda - Web:
// $client_id = "0418f7dc-f596-48f1-882c-b84580d8b3d2";
// https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT&client_id=$CLIENT_ID&nonce=defaultNonce&redirect_uri=https://dev.cpfl.com.br/b2c-auth/receive-token&scope=$CLIENT_ID%20offline_access&response_type=code&prompt=login&response_mode=query

export const config = {
  issuer:
    // '',
    // 'https://devrodrigosouzab2c.b2clogin.com/d832f44f-4864-4217-add3-66dae8ad92e0/v2.0/',
    'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/oauth2/v2.0/authorize',
  appId: 'd3739b4b-1974-4bd0-8552-6f0598f1b150',
  // appId: '0418f7dc-f596-48f1-882c-b84580d8b3d2', // Provided by Erick Holanda - Web
  // redirectUrl: 'https://jwt.ms/', // old
  redirectUrl:
    'msauth://br.com.cpfl.android.autoatendimento/VzSiQcXRmi2kyjzcA%2BmYLEtbGVs%3D', // Provided by Emerson
  authorizationEndpoint:
    'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/oauth2/v2.0/authorize',
  // 'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN_MFA_FRONT', // // Provided by Erick Holanda - Web
  tokenEndpoint:
    'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/b2c_1a_mobile_signup_signin_mfa_front/oauth2/v2.0/token',
  // 'https://devrodrigosouzab2c.b2clogin.com/devrodrigosouzab2c.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_signupsignin1',
  // 'https://cpflb2chomolog.b2clogin.com/cpflb2chomolog.onmicrosoft.com/b2c_1a_signup_signin_mfa_front/oauth2/v2.0/token', // Provided by Erick Holanda - Web
  // 'https://login.microsoftonline.com/d8bfbca6-9739-4694-8fff-9591356df486/oauth2/v2.0/token', // Provided by Emerson
  revocationEndpoint:
    // 'https://devrodrigosouzab2c.b2clogin.com/devrodrigosouzab2c.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1_signupsignin1',
    '',
};

export const AuthConfig = {
  issuer: config.issuer,
  clientId: config.appId,
  redirectUrl: config.redirectUrl,
  serviceConfiguration: {
    authorizationEndpoint: config.authorizationEndpoint,
    tokenEndpoint: config.tokenEndpoint,
    revocationEndpoint: config.revocationEndpoint,
  },
};
