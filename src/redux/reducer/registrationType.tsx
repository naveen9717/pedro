import {RegistrationTypeReducer} from '../../models/reducer/registrationType';
import {REGISTRATION_TYPE} from '../actions/actionsTypes';

const initialState: RegistrationTypeReducer = {
  regType: null,
};

export const regTypeState = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTRATION_TYPE:
      return {
        ...state,
        regType: action.regType,
      };
    default:
      return state;
  }
};
