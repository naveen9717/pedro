import {
  InstData,
  InstDataBff,
  UserInstEmailCpfResponse,
} from '../userDataInstall/userDataInstallData';
import {UserInstBffDataReducer, UserInstDataReducer} from './userDataInstall';

const makeInitialDataInstallReducer = (): UserInstDataReducer => {
  return {
    data: {
      CodErro: null as unknown as number,
      MsgErro: null as unknown as string,
      UsuarioEmail: null as unknown as string,
      UsuarioId: null as unknown as number,
      UsuarioNome: null as unknown as string,
      lstInstalacoes: [] as InstData[],
    },
  };
};

const makeInitialDataInstallBffReducer = (): UserInstBffDataReducer => {
  return {
    data: {
      id: null as unknown as string,
      idB2c: null as unknown as string,
      nomeCompleto: null as unknown as string,
      cpf: null as unknown as string,
      email: null as unknown as string,
      emailB2C: null as unknown as string,
      cpfInvalido: null as unknown as boolean,
      migrado: null as unknown as boolean,
      politicaPrivacidade: null as unknown as boolean,
      termoAceite: null as unknown as boolean,
      termoMaioridade: null as unknown as boolean,
      termoCompartilhamento: null as unknown as boolean,
      instalacoes: [] as InstDataBff[],
      responseCode: null as unknown as number,
      trackCode: null as unknown as string,
      dateTime: null as unknown as string,
      errors: [] as string[],
    },
  };
};

export const DataInstallReducerFactory = {
  makeInitialDataInstallReducer,
  makeInitialDataInstallBffReducer,
};

// export type UserInstEmailCpfSuccess = {
//   id?: null as unknown as string,
//   idB2c?: string;
//   nomeCompleto?: string;
//   cpf?: string;
//   email?: string;
//   emailB2C?: string;
//   cpfInvalido?: boolean;
//   migrado?: boolean;
//   politicaPrivacidade: boolean;
//   termoAceite: boolean;
//   termoMaioridade: boolean;
//   termoCompartilhamento: boolean;
//   instalacoes?: InstDataBff[];
// };

// export type UserInstEmailCpfError = {
//   responseCode?: number;
//   trackCode?: string;
//   dateTime?: string;
//   errors?: string[];
// };
