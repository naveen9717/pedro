import {InstData, InstDataBff} from '../../userDataInstall/userDataInstallData';

const transformInstalationBffApi = (
  data: InstDataBff[],
  cpf: string,
): InstData[] => {
  let trData = [] as InstData[];
  if (data) {
    data.forEach(d => {
      let trInst = {} as InstData;
      trInst.Instalacao = String(d.numero);
      trInst.Situacao = d.situacao;
      trInst.descBairro = d.endereco.bairro;
      trInst.descCEP = d.endereco.cep;
      trInst.descComplemento1 = d.endereco.complemento;
      trInst.descComplemento2 = '';
      trInst.descComplemento3 = '';
      trInst.descEnderecoNumero = d.endereco.numero;
      trInst.descMunicipio = d.endereco.municipio;
      trInst.descEnderecoRua = d.endereco.logradouro;
      trInst.descUF = d.endereco.uf;
      trInst.DocumetoTitular = cpf;
      trData.push(trInst);
    });
  }
  return trData;
};

export const InstalationAdapter = {
  transformInstalationBffApi,
};
