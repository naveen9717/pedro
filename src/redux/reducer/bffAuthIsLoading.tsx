import {DecodedB2cData} from '../../models/b2c/data';
import {BFF_AUTH_IS_LOADING} from '../actions/actionsTypes';

const initialState: {isLoading: boolean} = {
  isLoading: false,
};

export const bffAuthIsloadingState = (state = initialState, action: any) => {
  switch (action.type) {
    case BFF_AUTH_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
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
