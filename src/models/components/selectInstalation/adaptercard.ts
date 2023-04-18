import {CardChild} from '../../InvoiceHomeData/invoiceHomeData';

const transformCardApi = (
  data: CardChild[],
): CardChild[] => {
  let trData = [] as CardChild[];
  if (data) {
    data.forEach(d => {
      let trInst = {} as CardChild;
      trInst.Instalacao = String(d.numero);
      trInst.descBairro = d.codigoInstalacao;
      trInst.descCEP = d.valorContaAtual;
      trInst.descComplemento1 = d.mesReferencia;
      trInst.descEnderecoNumero = d.dataVencimento;
      trInst.descMunicipio = d.statusPagamento;
      trInst.descEnderecoRua = d.parcelamentoDisponivel;
      trInst.descUF = d.temParcelamentoEmAberto;
      trInst.DocumetoTitular = d.temDebitoAutomatico;
      trData.push(trInst);
    });
  }
  return trData;
};

export const ICardAdapter = {
  transformCardApi,
};
