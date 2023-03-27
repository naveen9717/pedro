import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { EmailVerification } from '@screens/EmailVerification';
// import { VerificationCode } from '@screens/VerificationCode';
// import { ResetPassword } from '@screens/ResetPassword';
// import { FinishRegistration } from '@screens/FinishRegistration';

// import { About } from '@screens/About';
// import { TakeSecondProof } from '@screens/SecondInvoice/TakeSecondProof';
// import { InformationPagSecondProof } from '@screens/SecondInvoice/InformationPagSecondProof';
// import { SendByMailSecondProof } from '@screens/SecondInvoice/SendByMailSecondProof';
// import { ListSecondProof } from '@screens/SecondInvoice/ListSecondProof';
// import { MinimalAccount } from '@screens/SecondInvoice/MinimalAccount';
// import { PaymentMethod } from '@screens/SecondInvoice/PaymentMethod';
// import { InfoPagtoByBarCode } from '@screens/SecondInvoice/InfoPagtoByBarCode';
// import { InfoPagtoByPix } from '@screens/SecondInvoice/InfoPagtoByPix';
// import { ViewDownload } from '@screens/SecondInvoice/ViewDownload';
// import { EasyAccount } from '@screens/SecondInvoice/EasyAccount';
// import { UnderstandBill } from '@screens/SecondInvoice/UnderstandBill';
// import { EasyAccountAllInformation } from '@screens/SecondInvoice/EasyAccountAllInformation';
// import { Configuration } from '@screens/Configuration';
// import { ConfigurationFirstAccess } from '@screens/ConfigurationFirstAccess';

// import { PowerOutageNavigation } from './PowerOutageNavigation';

// import { NoInternetLayout } from '../../modules/NoInternet/screens/noInternetLayout';
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
      {/* <Screen
        options={{
          headerShown: true,
          header: () => <AccessibilityWidget marginTop={30} />,
        }}
        name="emailverification"
        component={EmailVerification}
      />
      <Screen
        options={{
          headerShown: true,
          header: () => <AccessibilityWidget marginTop={30} />,
        }}
        name="verificationcode"
        component={VerificationCode}
      />
      <Screen
        options={{
          headerShown: true,
          header: () => <AccessibilityWidget marginTop={30} />,
        }}
        name="resetpassword"
        component={ResetPassword}
      />*/}
      {/* <Screen
        options={{
          headerShown: true,
          header: () => (
            <HeaderCustom
              // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
              hideMessage={true}
              // onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              // leftOnPress={handleHome}
              // leftAction={'menu'}
            />
          ),
          // header: () => <AccessibilityWidget marginTop={30} />,
        }}
        name="finishregistration"
        component={FinishRegistration}
      /> */}
      <Screen name="routesregister" component={RegisterStack} />
      <Screen name="routesLoggedInWV" component={LoggedInWebView} />
      <Screen name="routesrecover" component={StackRecoverPass} />
      <Screen name="InvoiceHome" component={InvoiceHome} />
      <Screen name="Scan" component={ScanScreen} />
      <Screen name="InvoiceSolicitedInfo" component={InvoiceSolicitedInfo} />
      <Screen name="InvoiceSendedWithSuccess" component={InvoiceSendedWithSuccess} />
      {/* <Screen name="PaymentInvoice" component={PaymentInvoice} /> */}

      

      {/* <Screen name="Tabs" component={TabsContainer} /> */}

      {/* <Screen name="routesmenu" component={MenuStack} /> */}
      {/* <Screen name="configuration" component={Configuration} /> */}
      {/* <Screen
        options={{
          headerShown: true,
          header: () => (
            <>
              <Header
                backgroundColor={theme.COLORS.PRIMARY_800}
                isPrimaryColorDark
              />
              <AccessibilityWidget />
            </>
          ),
        }}
        name="configurationFistAccess"
        component={ConfigurationFirstAccess}
      /> */}
      <Screen name="selectInstallation" component={SelectInstallation} />
      {/* <Screen name="about" component={About} />
      <Screen name="takeSecondProof" component={TakeSecondProof} />
      <Screen name="infoPagSecondProof" component={InformationPagSecondProof} />
      <Screen name="sendByMailSecondProof" component={SendByMailSecondProof} />
      <Screen name="ListSecondProof" component={ListSecondProof} />
      <Screen name="minimalAccount" component={MinimalAccount} />
      <Screen name="paymentMethod" component={PaymentMethod} />
      <Screen name="infoPagtoByBarCode" component={InfoPagtoByBarCode} />
      <Screen name="InfoPagtoByPix" component={InfoPagtoByPix} />
      <Screen name="ViewDownload" component={ViewDownload} />
      <Screen name="EasyAccount" component={EasyAccount} />
      <Screen name="UnderstandBill" component={UnderstandBill} />
      <Screen
        name="EasyAccountAllInformation"
        component={EasyAccountAllInformation}
      />
      <Screen name="PowerOutage" component={PowerOutageNavigation} />
      <Screen name="NoInternetLayout" component={NoInternetLayout} /> */}
    </Navigator>
  );
}
