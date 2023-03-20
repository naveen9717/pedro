import {FREE_INTERNET} from '../actions/actionsTypes';

const initialState = {
  freeInternet: false,
};

export const freeInternetState = (state = initialState, action: any) => {
  switch (action.type) {
    case FREE_INTERNET:
      // console.log('Ask Biometry no reducer: ', action.askBiometry);
      return {
        ...state,
        freeInternet: action.freeInternet,
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
