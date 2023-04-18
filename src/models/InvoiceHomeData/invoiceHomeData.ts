export interface IObjectKeys {
  [key: string]: string | number | Boolean | undefined;
}

export type CardList = {
  CodErro: number;
  MsgErro: string;
  UsuarioEmail: string;
  UsuarioId: number;
  UsuarioNome: string;
  lstInstalacoes: CardChild[];
};

export type CardChild = IObjectKeys & {
  codigoInstalacao: number;
  valorContaAtual: number;
  mesReferencia?: number;
  dataVencimento?: string;
  statusPagamento: string;
  parcelamentoDisponivel: Boolean;
  temParcelamentoEmAberto: Boolean;
  temDebitoAutomatico: Boolean;
  temTipoDebitoNaoPermitido: Boolean;
};


