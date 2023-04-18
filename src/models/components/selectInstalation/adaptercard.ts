import {CardChild} from '../../InvoiceHomeData/invoiceHomeData';

const transformCardApi = (
  data: CardChild[],
): CardChild[] => {
  let trData = [] as CardChild[];
  if (data) {
    data.forEach(d => {
      let trInst = {} as CardChild;
      trInst.codigoinstalacao = d.codigoInstalacao;
      trInst.valorcontaatual = d.valorContaAtual;
      trInst.mesreferencia = d.mesReferencia;
      trInst.datavencimento = d.dataVencimento;
      trInst.statuspagamento = d.statusPagamento;
      trInst.parcelamentodisponivel = d.parcelamentoDisponivel;
      trInst.temparcelamentoemaberto = d.temParcelamentoEmAberto;
      trInst.temdebitoautomatico = d.temDebitoAutomatico;
      trData.push(trInst);
    });
  }
  return trData;
};

export const ICardAdapter = {
  transformCardApi,
};
