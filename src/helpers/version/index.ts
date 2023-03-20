import {Platform} from 'react-native';
import {baseUrl} from '../../service/utils/urls';

const vQaAnd = '3.0.14';
const vProdAnd = '3.0.19';

const vQaIos = '3.0.19'; //3.0.12
const vProdIos = '3.0.16'; //3.0.11

const getVersion = () => {
  const platform = Platform.OS;

  let v = '';

  switch (baseUrl.env) {
    case 'dev':
      v = 'v' + (platform === 'ios' ? vQaIos : vQaAnd) + '_qa';
      break;
    case 'dev-swagger':
      v = 'v' + (platform === 'ios' ? vQaIos : vQaAnd) + '_qa';
      break;
    case 'prod':
      v = 'v' + (platform === 'ios' ? vProdIos : vProdAnd);
      break;
    default:
      break;
  }

  return v;
};

export const version = getVersion();
