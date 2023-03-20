export interface IObjectKeys {
  [key: string]: string | number | undefined;
}

export type UserInstData = {
  CodErro: number;
  MsgErro: string;
  UsuarioEmail: string;
  UsuarioId: number;
  UsuarioNome: string;
  lstInstalacoes: InstData[];
};

export type InstData = IObjectKeys & {
  DocumetoTitular: string;
  Instalacao: string;
  IdEmpresa?: number;
  descUF?: string;
  descMunicipio: string;
  descEnderecoRua: string;
  descEnderecoNumero: string;
  descBairro: string;
  descCEP: string;
  descComplemento1: string;
  descComplemento2: string;
  descComplemento3: string;
  Situacao: string;
};

export type InstDataBff = IObjectKeys & {
  nome: string; // apelido
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
  numero: number;
  situacao: string;
};

export type UserInstEmailCpfResponse = UserInstEmailCpfSuccess &
  UserBffGenericError;

export type UserInstEmailCpfSuccess = {
  id?: string;
  idB2c?: string;
  nomeCompleto?: string;
  cpf?: string;
  email?: string;
  emailB2C?: string;
  cpfInvalido?: boolean;
  migrado?: boolean;
  politicaPrivacidade: boolean;
  termoAceite: boolean;
  termoMaioridade: boolean;
  termoCompartilhamento: boolean;
  numeroCelular?: string;
  dataNascimento?: string;
  documentoIdentificacao?: UserDocEmailCpfSuccess;
  instalacoes?: InstDataBff[];
};

export type UserBffGenericError = {
  responseCode?: number;
  trackCode?: string;
  dateTime?: string;
  errors?: string[];
};

export type UserInstEmailB2cError = {
  type?: string; // UserInstEmailB2cErrorB2c
  title?: string;
  status?: number;
  traceId?: string;
  errors:
    | {
        idB2c: string[];
      }
    | string[]; // UserInstEmailB2cEmailError
  responseCode?: number;
  trackCode?: string;
  dateTime?: string;
};

export type UserInstEmailB2cErrorB2c = {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: {
    idB2c: string[];
  };
};

export type UserInstEmailB2cEmailError = {
  responseCode: number;
  trackCode: string;
  dateTime: string;
  errors: string[];
};

export type UserInstEmailB2cSuccess = {
  id: string;
  idB2c: string;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  numeroCelular: string;
  dataValidacao: string;
  documento: {
    ehValido: boolean;
    nome: string;
    numero: string;
    orgaoExpedidor: string;
    orgaoExpedidorUF: string;
  };
};
export type UserDataCreateUpdateSend = UserDataUpdate;

export type UserDataUpdate = UserDataCreate & {id?: string};

export type UserDataCreate = {
  idB2c: string;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  emailB2C: string;
  numeroCelular: string;
  providerAutenticacao: string;
  apelido: string;
  numeroTelefone: string;
  documentoIdentificacao: {
    tipoDocumentoIdentificacaoId: string;
    numero: string;
    orgaoExpedidor: string;
    ufOrgaoExpedidor: string;
  };
  termos: {
    versaoTermoAceite: number;
    versaoPoliticaPrivacidade: number;
    versaoTermoMaioridade: number;
    versaoTermoCompartilhamento: number;
    ip: string;
  };
};
export type UserDoc = {
  ehValido: boolean;
  nome: string;
  numero: string;
  orgaoExpedidor: string;
  orgaoExpedidorUF: string;
};

export type UserDocEmailCpfSuccess = {
  id: string;
  numero: string;
  orgaoExpedidor: string;
  ufOrgaoExpedidor: string;
  tipoDocumento: string;
};

type ErrorIdB2c = {
  idB2c: string[];
};
