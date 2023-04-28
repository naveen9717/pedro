import axios from 'axios';

const baseUrl = "https://gateway-apimdevaz.cpfl.com.br/bff/mob/";

const codigoInstalacao='';
class ContaServices {

    getDataConta(){
      // return axios.get(`${baseUrl}/conta/conta-atual/123/listar-contas`);
      return axios.get(
        `${baseUrl}/conta/conta/conta-atual/123`,
        {
        headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
        'api-version': `1.0.0`, 
        },
        }
        )
     }
    getDataContaList(){
      // return axios.get(`${baseUrl}/conta/conta-atual/123/listar-contas`);
      return axios.get(
        `${baseUrl}/conta/Conta/instalacao/123/listar-contas`,
        {
        headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
        'api-version': `1.0.0`, 
        },
        }
        )
     }
  
}

export default new ContaServices();
