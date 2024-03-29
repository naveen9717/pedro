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
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext, AuthContextProps} from '../../../contexts/useAuth';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../../components/Button/styles';
import {RootState} from '../../../redux/reducer';
import {AlertModal} from '../../../components/Modal/AlertModal';
import OtherDataServices from '../../../shared/services/OtherDataServices';
import moment from 'moment'

import RNShareFile from 'react-native-share-pdf';
export function InvoiceSolicitedInfo() {
  const {b2cLogin} = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const [step, setStep] = useState(0);
  const [dataSource, setDataSource] = useState('')
  const [proto, setProto] = useState('')


  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{title: string; msg: string}>({
    title: '',
    msg: '',
  });


  const isLoading: boolean = useSelector(
    (state: RootState) => state.BffAuthIsLoading.isLoading,
  );

  const mockData = {
    filename: 'Invoice.pdf',
    document: `${dataSource?.binarioPDF}`
  }
  const SharePdf = async () => {
      const showError = await RNShareFile.sharePDF(mockData.document, mockData.filename);
    if (showError) {
      // Do something with the error
    }
  }
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
    //Get History Data List
    OtherDataServices.getInvoiceData().then((res) => {
     if (res.status==200) {
      setDataSource(res.data);
    } else {
      return {error: 'Internal Server Error'};
    }
 });
  //Put putBloquearData
  OtherDataServices.putBloquearData().then((res) => {
    if (res.status==200) {
      setProto(res.data);
    } else {
      return {error: 'Internal Server Error'};
    }
});
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
                    style={styles.imageSize}
                  />
                  <View style={styles.bpaddWidth}>
                  <Text style={styles.mediumtext}>{proto?.mensagem}!</Text>
                    <Text style={styles.largetext}>PROTOCOLO #{proto?.protocolo}</Text>
                    <Text style={styles.smallertextgrey}>Serviço realizado às {moment(proto?.dataProtocolo).format('HH:MM DD/MM/YYYY')}</Text>
                 </View>
                  <View style={styles.mV_15}>
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
                    onPress={SharePdf}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>
                {ModalLoading(isLoading)}
              </MainGenericContainer>
            </ScrollView>
          </>
        ) : (
          <>
            
           
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
  mV_15:{
    marginVertical:15
  },
  bpaddWidth:{
    backgroundColor:'#f4f4f4',
    padding:15,
    width:'100%'
  },
  imageSize:{
    width: 250,
    height: 250
  },
  smalltext:{
    fontSize:12,
  },
  smallertext:{
    fontSize:12,
    textAlign:'center'
  },
  smallertextgrey:{
    fontSize:12,
    textAlign:'center',
    color:'#778ca2'
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