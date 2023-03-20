import React, {useRef} from 'react';
import {StatusBar, SafeAreaView, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import WebView, {WebViewNavigation} from 'react-native-webview';

import {useTheme} from 'styled-components/native';
import {baseUrl} from '../../service/utils/urls';

export function Register() {
  // const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();

  const {height} = Dimensions.get('window');
  let webViewRef = useRef<any>();
  // const viewPageCPFL = () => {
  //   return (
  //     <WebView
  //       originWhitelist={['*']}
  //       style={{
  //         height: height,
  //         marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  //       }}
  //       source={{
  //         // uri: 'https://servicosonlineq.cpfl.com.br:8443/agencia-webapp/#/login-agd?key=XPTO',

  //         // uri: 'http://cpsdaanav01:8030/validausuario.aspx?key=instalacao=123456&token=XYZ',
  //         // uri: 'http://cpsdaanav01:8031/validausuario.aspx?key=XPTO',
  //         uri: 'https://www.cpfl.com.br/',
  //       }}
  //     />
  //   );
  // };
  let interval: number | null = null;
  const intervalRegister = () => {
    interval = setInterval(() => {
      webViewRef?.current?.injectJavaScript(`
  document?.getElementsByTagName('h3').item(0).remove();
  document?.getElementsByClassName('navbar navbar-custom navbar-fixed-top navbar-static-top').item(0).remove();
  document?.getElementsByClassName('breadcrumb').item(0).remove();
  document?.getElementsByClassName('rodape').item(0).remove();
  document?.getElementsByClassName('copyright').item(0).querySelector('span').remove();

 
`);
      // console.log('Teste');
    }, 500);
  };
  const intervalStop = () => {
    clearInterval(interval as number);
  };
  const viewRegisterCPFL = () => {
    const handlePageChange = (e: WebViewNavigation) => {
      // console.log(e);
      // if (interval && interval) {
      //   intervalStop();
      // }

      if (
        !e.loading &&
        e.url ===
          `${baseUrl.BASE}/agencia-webapp/#/login/cadastrar-identificacao`
        // 'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-identificacao'
      ) {
        intervalRegister();
        setTimeout(intervalStop, 10000);
      } else if (
        !e.loading &&
        e.url ===
          `${baseUrl.BASE}/agencia-webapp/#/login/cadastrar-dados-usuario`
        // 'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-dados-usuario'
      ) {
        webViewRef?.current?.injectJavaScript(`
        document?.getElementsByTagName('ol').item(0).remove();
      `);
      } else if (
        !e.loading &&
        e.url ===
          `${baseUrl.BASE}/agencia-webapp/#/login/cadastrar-dados-instalacao`
        // e.url ===
        //   'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-dados-instalacao'
      ) {
        webViewRef?.current?.injectJavaScript(`
        document?.getElementsByTagName('ol').item(0).remove();
      `);
      } else if (
        !e.loading &&
        e.url === `${baseUrl.BASE}/agencia-webapp/#/resultado`
        // e.url ===
        //   'https://servicosonline.cpfl.com.br/agencia-webapp/#/resultado'
      ) {
        webViewRef?.current?.injectJavaScript(`
        document?.getElementsByTagName('ol').item(0).remove();
        document?.getElementById('btnBaixarPdf').remove();
        document?.getElementById('btnVoltar').remove();
      `);
      } else if (
        e.url === `${baseUrl.BASE}/agencia-webapp/#/home`
        // e.url ===
        // 'http://servicosonlineq.cpfl.com.br:7171/agencia-webapp/#/home'
      ) {
        navigation.navigate('login' as never);
      }
    };

    return (
      <WebView
        onNavigationStateChange={handlePageChange}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        onMessage={(event: any) => {
          console.log('event: ', event);
        }}
        ref={webViewRef}
        style={{
          height: height,
        }}
        //   injectedJavaScript={`setTimeout(() => {

        //   document?.getElementsByTagName('h3').item(0).remove();
        //   document?.getElementsByClassName('navbar navbar-custom navbar-fixed-top navbar-static-top').item(0).remove();
        //   document?.getElementsByClassName('breadcrumb').item(0).remove();
        //   document?.getElementsByClassName('rodape').item(0).remove();
        //   document?.getElementsByClassName('copyright').item(0).querySelector('span').remove();
        // }, 1800);}

        // )`}
        javaScriptEnabled={true}
        source={{
          uri: `${baseUrl.BASE}/agencia-webapp/#/login/cadastrar-identificacao`,
          // uri: 'http://servicosonlineq.cpfl.com.br:7171/agencia-webapp/#/login/cadastrar-identificacao',
        }}
      />
    );
  };

  // const webViewRender = (value: number) => {
  //   switch (String(value)) {
  //     case '1':
  //       return viewPageCPFL();
  //     case '2':
  //       return viewRegisterCPFL();

  //     default:
  //       break;
  //   }
  // };

  const theme = useTheme();
  // const changeStep = (s: number) => {
  //   setStep(s);
  // };
  // const { goBack } = useNavigation();
  // const [btnClick, setBtnClick] = useState(0);

  // function handleHome() {
  //   changeStep(0);
  // }
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
          {viewRegisterCPFL()}
        </>
      </SafeAreaView>
    </>
  );
}
