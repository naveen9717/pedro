import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaymentInvoice } from '../../screens/PaymentInvoice';
import { InvoicePixPayment } from '../../screens/InvoicePixPayment';
import { InvoiceBillPayment } from '../../screens/InvoiceBillPayment';
import { InvoiceSendToHome } from '../../screens/InvoiceSendToHome';
import { InvoicePaymentInfoSuccess } from '../../screens/InvoicePaymentInfoSuccess';


const Stack = createNativeStackNavigator();

function MainNaviagtor() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentInvoice" component={PaymentInvoice} />
      <Stack.Screen name="InvoiceBillPayment" component={InvoiceBillPayment} />
      <Stack.Screen name="InvoicePixPayment" component={InvoicePixPayment} />
      <Stack.Screen name="InvoiceSendToHome" component={InvoiceSendToHome} />
      <Stack.Screen name="InvoicePaymentInfoSuccess" component={InvoicePaymentInfoSuccess} />

   </Stack.Navigator>
  );
}

export default MainNaviagtor;