import {Platform} from 'react-native';
import theme from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function handlePixels(value: number) {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

export function formatToMoney(value: string) {
  const optionsBRL = {style: 'currency', currency: 'BRL'};
  return value.toLocaleString('pt-BR', optionsBRL);
}

export function convertToNumber(textNumber: string) {
  return textNumber.replace(/,/g, '.');
}

export function boxShadowHeaderStyle() {
  const shadowIOS = {
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 6,
    // elevation: 6,
  };

  const shadowAndroid = {
    elevation: 6,
    shadowColor: theme.COLORS.BLACK,
  };

  if (Platform.OS === 'ios') {
    return shadowIOS;
  }
  return shadowAndroid;
}
export function boxShadowStyle() {
  const shadowIOS = {
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    // elevation: 6,
  };

  const shadowAndroid = {
    elevation: 6,
    shadowColor: theme.COLORS.BLACK,
  };

  if (Platform.OS === 'ios') {
    return shadowIOS;
  }
  return shadowAndroid;
}

export function boxShadowCard() {
  const shadowIOS = {
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.8,
  };

  const shadowAndroid = {
    elevation: 6,
    shadowColor: theme.COLORS.BLACK,
  };

  if (Platform.OS === 'ios') {
    return shadowIOS;
  }
  return shadowAndroid;
}

export function STATUS_COLORS(status: any) {
  switch (status) {
    case 'Aberta':
      return '#FECD5B';
    case 'Parcelada':
      return '#F68B1F';
    case 'Vencida':
      return '#F7A7A1';
    case 'Paga':
      return '#DDE563';
    case 'Conta_mínima':
      return '#0058A0';
    default:
      return '#0058A0';
  }
}

export function STATUS_TEXT(status: any) {
  switch (status) {
    case 'Aberta':
      return '#F15E38';
    case 'Parcelada':
      return '#FFFFFF';
    case 'Vencida':
      return '#C0151B';
    case 'Paga':
      return '#01704E';
    case 'Conta_mínima':
      return '#FFFFFF';
    default:
      return '#FFFFFF';
  }
}

export function mockData() {
  const dataInvoice = [
    {
      id: 1,
      description: 'Conta de energia',
      totalInvoice: 'R$ 124.153,58',
      status: 'Aberta',
      date: '13/03/2022',
    },
    {
      id: 2,
      description: 'Parcelamento incluido em conta',
      totalInvoice: 'R$ 124.153,58',
      status: 'Parcelada',
      date: '13/03/2022',
    },
    {
      id: 3,
      description: 'Parcelamento',
      totalInvoice: 'R$ 124.153,58',
      status: 'Vencida',
      date: '13/03/2022',
    },
    {
      id: 4,
      description: 'Parcelamento',
      totalInvoice: 'R$ 124.153,58',
      status: 'Paga',
      date: '13/03/2022',
    },
    {
      id: 5,
      description: 'Conta mínima',
      totalInvoice: 'R$ 20,30',
      status: 'Conta mínima',
      date: '13/03/2022',
    },
  ];

  return dataInvoice;
}

export const getData = async (item: string) => {
  try {
    const data = await AsyncStorage.getItem(item);
    if (data !== null) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(`Error on try to get ${item}`);
  }
};

export const saveToken = async (item: string, token: any) => {
  try {
    await AsyncStorage.setItem(item, token);
  } catch (e) {
    console.log(`Error on try to set ${item}: ${e}`);
  }
};
