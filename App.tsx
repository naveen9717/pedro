import React, {useState, useEffect, useRef} from 'react';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';

import {useNetInfo} from '@react-native-community/netinfo';
import 'react-native-reanimated';
import {
  NativeModules,
  DeviceEventEmitter,
  Platform,
  LogBox,
  StatusBar,
  View,
  Text,
  NativeEventEmitter,
} from 'react-native';
import {Provider} from 'react-redux';

import {navigationRef} from './src/config/rootNavigation';

import {store} from './src/redux/store';

import {AuthProvider} from './src/contexts/useAuth';
import {Routes} from './src/routes';
import theme from './src/theme';
import ThemeProvider from './src/components/ThemeProvider';

import config from './src/config/googleServiceId';
import reactotron from './src/config/reactotron';

Settings.initializeSDK();
if (__DEV__) {
  reactotron.connect();
}
interface ISmiResult {
  sd_state: string;
  sd_reason: string;
  carrier?: string;
  client_ip?: string;
}

export default function App() {
  const netInfo = useNetInfo();
  const [showNetInfo, setShowNetInfo] = useState(true);
  const routeNameRef = React.useRef();
  const [sdSmiResult, setSdSmiResult] = useState({} as ISmiResult);

  const {RNDatamiEventManager} = NativeModules;
  const smisdkiOSEventEmitter = new NativeEventEmitter(RNDatamiEventManager);

  // IOS
  // iOSSDPlugin.startSponsorVpn();
  // iOSSDPlugin.stopSponsorVpn();

  // Android
  // SmiSdkReactModule.startSponsoredData()
  // stopSponsoredData()

  if (Platform.OS === 'android') {
    const onSdStateChange = ({sd_state, sd_reason}: ISmiResult) => {
      setSdSmiResult({sd_state, sd_reason}); // You also can get client_ip and carrier from smiResult
    };

    useEffect(() => {
      const {SmiSdkReactModule} = NativeModules;
      if (!sdSmiResult.sd_state) {
        DeviceEventEmitter.addListener('onSdStateChange', onSdStateChange);
        SmiSdkReactModule.registerSdStateChangeListner();
        SmiSdkReactModule.stopSponsoredData();
        // DeviceEventEmitter.removeAllListeners('onSdStateChange');
      }
    }, [sdSmiResult.sd_state]);
  } else {
    const subscription = smisdkiOSEventEmitter.addListener(
      'DATAMI_EVENT',
      response => console.log(JSON.stringify(response)),
    );
    var iOSSDPlugin = NativeModules.RnSmiSdk;
    iOSSDPlugin.stopSponsorVpn();
    var isiOS = false;
    if (Platform.OS === 'ios') {
      isiOS = true;
      console.log('isiOS: ' + isiOS);
      iOSSDPlugin.startSponsorVpn();
    }
  }

  useEffect(() => {
    if (netInfo.isConnected) {
      setShowNetInfo(false);
    } else {
      setShowNetInfo(true);
    }
  }, [netInfo.isConnected]);
  useEffect(() => {
    console.log('sdSmiResult', sdSmiResult);
  }, [sdSmiResult]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  }, []);

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  // LogBox.ignoreAllLogs(); //Ignore all log notifications
  // const prefix = Linking.createURL('https:///');

  // const linking = {
  //   prefixes: [prefix],
  // };

  return (
    <Provider store={store}>
      <AuthProvider>
        <StatusBar
          // style="inverted"
          backgroundColor={theme.COLORS.PRIMARY_800}
        />
        <ThemeProvider theme={theme}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current =
                navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;

              if (previousRouteName !== currentRouteName) {
                await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
              }
              routeNameRef.current = currentRouteName;
            }}>
            <Routes />
            {/* <Toast
              visible={showNetInfo}
              onDismiss={() => setShowNetInfo(false)}
              snackbarText="Parece que você está sem internet ou sua conexão está fraca. Verifique sua conexão para continuar!"
            /> */}
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
