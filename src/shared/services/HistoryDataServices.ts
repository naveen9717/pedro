import axios from 'axios';

const baseUrl = "https://gateway-apimdevaz.cpfl.com.br/bff/mob/";

class HistoryDataServices {

    getHistoryData(){
      // return axios.get(
      //   `${baseUrl}conta/Grafico/codigoInstalacao/123/meses/7`,
      //   {
      //   headers: {
      //   'Content-Type': 'application/json',
      //   'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
      //   'api-version': `1.0.0`, 
      //   },
      //   }
      //   )
        return axios({
          method: 'GET',
          url:  `${baseUrl}conta/Grafico/codigoInstalacao/4000039777/meses/10`,
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
            'api-version': `1.0.0`, 
            },
          validateStatus: () => true
        })
     }


     getTabData(){
      // return axios.get(
      //   `${baseUrl}conta/Conta/conta-completa/123/instalacao/123`,
      //   {
      //   headers: {
      //   'Content-Type': 'application/json',
      //   'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
      //   'api-version': `1.0.0`, 
      //   },
      //   }
      //   )
        return axios({
          method: 'GET',
          url:   `${baseUrl}conta/Conta/conta-completa/4000039777/instalacao/4000039777`,
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
            'api-version': `1.0.0`, 
            },
          validateStatus: () => true
        })
     }

     getTabBarData(){
      // return axios.get(
      //   `${baseUrl}conta/Grafico/codigoInstalacao/123/meses/2`,
      //   {
      //   headers: {
      //   'Content-Type': 'application/json',
      //   'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
      //   'api-version': `1.0.0`, 
      //   },
      //   }
      //   ) 

        return axios({
          method: 'GET',
          url:   `${baseUrl}conta/Grafico/codigoInstalacao/4000039777/meses/10`,
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
            'api-version': `1.0.0`, 
            },
          validateStatus: () => true
        })
     }

     getPieData(){
      // return axios.get(
      //   `${baseUrl}conta/taxa/codigoInstalacao/12312/10`,
      //   {
      //   headers: {
      //   'Content-Type': 'application/json',
      //   'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
      //   'api-version': `1.0.0`, 
      //   },
      //   }
      //   ) 
      return axios({
        method: 'GET',
        url:  `${baseUrl}conta/taxa/codigoInstalacao/12312/10`,
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': `91446917bfed4d1b93360901cb5913c7`, // auth token
          'api-version': `1.0.0`, 
          },
        validateStatus: () => true
      })
     }
     
}

export default new HistoryDataServices();
