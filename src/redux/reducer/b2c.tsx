import {DecodedB2cDataReducer} from '../../models/b2c/data';
import {B2C_DATA} from '../actions/actionsTypes';

const initialState: DecodedB2cDataReducer = {
  iss: '',
  exp: null,
  nbf: null,
  aud: '',
  sub: '',
  email: '',
  name: '',
  upn: '',
  tid: '',
  nonce: '',
  azp: '',
  ver: '',
  iat: null,
  idp: '',
  otherMails: [],
  accessToken: '',
};

export const b2cState = (state = initialState, action: any) => {
  switch (action.type) {
    case B2C_DATA:
      console.log('B2C no Reducer: ', action.b2cData);
      return action.b2cData;

    default:
      return state;
  }
};
