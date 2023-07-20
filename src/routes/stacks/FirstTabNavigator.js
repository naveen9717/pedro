import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Screen25 } from '../../screens/invoice/Screen25';
import { InvoiceHistoryChart } from '../../screens/invoice/InvoiceHistoryChart';
import { Screen3 } from '../../screens/invoice/Screen3';
import { InvoiceHome } from '../../screens/invoice/InvoiceHome';
import { PaymentInvoice } from '../../screens/invoice/PaymentInvoice';
import { InvoiceEasy } from '../../screens/invoice/InvoiceEasy';


const Stack = createNativeStackNavigator();

function FirstTabNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="Screen25" component={Screen25} />
      <Stack.Screen name="InvoiceHome" component={InvoiceHome} />
      <Stack.Screen name="InvoiceEasy" component={InvoiceEasy} />
      <Stack.Screen name="PaymentInvoice" component={PaymentInvoice} />
      <Stack.Screen name="InvoiceHistoryChart" component={InvoiceHistoryChart} />
   </Stack.Navigator>
  );
}

export default FirstTabNavigator;