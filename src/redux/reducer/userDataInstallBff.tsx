import {DataInstallReducerFactory} from '../../models/reducer/factory';
import {UserInstBffDataReducer} from '../../models/reducer/userDataInstall';

import {USER_INSTALL_BFF_ALL_DATA} from '../actions/actionsTypes';

const initialState: UserInstBffDataReducer =
  DataInstallReducerFactory.makeInitialDataInstallBffReducer();

export const userDataInstallBffState = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_INSTALL_BFF_ALL_DATA:
      console.log('ACTION DATA: ', action.data);
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};
