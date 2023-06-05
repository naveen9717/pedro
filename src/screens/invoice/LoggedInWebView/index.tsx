import React, {useRef, useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WebView, {WebViewNavigation} from 'react-native-webview';

import {useTheme} from 'styled-components/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducer';
import {LoginUrlData} from '../../../models/loginUrl/loginUrlData';
import {baseUrl} from '../../../service/utils/urls';

export function LoggedInWebView() {
  // const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  // const [step, setStep] = useState(0);

  const urlLogin: LoginUrlData = useSelector(
    (state: RootState) => state.LoginUrl,
  );
  const destUrl = urlLogin.instLength <= 1 ? 'login' : 'selectInstallation';
  const {height} = Dimensions.get('window');
  let webViewRef = useRef<any>();

  const viewLoggedIn = () => {
    const handlePageChange = (e: WebViewNavigation) => {
      if (e.url.includes('open-external-popup&destUrl')) {
        let extUrl = e?.url?.split('destUrl=').pop();
        extUrl = decodeURIComponent(extUrl as string);

        if (e.url.includes('detalhes-conta')) {
          extUrl = extUrl.replace('&method=get&', '?');
        }
        Linking.openURL(extUrl as string);
      } else if (
        e.url ===
        `${baseUrl.BASE}/agencia-webapp/#/app-mobile?comando=configuracoes`
      ) {
        navigation.navigate(destUrl as never);
      } else if (e.url === `${baseUrl.BASE}/agencia-webapp/#/login`) {
        navigation.navigate('login' as never);
      }
    };

    const url = `${baseUrl.BASE}/agencia-webapp/#/app-mobile/login?identificacao_encriptada=${urlLogin.encrypt}&clientId=${urlLogin.clientId}&internetGratis=${urlLogin.internetGratis}`;

    return (
      <WebView
        setSupportMultipleWindows={true}
        onNavigationStateChange={handlePageChange}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        onMessage={event => {
          console.log('event: ', event);
        }}
        ref={webViewRef}
        style={{
          height: height,
          // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}
        javaScriptEnabled={true}
        source={{
          uri: url,
        }}
      />
    );
  };

  const theme = useTheme();

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: theme.COLORS.PRIMARY_800}}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.BACKGROUND}}>
        <StatusBar barStyle={'light-content'} />
        <>{viewLoggedIn()}</>
      </SafeAreaView>
    </>
  );
}
