import * as React from 'react';
// import {Platform, StatusBar, useWindowDimensions} from 'react-native';
// import {useTheme} from 'styled-components/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
// import {useNavigation} from '@react-navigation/native';

// import CustomMenuStandard from '@components/CustomMenuStandard';

// import { Header } from '../../components/Header';

// import { BottomTab } from '../tabs/BottomTab';

import theme from '../../theme';
import {HeaderCustom} from '../../components/HeaderCustom';
import {useWindowDimensions} from 'react-native';
import CustomMenuStandard from '../../components/CustomMenuStandard';
import {InvoiceIntro} from '../../screens/InvoiceIntro';
import { InvoiceHome } from '../../screens/InvoiceHome';
import {PaymentInvoice} from '../../screens/PaymentInvoice';
import {InvoiceSolicitedInfo} from '../../screens/InvoiceSolicitedInfo';
import {ScanScreen} from '../../screens/ScanScreen';
import {PagScanScreen} from '../../screens/PagScanScreen';
export default function NewStack() {
  // const navigation = useNavigation();
  // const {COLORS} = useTheme();

  const {Navigator, Screen} = createDrawerNavigator();
  const dimensions = useWindowDimensions();

  return (
    <Navigator
      initialRouteName="Minha"
      screenOptions={{
        // headerShown: false,
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerStyle: {
          backgroundColor: theme.COLORS.DRAWER_STYLE,
        },
        header: () => (
          <HeaderCustom
            // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
            hideMessage={false}
            // onBackPress={async () => goBack()}
            backgroundColor={theme.COLORS.PRIMARY_800}
            isPrimaryColorDark
            isFocused={false}
            // leftOnPress={handleHome}
            leftAction={'back'}
          />
        ),
      }}
      drawerContent={() => <CustomMenuStandard />}>
      {/* <Screen name="register" component={Register} /> */}
      <Screen name="InvoiceHome" component={InvoiceHome} />
      {/* <Screen name="Scan" component={ScanScreen} /> */}
      <Screen name="InvoiceSolicitedInfo" component={InvoiceSolicitedInfo} />
      <Screen name="PagScan" component={PagScanScreen} />

    </Navigator>
  );
}

// name="finishregistration"
// component={FinishRegistration}
