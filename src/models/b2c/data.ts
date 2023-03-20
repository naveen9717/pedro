import {AuthorizeResult} from 'react-native-app-auth';

export type DecodedB2cDataReducer = DecodedB2cData & {
  accessToken: string;
};

export type DecodedB2cData = B2cJwtStandardData & ComplB2cData;

type B2cJwtStandardData = {
  iss: string;
  exp: number | null;
  nbf: number | null;
  aud: string;
  sub: string; //token b2c
  email: string;
  name: string;
  upn: string;
  tid: string;
  nonce: string;
  azp: string;
  ver: string;
  iat: number | null;
};

type ComplB2cData = {
  idp?: string;
  otherMails?: string[];
};

export type B2cAuthorizeResult = AuthorizeResult & B2cAuthorizeErrorResult;

type B2cAuthorizeErrorResult = {error: string[]};
