import * as React from 'react';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import { useNavigate } from "react-router-dom";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Platform,
  StatusBar
} from 'react-native';
// Screens
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { InvoiceIntro } from '../../screens/InvoiceIntro';
import { InvoiceSendToHome } from '../../screens/InvoiceSendToHome';
import { AccessibilityWidget } from '../../components/AccessibilityWidget';

import { PaymentInvoice } from '../../screens/PaymentInvoice';
import {HeaderCustom} from '../../components/HeaderCustom';
import {useWindowDimensions} from 'react-native';
import CustomMenuStandard from '../../components/CustomMenuStandard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { InvoicePixPayment } from '../../screens/InvoicePixPayment';
import { InvoiceBillPayment } from '../../screens/InvoiceBillPayment';
import { InvoiceSendedWithSuccess } from '../../screens/InvoiceSendedWithSuccess';
import { InvoiceMinPayment } from '../../screens/InvoiceMinPayment';
import { TwoSevenScreen } from '../../screens/TwoSevenScreen';
import { InvoiceHome } from '../../screens/InvoiceHome';
import { blue400, grey100 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { PagarInfo } from '../../screens/InvoiceSolicitedInfo';

//Screen names
const InvoiceIn = "Início";
const PaymentIn = "Serviços";
const InvoiceMin = "Ajuda";
const InvoiceSend ="Meus dados";
const InvoiceBill ="Meus";


const Stack = createNativeStackNavigator();

function MainNaviagtor() {
  const navigation = useNavigation();
  const theme = useTheme();

  const {Navigator, Screen} = createDrawerNavigator();
  // const navigate = useNavigate();

  const { goBack } = useNavigation();
  // let history = useHistory();
  const dimensions = useWindowDimensions();
  const route = useRoute();

  const handleClick = () => {
    // toggleModalPix()
    console.log('routename',route.name);
    navigation.goBack()
    navigation.navigate('InvoiceHome')
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentInvoice" component={PaymentInvoice} />
      <Stack.Screen name="InvoiceBillPayment" component={InvoiceBillPayment} />
   </Stack.Navigator>
  );
}

export default MainNaviagtor;