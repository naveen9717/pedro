import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterStack from './RegisterStack';
// import {SelectInstallation} from '@screens/SelectInstallation';
import { LoggedInWebView } from '../../screens/LoggedInWebView';
import { Welcome } from '../../screens/Welcome';
import { InvoiceIntro } from '../../screens/InvoiceIntro';
import { InvoiceHome } from '../../screens/InvoiceHome';
import { PaymentInvoice } from '../../screens/PaymentInvoice';
import { InvoiceSolicitedInfo } from '../../screens/InvoiceSolicitedInfo';
import { InvoiceSendedWithSuccess } from '../../screens/InvoiceSendedWithSuccess';

import { ScanScreen } from '../../screens/ScanScreen';

import { Login } from '../../screens/Login';
import { AccessibilityWidget } from '../../components/AccessibilityWidget';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { SelectInstallation } from '../../screens/SelectInstallation';
import StackRecoverPass from './RecoverStack';
import { FinishRegistration } from '../../screens/FinishRegistration';
import { HeaderCustom } from '../../components/HeaderCustom';
import { useTheme } from 'styled-components';
import TabsContainer from './TabsNaviagtion';
import { InvoiceBillPayment } from '../../screens/InvoiceBillPayment';
import { InvoiceHistoryChart } from '../../screens/InvoiceHistoryChart';

const { Navigator, Screen } = createNativeStackNavigator();

export function HomeStack() {
  const theme = useTheme();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
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
      <Screen name="InvoiceHome" component={InvoiceHome} />
      <Screen name="Scan" component={ScanScreen} />
      <Screen name="InvoiceSolicitedInfo" component={InvoiceSolicitedInfo} />
      <Screen name="InvoiceSendedWithSuccess" component={InvoiceSendedWithSuccess} />
      <Screen name="selectInstallation" component={SelectInstallation} />
      
    </Navigator>
  );
}
