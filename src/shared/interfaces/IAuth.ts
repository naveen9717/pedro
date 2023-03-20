export interface IAuth {
  UsuarioId: number;
  UsuarioNome: string;
  UsuarioEmail: string;
  CodErro: number;
  MsgErro: null;
  lstInstalacoes: [
    {
      Instalacao: string;
      IdEmpresa: number;
      descUF: string;
      descMunicipio: string;
      descEnderecoRua: string;
      descEnderecoNumero: string;
      descBairro: string;
      descCEP: null;
      descComplemento1: string;
      descComplemento2: string;
      descComplemento3: string;
    },
  ];
}

export interface ISignIn {
  UsuarioEmail: string;
  UsuarioSenha: string;
  UsuarioProvider: string;
}

export interface ISignInGoogle {
  UsuarioGoogle: string;
  UsuarioProvider: string;
}

export interface ISignInFacebook {
  UsuarioFacebook: string;
  UsuarioProvider: string;
}
