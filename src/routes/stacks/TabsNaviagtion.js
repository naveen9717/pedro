import * as React from 'react';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import { useNavigate } from "react-router-dom";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { InvoiceIntro } from '../../screens/InvoiceIntro';
import { InvoiceSendToHome } from '../../screens/InvoiceSendToHome';

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
import { InvoiceEasyComposition } from '../../screens/InvoiceEasyComposition';
import { InvoiceHistoryChart } from '../../screens/InvoiceHistoryChart';

import MainNaviagtor from './MainNavigator';

//Screen names
const InvoiceIn = "Início";
const PaymentIn = "Serviços";
const InvoiceMin = "Ajuda";
const InvoiceSend ="Meus dados";
const InvoiceBill ="Meus";


const Tab = createBottomTabNavigator();

function TabsContainer() {

  return (
      <Tab.Navigator
        initialRouteName={InvoiceIn}
        options={{headerShown: false}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === InvoiceIn) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === PaymentIn) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === InvoiceMin) {
              iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
            }
            else if (rn === InvoiceSend) {
              iconName = focused ? 'people-circle-outline' : 'people-circle-outline';
            }
            else if (rn === InvoiceBill) {
              iconName = focused ? 'settings-outline' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        drawerContent={() => <CustomMenuStandard />}
         tabBarOptions={{
          activeTintColor: '#02ade1',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 14, fontWeight:"700",paddingBottom: 5,paddingTop: 5, fontSize: 10 },
          style: { backgroundColor: 'gray', elevation: 0, shadowOpacity: 0, borderTopWidth:2, borderColor:'orange' },
          indicatorStyle: {    borderTopColor: 'teal',
            borderTopWidth: 2,
            flex:1,
            left:"9%"
          },
        }}
        >
          {/* Default Screen InvoiceIntro */}
        <Tab.Screen options={{headerShown: false}} name={InvoiceIn} component={InvoiceHistoryChart} />
        <Tab.Screen options={{headerShown: false}} name={PaymentIn} component={InvoicePixPayment} />
        <Tab.Screen options={{headerShown: false}} name={InvoiceMin} component={InvoiceSendToHome} />
        <Tab.Screen options={{headerShown: false}} name={InvoiceSend} component={MainNaviagtor} />   
      </Tab.Navigator>
  );
}

export default TabsContainer;