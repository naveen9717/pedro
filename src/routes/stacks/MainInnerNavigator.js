import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InvoiceEasy } from '../../screens/InvoiceEasy';
import { InvoiceEasyComposition } from '../../screens/InvoiceEasyComposition';


const Stack = createNativeStackNavigator();

function MainInnerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InvoiceEasy" component={InvoiceEasy} />
      <Stack.Screen name="InvoiceEasyComposition" component={InvoiceEasyComposition} />
   </Stack.Navigator>
  );
}

export default MainInnerNavigator;