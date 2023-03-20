// import { DataInstallReducerFactory } from '../../models/reducer/factory';

import {LoginUrlDataReducer} from '../../models/reducer/loginUrl';
import {LOGIN_URL} from '../actions/actionsTypes';

const initialState: LoginUrlDataReducer = {
  encrypt: null as unknown as string,
  clientId: null as unknown as string,
  internetGratis: null as unknown as string,
};

export const loginUrlState = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_URL:
      return action.data;

    default:
      return state;
  }
};
