import axios from 'axios';

const baseUrl = "https://gateway-apimdevaz.cpfl.com.br/bff/mob/";

const codigoInstalacao='';
class ContaServices {

    getDataConta(){
      return axios.get(
        `${baseUrl}/conta/Conta/conta-atual/4000039777`,
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
      return axios.get(
        `${baseUrl}/conta/Conta/instalacao/4000039777/listar-contas?pagina=1`,
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
