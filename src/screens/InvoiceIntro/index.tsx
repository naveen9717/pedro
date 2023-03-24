import React, { useState, useRef, useEffect, useContext } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import {
  authorize,
  AuthorizeResult,
  refresh,
  revoke,
} from 'react-native-app-auth';
import { NativeModules } from 'react-native';
import WebView from 'react-native-webview';
// import {AuthManager} from '../../service/azureB2C/AuthManager';
// import {AuthConfig} from '../../service/azureB2C';
import { Label, Title, ContainerViewButton, ContainerViewLogo } from './styles';
import { Strong } from '../../components/Generic/index';
import { AccessibilityWidget } from '../../components/AccessibilityWidget';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../components/Containers/index';
// import Widget from '../../components/Widget';
import { HeaderCustom } from '../../components/HeaderCustom';
import { createDate } from '../../helpers/functions/datas';
import { Button } from '../../components/Button';
import { api } from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { B2C_DATA, FREE_INTERNET } from '../../redux/actions/actionsTypes';
import { AuthManager } from '../../service/azureB2C/AuthManager';
import { DecodedB2cData } from '../../models/b2c/data';
import { ApiUser } from '../../service/user';
import jwtDecode from 'jwt-decode';
import { AuthContext, AuthContextProps } from '../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../components/Button/styles';
import { RootState } from '../../redux/reducer';
import { AlertModal } from '../../components/Modal/AlertModal';

// import {Spinner} from '../../components/Spinner/styles';
// import { getBottomSpace } from 'react-native-iphone-x-helper';
export function InvoiceIntro() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [isSelected, setSelection] = useState(true);

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
  const [modalInfo, setModalInfo] = useState<{ title: string; msg: string }>({
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
    const { SmiSdkReactModule } = NativeModules;
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
      const apiResponse = { date: '2022-12-29_00:00' };
      let apiDate: Date;
      if (apiResponse?.date) {
        apiDate = createDate(
          apiResponse.date.slice(0, 10),
          apiResponse.date.slice(11, 16),
        ) as Date;
        if (date < apiDate) {
          saveFreeInternetDate(apiDate);
          dispatch({ type: FREE_INTERNET, freeInternet: false });
          // if (Platform.OS === 'ios') {
          //   iOSSDPlugin.stopSponsorVpn();
          // } else {
          //   SmiSdkReactModule.stopSponsoredData();
          // }
        } else {
          dispatch({ type: FREE_INTERNET, freeInternet: true });
          saveFreeInternetDate(null);
        }

        //setar internet gratuita bloqueada
        //desabilitar internet gratuita
      } else {
        dispatch({ type: FREE_INTERNET, freeInternet: true });
        saveFreeInternetDate(null);
      }
    } else {
      dispatch({ type: FREE_INTERNET, freeInternet: false });
    }
    if (Platform.OS === 'ios') {
      iOSSDPlugin.stopSponsorVpn();
      console.log('Desligou ios');
    } else {
      SmiSdkReactModule.stopSponsoredData();
      console.log('Desligou Android');
    }
  }, []);

  const { height } = Dimensions.get('window');
  let webViewRef = useRef<any>();
  

 
  const theme = useTheme();
  const changeStep = (s: number) => {
    setStep(s);
  };
  const { goBack } = useNavigation();
  const [btnClick, setBtnClick] = useState(0);

  function handleHome() {
    changeStep(0);
  }

  const handleClick = () => {
    // navigation.navigate('login' as never);
    navigation.navigate('InvoiceHome' as never);
  };

  return (
    <>
      <AlertModal
        showModal={showModal}
        setShowModal={handleModal}
        msg={modalInfo.msg}
        title={modalInfo.title}
      />
     
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: theme.COLORS.PRIMARY_800 }} /> */}
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.BACKGROUND }}>
        {/* <StatusBar
          barStyle={
            Platform.OS === 'android' ? 'light-content' : 'dark-content'
          }
        /> */}
  
          <>
            {/* <HeaderCustom
              marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
              hideMessage={true}
              onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              leftOnPress={handleHome}
              leftAction={'back'}
            />
            <AccessibilityWidget
            marginTop={
              Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }
            /> */}

            <ScrollView>
              <MainGenericContainer
                style={{ paddingTop: height * 0.02, height: height }}>
                {/* <ContainerViewLogo
                  paddingBottom={height * 0.0541}
                  paddingTop={height * 0.00089}>
                  <Image
                    source={require('../../assets/Logo_CPFL_Energia.png')}
                  />
                </ContainerViewLogo> */}
                <View style={{ paddingBottom: height * 0.0324, justifyContent: 'center', alignItems: 'center' }}>
                  <Title paddingBottom={height * 0.0216}>
                    Tire sua segunda via aqui!
                  </Title>
                  <Image
                    source={require('../../assets/images/icQrCode.png')}
                    style={{ width: 250, height: 250 }}
                  />
                  <Label>
                    Se voce perdeu, nao recebeu sua conta ou precisa
                    de um comprovante de residência, solicite aqui a
                    segunda via.</Label>
                  <Label>O pagamento é rápido e simples e pode ser feito a
                    qualquer momento!
                  </Label>
                </View>

                <ContainerViewButton>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Não mostrar mais essa mensagem</Text>
                  </View>
                  <Button
                    title="Iniciar"
                    type="secondary"
                    // onPress={handleSignIn}
                    onPress={handleClick}
                    isLoading={isLogging}
                  />

                </ContainerViewButton>
                {ModalLoading(isLoading)}
              </MainGenericContainer>
            </ScrollView>
          </>
        
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
    marginVertical: 40,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});