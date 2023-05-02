import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InvoiceEasy } from '../../screens/invoice/InvoiceEasy';
import { InvoiceEasyComposition } from '../../screens/invoice/InvoiceEasyComposition';

import { Screen25 } from '../../screens/invoice/Screen25';


const Stack = createNativeStackNavigator();

function MainInnerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InvoiceEasy" component={InvoiceEasy} />
      <Stack.Screen name="Screen25" component={Screen25} />

      <Stack.Screen name="InvoiceEasyComposition" component={InvoiceEasyComposition} />
   </Stack.Navigator>
  );
}

export default MainInnerNavigator;