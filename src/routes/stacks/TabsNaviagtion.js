import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomMenuStandard from '../../components/CustomMenuStandard';
import MainNaviagtor from './MainNavigator';
import MainInnerNavigator from './MainInnerNavigator';
import OtherInnerNavigator from './OtherInnerNavigator';
import FirstTabNavigator from './FirstTabNavigator';


//Screen names
const InvoiceIn = "Início";
const PaymentIn = "Serviços";
const InvoiceMin = "Ajuda";
const InvoiceSend ="Meus dados";
const InvoiceBill ="Meus";
const Screen = "Início";



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
        <Tab.Screen options={{headerShown: false}} name={Screen} component={FirstTabNavigator} />
        <Tab.Screen options={{headerShown: false,tabBarStyle:{display:'none'}}} name={InvoiceMin} component={MainInnerNavigator} />
        <Tab.Screen options={{headerShown: false}} name={InvoiceBill} component={OtherInnerNavigator} /> 
        <Tab.Screen options={{headerShown: false}} name={InvoiceSend} component={MainNaviagtor} /> 
  
      </Tab.Navigator>
  );
}

export default TabsContainer;