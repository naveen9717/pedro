import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Platform,
  StatusBar,
  Image,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import {
  authorize,
  AuthorizeResult,
  refresh,
  revoke,
} from 'react-native-app-auth';
import {NativeModules} from 'react-native';
import WebView from 'react-native-webview';
// import {AuthManager} from '../../service/azureB2C/AuthManager';
// import {AuthConfig} from '../../service/azureB2C';
import {Label, Title, ContainerViewButton, ContainerViewLogo} from './styles';
import {Strong} from '../../components/Generic/index';
import {AccessibilityWidget} from '../../components/AccessibilityWidget';
import {useTheme} from 'styled-components/native';
import {MainGenericContainer} from '../../components/Containers/index';
// import Widget from '../../components/Widget';
import {HeaderCustom} from '../../components/HeaderCustom';
import {createDate} from '../../helpers/functions/datas';
import {Button} from '../../components/Button';
import {api} from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {B2C_DATA, FREE_INTERNET} from '../../redux/actions/actionsTypes';
import {AuthManager} from '../../service/azureB2C/AuthManager';
import {DecodedB2cData} from '../../models/b2c/data';
import {ApiUser} from '../../service/user';
import jwtDecode from 'jwt-decode';
import {AuthContext, AuthContextProps} from '../../contexts/useAuth';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../components/Button/styles';
import {RootState} from '../../redux/reducer';
import {AlertModal} from '../../components/Modal/AlertModal';

// import {Spinner} from '../../components/Spinner/styles';
// import { getBottomSpace } from 'react-native-iphone-x-helper';
export function InvoiceSolicitedInfo() {
  const {b2cLogin} = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [isSelected, setSelection] = useState(false);

  const dispatch = useDispatch();
  function handleSignIn() {
    navigation.navigate('login' as never);
  }
  const netInfo = useNetInfo();
  // function handleSignUp() {
  //   navigation.navigate('emailverification' as never);
  // }
  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{title: string; msg: string}>({
    title: '',
    msg: '',
  });

  console.log('Net Info:', netInfo);
  const [freeInternetDate, setFreeInternetDate] = useState<Date | null>(null);

  const isLoading: boolean = useSelector(
    (state: RootState) => state.BffAuthIsLoading.isLoading,
  );

  const saveFreeInternetDate = async (value: Date | null) => {
    // const userLogin = {email, password};
    await AsyncStorage.setItem('freeInternetDate', JSON.stringify(value));
  };

  const getFreeInternetDate = async () => {
    AsyncStorage.getItem('freeInternetDate', (err, result) => {
      const FREE_INTERNET_DATE: Date = JSON.parse(result);
      console.log('Free: ', FREE_INTERNET_DATE);
      if (result && !err) {
        // return FREE_INTERNET_DATE;
        setFreeInternetDate(FREE_INTERNET_DATE);
      }
    });
  };

  const signInAsync = () => {
    // const handleIsLoading = (value: boolean) => {
    //   setIsLoading(value);
    // };

    b2cLogin(dispatch, navigation, setModalInfo, setshowModal);
  };

  const ModalLoading = (loading: boolean) => {
    if (loading) {
      return (
        <ContainerLoading>
          <Load />
        </ContainerLoading>
      );
    }
  };
  useEffect(() => {
    const iOSSDPlugin = NativeModules.RnSmiSdk;
    const {SmiSdkReactModule} = NativeModules;
    // saveFreeInternetDate(null);
    const date = new Date();
    getFreeInternetDate();
    // if (freeInternetDate) {
    console.log('free', freeInternetDate);
    if ((freeInternetDate && date > freeInternetDate) || !freeInternetDate) {
      // if (!netInfo.isConnected) {
      //   if (Platform.OS === 'ios') {
      //     iOSSDPlugin.startSponsorVpn();
      //   } else {
      //     SmiSdkReactModule.startSponsoredData();
      //   }
      // }
      const apiResponse = {date: '2022-12-29_00:00'};
      let apiDate: Date;
      if (apiResponse?.date) {
        apiDate = createDate(
          apiResponse.date.slice(0, 10),
          apiResponse.date.slice(11, 16),
        ) as Date;
        if (date < apiDate) {
          saveFreeInternetDate(apiDate);
          dispatch({type: FREE_INTERNET, freeInternet: false});
          // if (Platform.OS === 'ios') {
          //   iOSSDPlugin.stopSponsorVpn();
          // } else {
          //   SmiSdkReactModule.stopSponsoredData();
          // }
        } else {
          dispatch({type: FREE_INTERNET, freeInternet: true});
          saveFreeInternetDate(null);
        }

        //setar internet gratuita bloqueada
        //desabilitar internet gratuita
      } else {
        dispatch({type: FREE_INTERNET, freeInternet: true});
        saveFreeInternetDate(null);
      }
    } else {
      dispatch({type: FREE_INTERNET, freeInternet: false});
    }
    if (Platform.OS === 'ios') {
      iOSSDPlugin.stopSponsorVpn();
      console.log('Desligou ios');
    } else {
      SmiSdkReactModule.stopSponsoredData();
      console.log('Desligou Android');
    }
  }, []);

  const {height} = Dimensions.get('window');
  let webViewRef = useRef<any>();
  const viewPageCPFL = () => {
    return (
      <WebView
        originWhitelist={['*']}
        style={{
          height: height,
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
        source={{
          // uri: 'https://servicosonlineq.cpfl.com.br:8443/agencia-webapp/#/login-agd?key=XPTO',

          // uri: 'http://cpsdaanav01:8030/validausuario.aspx?key=instalacao=123456&token=XYZ',
          // uri: 'http://cpsdaanav01:8031/validausuario.aspx?key=XPTO',
          uri: 'https://www.cpfl.com.br/',
        }}
      />
    );
  };

  const viewRegisterCPFL = () => {
    const handlePageChange = (e: WebViewNavigation) => {
      console.log(e);

      if (
        // !e.loading &&
        e.url ===
        'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-identificacao'
      ) {
        setTimeout(() => {
          webViewRef?.current?.injectJavaScript(`
        document.getElementsByTagName('h3').item(0).remove();
        document.getElementsByClassName('navbar navbar-custom navbar-fixed-top navbar-static-top').item(0).remove();
        document.getElementsByClassName('breadcrumb').item(0).remove();
        document.getElementsByClassName('rodape').item(0).remove();
        document.getElementsByClassName('copyright').item(0).querySelector('span').remove();
  
       
      `);
        }, 1800);
      } else if (
        !e.loading &&
        e.url ===
          'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-dados-usuario'
      ) {
        webViewRef?.current?.injectJavaScript(`
        document.getElementsByTagName('ol').item(0).remove();
      `);
      } else if (
        !e.loading &&
        e.url ===
          'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-dados-instalacao'
      ) {
        webViewRef?.current?.injectJavaScript(`
        document.getElementsByTagName('ol').item(0).remove();
      `);
      } else if (
        !e.loading &&
        e.url ===
          'https://servicosonline.cpfl.com.br/agencia-webapp/#/resultado'
      ) {
        webViewRef?.current?.injectJavaScript(`
        document.getElementsByTagName('ol').item(0).remove();
        document.getElementById('btnBaixarPdf').remove()
        document.getElementById('btnVoltar').remove()
      `);
      }
    };

    return (
      <WebView
        onNavigationStateChange={handlePageChange}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        onMessage={event => {
          console.log('event: ', event);
        }}
        ref={webViewRef}
        style={{
          height: height,
        }}
        javaScriptEnabled={true}
        source={{
          uri: 'https://servicosonline.cpfl.com.br/agencia-webapp/#/login/cadastrar-identificacao',
        }}
      />
    );
  };

  const webViewRender = (value: number) => {
    switch (String(value)) {
      case '1':
        return viewPageCPFL();
      case '2':
        return viewRegisterCPFL();

      default:
        break;
    }
  };

  const theme = useTheme();
  const changeStep = (s: number) => {
    setStep(s);
  };
  const {goBack} = useNavigation();
  const [btnClick, setBtnClick] = useState(0);

  function handleHome() {
    changeStep(0);
  }

  const handleClick = () => {
    // navigation.navigate('login' as never);
    navigation.navigate('MinhaContaAtual');
  };

  return (
    <>
      <AlertModal
        showModal={showModal}
        setShowModal={handleModal}
        msg={modalInfo.msg}
        title={modalInfo.title}
      />
      <SafeAreaView
        style={{flex: 0, backgroundColor: theme.COLORS.BACKGROUND}}
      />
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: theme.COLORS.PRIMARY_800 }} /> */}
      <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.BACKGROUND}}>
        <StatusBar
          barStyle={
            Platform.OS === 'android' ? 'light-content' : 'dark-content'
          }
        />
        {step === 0 ? (
          <>
            <HeaderCustom
              // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
              hideMessage={true}
              onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              leftOnPress={handleHome}
              leftAction={'menu'}
            />
            <AccessibilityWidget
            // marginTop={
            //   Platform.OS === 'android' ? StatusBar.currentHeight : 0
            // }
            />

            <ScrollView>
              <MainGenericContainer
                style={{paddingTop: height * 0.02, height: height}}>
                {/* <ContainerViewLogo
                  paddingBottom={height * 0.0541}
                  paddingTop={height * 0.00089}>
                  <Image
                    source={require('../../assets/Logo_CPFL_Energia.png')}
                  />
                </ContainerViewLogo> */}
                <View style={{paddingBottom: height * 0.0324,justifyContent: 'center',alignItems: 'center'}}>
                  <Title paddingBottom={height * 0.0216}>
                  Informações do pagamento solicitada!
                  </Title>
                  <Image
                    source={require('../../assets/images/icOnlineWorking.png')}
                    style={{width: 250,height: 250}}
                  />
                  <View style={{backgroundColor:'#f4f4f4',padding:15,width:'100%'}}>
                  <Text style={styles.mediumtext}>Não esqueça de salvar seu protocolo!</Text>
                  <Text style={styles.largetext}>PROTOCOLO #2019059128127</Text>
                  <Text style={styles.smallertext}>Serviço realizado às 10:05 12/10/2021</Text>
                 </View>
                   <View style={{marginVertical:15}}>
                  <Text style={styles.mediumtextbold}>Confira detalhes do seu pagamento:</Text>
                  <Text style={styles.mediumtext}>Estamos processando seu pagamento!
                    Fique tranquilo que em breve será baixada! Caso
                    receba ações de cobrança, elas serão
                    automaticamente canceladas!</Text>
                 </View>
                  <View>
                  <Text style={styles.smalltext}>Conta referente a instalação: 039204859</Text>
                  <Text style={styles.smalltext}>Pagamento solicitado por: Gustavo Risonho Fortunato</Text>
                  <Text style={styles.smalltext}>Data do pagamento: 12/11/2021 às 13:23:12</Text>
                  <Text style={styles.smalltext}>Data Prevista:</Text>
                  <Text style={styles.smalltext}>Método de pagamento: PIX</Text>
                  </View>
                </View>
                
                <ContainerViewButton>
                
                  <Button
                    title="Compartilhar"
                    type="primary"
                    // onPress={handleSignIn}
                    onPress={handleClick}
                    isLoading={isLogging}
                  />
                  
                </ContainerViewButton>
                {ModalLoading(isLoading)}
              </MainGenericContainer>
            </ScrollView>
          </>
        ) : (
          <>
            <HeaderCustom
              marginTop={
                Platform.OS === 'android' ? StatusBar.currentHeight : 0
              }
              hideMessage={true}
              onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              leftOnPress={handleHome}
              leftAction={'login'}
            />
            {webViewRender(step)}
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  smalltext:{
    fontSize:12,
  },
  smallertext:{
    fontSize:12,
    textAlign:'center'
  },
  largetext:{
    fontSize:15,
    fontWeight:'500',
    color:'#02ade1',
    textAlign:'center'
  },
  mediumtext:{
    fontSize:13,
    textAlign:'center'
  },
  mediumtextbold:{
    fontSize:13,
    textAlign:'center',
    fontWeight:'500',
    marginVertical:5
  }
});