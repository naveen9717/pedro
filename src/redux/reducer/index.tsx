import {combineReducers} from 'redux';
import {b2cState} from './b2c';
import {bffAuthIsloadingState} from './bffAuthIsLoading';
import {freeInternetState} from './freeInternet';

import {loginUrlState} from './loginUrl';
import {regTypeState} from './registrationType';
import {userDataInstallState} from './userDataInstall';
import {userDataInstallBffState} from './userDataInstallBff';

export const Reducers = combineReducers({
  UserDataInstall: userDataInstallState,
  LoginUrl: loginUrlState,
  AskBiometry: freeInternetState,
  B2C: b2cState,
  RegistrationType: regTypeState,
  BffAuthIsLoading: bffAuthIsloadingState,
  UserBffDataInstall: userDataInstallBffState,
});
export type RootState = ReturnType<typeof Reducers>;
