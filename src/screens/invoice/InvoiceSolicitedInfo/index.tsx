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

import {Label, Title, ContainerViewButton, ContainerViewLogo} from './styles';
import {AccessibilityWidget} from '../../../components/AccessibilityWidget';
import {useTheme} from 'styled-components/native';
import {MainGenericContainer} from '../../../components/Containers/index';
import {HeaderCustom} from '../../../components/HeaderCustom';
import {Button} from '../../../components/Button';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext, AuthContextProps} from '../../../contexts/useAuth';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../../components/Button/styles';
import {RootState} from '../../../redux/reducer';
import {AlertModal} from '../../../components/Modal/AlertModal';

export function InvoiceSolicitedInfo() {
  const {b2cLogin} = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const netInfo = useNetInfo();

  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{title: string; msg: string}>({
    title: '',
    msg: '',
  });

  const [freeInternetDate, setFreeInternetDate] = useState<Date | null>(null);

  const isLoading: boolean = useSelector(
    (state: RootState) => state.BffAuthIsLoading.isLoading,
  );


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
 
  }, []);

  const {height} = Dimensions.get('window');
 

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
    // navigation.navigate('MinhaContaAtual');
  };

  return (
    <>
      <AlertModal
        showModal={showModal}
        setShowModal={handleModal}
        msg={modalInfo.msg}
        title={modalInfo.title}
      />
     
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
              leftAction={'back'}
            />
            <AccessibilityWidget
            marginTop={
              Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }
            />
            <ScrollView>
              <MainGenericContainer style={{paddingTop: height * 0.02, height: height}}>
                <View style={{paddingBottom: height * 0.0324,justifyContent: 'center',alignItems: 'center'}}>
                  <Title paddingBottom={height * 0.0216}>Informações do pagamento solicitada!</Title>
                  <Image
                    source={require('../../../assets/images/icOnlineWorking.png')}
                    style={{width: 250,height: 250}}
                  />
                  <View style={{backgroundColor:'#f4f4f4',padding:15,width:'100%'}}>
                  <Text style={styles.mediumtext}>Não esqueça de salvar seu protocolo!</Text>
                  <Text style={styles.largetext}>PROTOCOLO #2019059128127</Text>
                  <Text style={styles.smallertext}>Serviço realizado às 10:05 12/10/2021</Text>
                 </View>
                   <View style={{marginVertical:15}}>
                  <Text style={styles.mediumtextbold}>Confira detalhes do seu pagamento:</Text>
                  <Text style={styles.mediumtext}>Estamos processando seu pagamento! Fique tranquilo que em breve será baixada! Caso receba ações de cobrança, elas serão automaticamente canceladas!</Text>
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
                    Icon="share-2"
                    IconColor="#02ade1"
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
            {/* <HeaderCustom
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
            /> */}
           
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