import React, {useRef, useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  // Linking,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

import WebView, {WebViewNavigation} from 'react-native-webview';

import {useTheme} from 'styled-components/native';
import {baseUrl} from '../../../service/utils/urls';
// import {useSelector} from 'react-redux';
// import {RootState} from '@src/redux/reducer';
// import {LoginUrlData} from '../../models/loginUrl/loginUrlData';

export function RecoverPass() {
  // const [isLogging, setIsLogging] = useState(false);
  // const navigation = useNavigation();
  // // const [step, setStep] = useState(0);

  // const urlLogin: LoginUrlData = useSelector(
  //   (state: RootState) => state.LoginUrl,
  // );

  const {height} = Dimensions.get('window');
  let webViewRef = useRef<any>();

  const viewRecoverPass = () => {
    const handlePageChange = (e: WebViewNavigation) => {
      if (
        !e.loading &&
        e.url === `${baseUrl.BASE}/agencia-webapp/#/login/recuperarSenha`
        // 'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-identificacao'
      ) {
        setTimeout(() => {
          webViewRef?.current?.injectJavaScript(`
          document?.getElementsByTagName('h3').item(0).remove();
          document?.getElementsByClassName('navbar navbar-custom navbar-fixed-top navbar-static-top').item(0).remove();
          document?.getElementsByClassName('breadcrumb').item(0).remove();
          document?.getElementsByClassName('rodape').item(0).remove();
          document?.getElementsByClassName('copyright').item(0).querySelector('span').remove();
    
         
        `);
        }, 2200);
      } else if (
        !e.loading &&
        e.url === `${baseUrl.BASE}/agencia-webapp/#/login/resultado`
        // 'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-identificacao'
      ) {
        // setTimeout(() => {
        webViewRef?.current?.injectJavaScript(`
    
          document?.getElementsByClassName('breadcrumb').item(0).remove();
    
         
        `);
        // }, 2200);
      }
    };
    // http://servicosonlineq.cpfl.com.br:7171/agencia-webapp/#/login/resultado
    const url = `${baseUrl.BASE}/agencia-webapp/#/login/recuperarSenha`;

    return (
      <WebView
        // javaScriptCanOpenWindowsAutomatically={true}
        // allowUniversalAccessFromFileURLs={true}
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
        // allowUniversalAccessFromFileURLs={true}
        // // allowingReadAccessToURL={}
        // mixedContentMode={'always'}
        // onFileDownload={
        //   ({nativeEvent: {downloadUrl}}) =>
        //     console.log('Try download: ', downloadUrl)
        //   // downloadDocument(downloadUrl);
        // }
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
        {/* <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'} /> */}
        <StatusBar barStyle={'light-content'} />
        <>
          {/* <HeaderCustom
          marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
          hideMessage={true}
          onBackPress={async () => goBack()}
          backgroundColor={theme.COLORS.PRIMARY_800}
          isPrimaryColorDark
          isFocused={false}
          leftOnPress={handleHome}
          leftAction={'login'}
        /> */}
          {viewRecoverPass()}
        </>
      </SafeAreaView>
      {/* </>
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: theme.COLORS.PRIMARY_800}}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.BACKGROUND}}>
        <StatusBar barStyle={'light-content'} />
        <>{viewRecoverPass()}</>
      </SafeAreaView> */}
    </>
  );
}
