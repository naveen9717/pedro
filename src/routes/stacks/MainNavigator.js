import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaymentInvoice } from '../../screens/PaymentInvoice';

import { InvoiceBillPayment } from '../../screens/InvoiceBillPayment';
import { InvoiceSendToHome } from '../../screens/InvoiceSendToHome';


const Stack = createNativeStackNavigator();

function MainNaviagtor() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentInvoice" component={PaymentInvoice} />
      <Stack.Screen name="InvoiceBillPayment" component={InvoiceBillPayment} />
      <Stack.Screen name="InvoiceSendToHome" component={InvoiceSendToHome} />
   </Stack.Navigator>
  );
}

export default MainNaviagtor;