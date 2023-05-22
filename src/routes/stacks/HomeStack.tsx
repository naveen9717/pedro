import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Platform, StatusBar, useWindowDimensions} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import RegisterStack from './RegisterStack';
// import {SelectInstallation} from '@screens/SelectInstallation';
import { LoggedInWebView } from '../../screens/invoice/LoggedInWebView';
import { Welcome } from '../../screens/invoice/Welcome';
import { InvoiceIntro } from '../../screens/invoice/InvoiceIntro';
import { InvoiceHome } from '../../screens/invoice/InvoiceHome';
import { PaymentInvoice } from '../../screens/invoice/PaymentInvoice';
import { InvoiceSolicitedInfo } from '../../screens/invoice/InvoiceSolicitedInfo';
import { InvoiceSendedWithSuccess } from '../../screens/invoice/InvoiceSendedWithSuccess';

import { ScanScreen } from '../../screens/invoice/ScanScreen';

import { Login } from '../../screens/invoice/Login';
import { AccessibilityWidget } from '../../components/AccessibilityWidget';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { SelectInstallation } from '../../screens/invoice/SelectInstallation';
import StackRecoverPass from './RecoverStack';
import { FinishRegistration } from '../../screens/invoice/FinishRegistration';
import { HeaderCustom } from '../../components/HeaderCustom';
import { useTheme } from 'styled-components';
import TabsContainer from './TabsNaviagtion';
import { InvoiceBillPayment } from '../../screens/invoice/InvoiceBillPayment';
import { InvoiceHistoryChart } from '../../screens/invoice/InvoiceHistoryChart';
import CustomMenuStandard from '../../components/CustomMenuStandard';
const { Navigator, Screen } = createNativeStackNavigator();

export function HomeStack() {
  const {Navigator, Screen} = createDrawerNavigator();
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  return (
    <Navigator initialRouteName="loggedInWebView"
    screenOptions={{
      // headerShown: false,
      drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
      drawerStyle: {
        backgroundColor: theme.COLORS.DRAWER_STYLE,
      },

      // header: () => (
      //   <HeaderCustom
      //     // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
      //     hideMessage={true}
      //     // onBackPress={async () => goBack()}
      //     backgroundColor={theme.COLORS.PRIMARY_800}
      //     isPrimaryColorDark
      //     isFocused={false}
      //     // leftOnPress={handleHome}
      //     leftAction={'menu'}
      //   />
      // ),
    }}
    drawerContent={() => <CustomMenuStandard />}>
      {/* <Screen
        // options={{
        //   headerShown: true,
        //   header: () => <AccessibilityWidget marginTop={30} />,
        // }}
        name="welcome"
        component={Welcome}
      /> */}
      <Screen
        options={{
          headerShown: false,
          header: () => <AccessibilityWidget marginTop={30} />,
        }}
        name="TabsContainer"
        component={TabsContainer}
      />
      <Screen
        options={{
          headerShown: false,
          // header: () => <AccessibilityWidget marginTop={30} />,
        }}
        name="login"
        component={Login}
      />
     
      <Screen name="routesregister" component={RegisterStack} />
      <Screen name="routesLoggedInWV" component={LoggedInWebView} />
      <Screen name="routesrecover" component={StackRecoverPass} />
      <Screen name="InvoiceHome" component={InvoiceHome} options={{
          headerShown: false,
          // header: () => <AccessibilityWidget marginTop={30} />,
        }}/>
      <Screen name="Scan" component={ScanScreen} />
      <Screen name="InvoiceSolicitedInfo" component={InvoiceSolicitedInfo} />
      <Screen name="InvoiceSendedWithSuccess" options={{
          headerShown: false,
          // header: () => <AccessibilityWidget marginTop={30} />,
        }} component={InvoiceSendedWithSuccess} />
      <Screen name="selectInstallation" component={SelectInstallation} />
      
    </Navigator>
  );
}
