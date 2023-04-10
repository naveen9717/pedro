import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InvoiceIntro } from '../../screens/InvoiceIntro';
import { InvoicePixPayment } from '../../screens/InvoicePixPayment';
import { Screen3 } from '../../screens/Screen3';


const Stack = createNativeStackNavigator();

function OtherInnerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InvoiceIntro" component={InvoiceIntro} />
      <Stack.Screen name="InvoicePixPayment" component={InvoicePixPayment} />
   </Stack.Navigator>
  );
}

export default OtherInnerNavigator;