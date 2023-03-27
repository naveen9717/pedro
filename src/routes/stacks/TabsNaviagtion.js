import * as React from 'react';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import { useNavigate } from "react-router-dom";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Platform,
  StatusBar
} from 'react-native';
// Screens
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { InvoiceIntro } from '../../screens/InvoiceIntro';
import { InvoiceSendToHome } from '../../screens/InvoiceSendToHome';
import { AccessibilityWidget } from '../../components/AccessibilityWidget';

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
import { blue400, grey100 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { PagarInfo } from '../../screens/InvoiceSolicitedInfo';

//Screen names
const InvoiceIn = "Início";
const PaymentIn = "Serviços";
const InvoiceMin = "Ajuda";
const InvoiceSend ="Meus dados";

const Tab = createBottomTabNavigator();

function TabsContainer() {
  const navigation = useNavigation();
  const theme = useTheme();

  const {Navigator, Screen} = createDrawerNavigator();
  // const navigate = useNavigate();

  const { goBack } = useNavigation();
  // let history = useHistory();
  const dimensions = useWindowDimensions();
  const route = useRoute();

  const handleClick = () => {
    // toggleModalPix()
    console.log('routename',route.name);
    navigation.goBack()
    navigation.navigate('InvoiceHome')
  };
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

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // header: () => (
          //       <>
          //       <HeaderCustom
          //         // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
          //         hideMessage={true}
          //         onBackPress={async () => handleClick()}
          //         // onBackPress={() => navigate(-2)}
          //         backgroundColor={theme.COLORS.PRIMARY_800}
          //         isPrimaryColorDark
          //         isFocused={false}
          //         // leftOnPress={handleHome}
          //         leftAction={'back'}
                  
          //       />
          //       <AccessibilityWidget
          //       marginTop={
          //        Platform.OS === 'android' ? StatusBar.currentHeight : 0
          //       }
          //      />
          //      </>
          //     ),
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
        <Tab.Screen options={{headerShown: false}} name={InvoiceIn} component={InvoiceIntro} />
        <Tab.Screen options={{headerShown: false}} name={PaymentIn} component={InvoicePixPayment} />
        <Tab.Screen options={{headerShown: false}} name={InvoiceMin} component={InvoiceSendToHome} />
        <Tab.Screen options={{headerShown: false}} name={InvoiceSend} component={PaymentInvoice} />
        {/* <Tab.Screen name={InvoiceSend} component={PaymentInvoice} /> */}

        {/* <Tab.Screen name="InvoicePixPayment" component={InvoicePixPayment} />  */}

        {/* <Tab.Screen name="InvoiceBillPayment" component={InvoiceBillPayment} />   */}


      
        

      </Tab.Navigator>
  );
}

export default TabsContainer;