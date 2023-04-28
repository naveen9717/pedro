import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaymentInvoice } from '../../screens/invoice/PaymentInvoice';
import { InvoicePixPayment } from '../../screens/invoice/InvoicePixPayment';
import { InvoiceBillPayment } from '../../screens/invoice/InvoiceBillPayment';
import { InvoiceSendToHome } from '../../screens/invoice/InvoiceSendToHome';
import { InvoicePaymentInfoSuccess } from '../../screens/invoice/InvoicePaymentInfoSuccess';


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