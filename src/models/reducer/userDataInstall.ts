import {
  UserInstData,
  UserInstEmailCpfResponse,
} from '../userDataInstall/userDataInstallData';

export type UserInstDataReducer = {
  data: UserInstData;
};

export type UserInstBffDataReducer = {
  data: UserInstEmailCpfResponse;
};
