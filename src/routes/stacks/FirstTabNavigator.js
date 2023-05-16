import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InvoiceIntro } from '../../screens/invoice/InvoiceIntro';
import { InvoiceHistoryChart } from '../../screens/invoice/InvoiceHistoryChart';
import { Screen3 } from '../../screens/invoice/Screen3';
import { InvoiceBillPayment } from '../../screens/invoice/InvoiceBillPayment';


const Stack = createNativeStackNavigator();

function FirstTabNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="InvoiceHistoryChart" component={InvoiceHistoryChart} />
   </Stack.Navigator>
  );
}

export default FirstTabNavigator;