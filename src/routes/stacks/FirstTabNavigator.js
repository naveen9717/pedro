import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InvoiceIntro } from '../../screens/InvoiceIntro';
import { InvoiceHistoryChart } from '../../screens/InvoiceHistoryChart';
import { Screen3 } from '../../screens/Screen3';
import { Screen18 } from '../../screens/Screen18';


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