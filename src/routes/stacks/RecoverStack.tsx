import * as React from 'react';
// import {Platform, StatusBar, useWindowDimensions} from 'react-native';
// import {useTheme} from 'styled-components/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
// import {useNavigation} from '@react-navigation/native';

// import CustomMenuStandard from '@components/CustomMenuStandard';

// import { Header } from '../../components/Header';

// import { BottomTab } from '../tabs/BottomTab';

import theme from '../../theme';
import {Register} from '../../screens/Register';
import {HeaderCustom} from '../../components/HeaderCustom';
import {useWindowDimensions} from 'react-native';
import CustomMenuStandard from '../../components/CustomMenuStandard';
import {RecoverPass} from '../../screens/RecoverPass';

export default function StackRecoverPass() {
  // const navigation = useNavigation();
  // const {COLORS} = useTheme();

  const {Navigator, Screen} = createDrawerNavigator();
  const dimensions = useWindowDimensions();

  return (
    <Navigator
      initialRouteName="recover"
      screenOptions={{
        // headerShown: false,
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerStyle: {
          backgroundColor: theme.COLORS.DRAWER_STYLE,
        },
        header: () => (
          <HeaderCustom
            // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
            hideMessage={true}
            // onBackPress={async () => goBack()}
            backgroundColor={theme.COLORS.PRIMARY_800}
            isPrimaryColorDark
            isFocused={false}
            // leftOnPress={handleHome}
            leftAction={'menu'}
          />
        ),
      }}
      drawerContent={() => <CustomMenuStandard />}>
      <Screen name="recover" component={RecoverPass} />
    </Navigator>
  );
}
