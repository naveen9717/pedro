import axios, {AxiosResponse} from 'axios';

import {HttpClient, HttpRequest, HttpResponse} from '@/data/interfaces';
import {baseUrl} from './utils/urls';
// import { Storage } from './tokenStorage';
// import crashlytics from '@react-native-firebase/crashlytics';
baseUrl;
export const AxiosClient = {
  async request(httpRequest: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse<any>;

    let parsedUrl = httpRequest.url;

    if (httpRequest.params) {
      for (const [param, value] of Object.entries(httpRequest.params)) {
        parsedUrl = parsedUrl.replace(`{{${param}}}`, value?.toString());
      }
    }
    // let headers = {}
    // if (baseUrl.env === 'prod'){

    // }
    try {
      axiosResponse = await axios.request({
        url: parsedUrl,
        method: httpRequest.method,
        data: httpRequest.body,
        params: httpRequest.query,
        headers: {
          // Authorization: `Bearer ${Storage.token}`,
          ...httpRequest?.headers,
        },
      });
      if (axiosResponse.status !== 200) {
        console.log(axiosResponse.data);
      }
      // console.log('Response ==>',axiosResponse.data);
    } catch (error: any) {
      axiosResponse = error?.response ? error?.response : {status: 500};
      console.log('Error: ', error);
      // crashlytics().log(error);
    }
    //console.log('Request ==>', parsedUrl, { method: httpRequest.method, query: httpRequest.query, body: httpRequest.body, axiosResponse: axiosResponse.status, headers: { Authorization: `Bearer ${Storage.token}`, ...httpRequest?.headers }, });
    return {statusCode: axiosResponse.status, body: axiosResponse.data};
  },
};
