import axios from 'axios';

const baseUrl = "https://gateway-apimdevaz.cpfl.com.br/bff/mob/";

class OtherDataServices {

    getReenviarData(){
      // https://gateway-apimdevaz.cpfl.com.br/bff/mob/conta/Grafico/codigoInstalacao/123/meses/10
      return axios.get(
        `${baseUrl}conta/Conta/segunda-via-por-email`,
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

export default new OtherDataServices();
