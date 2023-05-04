import axios from 'axios';

const baseUrl = "https://gateway-apimdevaz.cpfl.com.br/bff/mob/";

class HistoryDataServices {

    getHistoryData(){
      // https://gateway-apimdevaz.cpfl.com.br/bff/mob/conta/Grafico/codigoInstalacao/123/meses/10
      return axios.get(
        `${baseUrl}conta/Grafico/codigoInstalacao/123/meses/7`,
        {
        headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
        'api-version': `1.0.0`, 
        },
        }
        )
     }


     getTabData(){
      // https://gateway-apimdevaz.cpfl.com.br/bff/mob/conta/Grafico/codigoInstalacao/123/meses/10
      return axios.get(
        `${baseUrl}conta/Conta/conta-completa/123/instalacao/123`,
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

export default new HistoryDataServices();
