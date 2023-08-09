import axios from 'axios';

const baseUrl = "https://gateway-apimdevaz.cpfl.com.br/bff/mob/";

var vardata = {
  numeroConta: "123",
  codigoInstalacao:"123",
  emailDestinatario:"fbrfox@gmail.com"
};

class OtherDataServices {
    getReenviarData(){
      return axios.post(
        `${baseUrl}conta/Conta/segunda-via-por-email`,
        vardata,
        {
         
        headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
        'api-version': `1.0.0`, 
        },
        }
        )
     }


     putBloquearData(){
      return axios.put(
        `${baseUrl}conta/conta/conta-minima/4000039777/bloquear`,
        vardata,
        {
        headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
        'api-version': `1.0.0`, 
        },
        }
        )
     }


     getInvoiceData(){
      return axios.get(
        `${baseUrl}conta/Conta/conta-completa/911852138022/instalacao/4000039723`,
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
