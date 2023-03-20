import axios from 'axios';

const baseUrl = "https://gateway-apimdevaz.cpfl.com.br/bff/mob/";

const codigoInstalacao='';
class ContaServices {

    getDataConta(){
        return axios.get(`${baseUrl}/conta/conta-atual/`);
    }
    getDataContaList(){
      return axios.get(`${baseUrl}/conta/conta-atual/${codigoInstalacao}/listar-contas`);
  }
  
}

export default new ContaServices();
