import {DataInstallReducerFactory} from '../../models/reducer/factory';
import {UserInstDataReducer} from '../../models/reducer/userDataInstall';
import {USER_INSTALL_ALL_DATA} from '../actions/actionsTypes';

const initialState: UserInstDataReducer =
  DataInstallReducerFactory.makeInitialDataInstallReducer();

export const userDataInstallState = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_INSTALL_ALL_DATA:
      return {
        ...state,
        data: action.data,
      };

    // case USER_INSTALL_IS_LOADING:
    //   return {
    //     ...state,
    //     isLoading: action.isLoading,
    //   };

    default:
      return state;
  }
};
