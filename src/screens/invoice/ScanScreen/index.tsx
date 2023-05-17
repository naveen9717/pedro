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
  Text,
  TouchableOpacity
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
import {Strong} from '../../../components/Generic/index';
import {AccessibilityWidget} from '../../../components/AccessibilityWidget';
import {useTheme} from 'styled-components/native';
import {MainGenericContainer} from '../../../components/Containers/index';
// import Widget from '../../components/Widget';
import {HeaderCustom} from '../../../components/HeaderCustom';
import {createDate} from '../../../helpers/functions/datas';
import {Button} from '../../../components/Button';
import {api} from '../../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {B2C_DATA, FREE_INTERNET} from '../../../redux/actions/actionsTypes';
import {AuthManager} from '../../../service/azureB2C/AuthManager';
import {DecodedB2cData} from '../../../models/b2c/data';
import {ApiUser} from '../../../service/user';
import jwtDecode from 'jwt-decode';
import {AuthContext, AuthContextProps} from '../../../contexts/useAuth';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../../components/Button/styles';
import {RootState} from '../../../redux/reducer';
import {AlertModal} from '../../../components/Modal/AlertModal';
import CardMain from '../../../components/CardMain';
import CardChild from '../../../components/CardChild';
import { Card, Paragraph } from 'react-native-paper';
// import {Spinner} from '../../components/Spinner/styles';
// import { getBottomSpace } from 'react-native-iphone-x-helper';
export function ScanScreen() {
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
    navigation.navigate('Info')
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
        style={{flex: 0}}
      />
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: theme.COLORS.PRIMARY_800 }} /> */}
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={
            Platform.OS === 'android' ? 'light-content' : 'dark-content'
          }
        />
        {step === 0 ? (
          <>
            {/* <HeaderCustom
              marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
              hideMessage={true}
              onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              leftOnPress={handleHome}
              leftAction={'menu'}
            /> */}
            {/* <AccessibilityWidget
            // marginTop={
            //   Platform.OS === 'android' ? StatusBar.currentHeight : 0
            // }
            /> */}

            <ScrollView>
              <MainGenericContainer
                style={{paddingTop: height * 0.02}}>
                {/* <ContainerViewLogo
                  paddingBottom={height * 0.0541}
                  paddingTop={height * 0.00089}>
                  <Image
                    source={require('../../assets/Logo_CPFL_Energia.png')}
                  />
                </ContainerViewLogo> */}
                <View style={{paddingBottom: height * 0.0324,flexDirection: 'row',  justifyContent: 'space-evenly'}}>
                  <Title paddingBottom={height * 0.0216}>
                  Pagamento da conta
                  </Title>
                  
                  <Text style={styles.label}>Procotocolo: 000000000</Text>
            
                </View>
                
                <View style={styles.checkboxContainer}>
                <Card style={{backgroundColor:'white'}}>
                
                    <Card.Content>
                    
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                      <View>
                        <Text style={styles.smalltext}>Pagmenta da conta</Text>
                        <Text style={styles.amount}>R$ 124.153,58</Text>
                      </View>
                     <View>
                      <TouchableOpacity
                       onPress={handleClick}
                       style={styles.onpress}>
                       <Text style={{color:'white'}}>Risco de corte </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
            
                    <View>
                        <Text style={styles.title}>Vencida</Text>
                    </View>
                    <View>
                      <Text style={styles.first}>Vencimento</Text>
                      <Text style={styles.second}>13/03/2022</Text>
                    </View>
                  <View>
                     <Text style={styles.first}>Referente à</Text>
                     <Text style={styles.second}>Fevereiro/2022</Text>
                   </View>
            
                 </View>
                  </Card.Content>
               </Card>

                </View>

              </MainGenericContainer>
              

              <View
        style={{
          height: '100%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            marginTop: -30,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            backgroundColor: 'white',
            paddingVertical: 5,
           
          }}>
          
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                marginTop: 10,
              }}>
                
              <View style={{flex: 1}}>
              
              <View style={[styles.boxcontainer]}>
              <View style={{marginVertical:12}}> 
                <Text style={styles.mediumtextbold}>Pagamento via PIX</Text>
                <Text style={styles.smalltext}>Copie o código PIX ou leia o QR Code para pagar</Text>
                <Text style={styles.smalltext}>su a conta! Tenha agilidade na baixa da conta no</Text>
                <Text style={styles.smalltext}>mesmo dia!</Text>
                </View>
                <ContainerViewButton>
                
                  <Button
                    title="Copiar código PIX"
                    type="secondary"
                    // onPress={handleSignIn}
                    onPress={handleClick}
                    isLoading={isLogging}
                  />
                  
                </ContainerViewButton>

                <View style={styles.checkboxContainer}>
                <Text style={styles.mediumtext}>Ou ler o QR code</Text>
                
                    <View >
                    
                      <View style={{justifyContent:'center',justifyContent: 'center',alignItems: 'center',}}>
                        
                        <Image
                        source={require('../../../assets/images/QrCodeImage.png')}
                         style={styles.scanicons}
                         />
                    
                    </View>
                    <View style={styles.bottom}>
                    <Text style={styles.second}>Como realizar seu pagamento via Pix?></Text>
                    </View>
                 </View>
                 

                </View>
               </View>
               
            </View>
           </View>
          </View>
        </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' 
  },
  checkboxContainer: {
    marginVertical: 15,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 5,
    fontSize:10,
    color:'#02ade1',
    fontWeight:'600'
  },
  amount: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight:'600'
  },
  smalltext: {
    fontSize: 13,
    color:'black',
    textAlign:'left'
  },
   mediumtext: {
    fontSize: 18,
    color:'black',
    fontWeight:'500',
    marginVertical: 15,
  },
  mediumtextbold: {
    fontSize: 16,
    color:'black',
    fontWeight:'500',
    marginVertical: 15,
  },
  title: {
    fontSize:13,
    fontWeight:'600',
    marginTop:10,
    backgroundColor:'orange',
    color:'red',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius:5
  },
  onpress:{
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor:'maroon',
    borderRadius:5
  },
  first:{
    color:'black'
  },
  white:{
    color:'white',
    textAlign:'center'
  },
  second:{
    fontWeight:'500',
    color:'#02ade1',
    flexShrink: 1 
  },
  bottom:{
    marginVertical:40
  },
  icon:{
    width:40,
    height: 40,
    color:'#02ade1',
  },
  bar:{
    width:40,
    height: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanicons:{
   height:120,
   width:120,
   alignItems:'center',
   justifyContent:'center',
  },
  boxcontainer:{
    paddingHorizontal:50
  }
});