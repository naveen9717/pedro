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
  ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Title, ContainerViewButton} from './styles';
import Moment from 'moment'
import {useTheme} from 'styled-components/native';
import {MainGenericContainer} from '../../../components/Containers/index';
import {HeaderCustom} from '../../../components/HeaderCustom';
import {Button} from '../../../components/Button';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext, AuthContextProps} from '../../../contexts/useAuth';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../../components/Button/styles';
import {RootState} from '../../../redux/reducer';
import {AlertModal} from '../../../components/Modal/AlertModal';
import ContaServices from '../../../shared/services/ContaServices';
import OtherDataServices from '../../../shared/services/OtherDataServices';

import RNShareFile from 'react-native-share-pdf';

export function InvoiceSendedWithSuccess({route}) {
  const {b2cLogin} = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [dataMain, setDataMain] = useState({})
  const[Loading,setLoading] = useState(true);
  const[dataSource, setDataSource] = useState('')

 console.log('routedata',route.params)
  const netInfo = useNetInfo();

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
  //Get Conat Data Main
  ContaServices.getDataConta().then((res) => {
    // console.log('Main',res.data)
    setDataMain({data: res.data});
    setLoading(false); 
  });

  OtherDataServices.getInvoiceData().then((res) => {
    setDataSource(res.data);
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
                  <Title paddingBottom={height * 0.0216}>Conta reenviada para o seu endreço!</Title>
                  <Image
                    source={require('../../../assets/images/icOnlineWorking.png')}
                    style={{width: 250,height: 250}}
                  />
                  <View style={{backgroundColor:'#f4f4f4',padding:15,width:'100%'}}>
                    <Text style={styles.mediumtext}>Não esqueça de salvar seu protocolo!</Text>
                    <Text style={styles.largetext}>PROTOCOLO #{route.params?.dataSource.numeroProtocolo}</Text>
                    <Text style={styles.smallertext}>Serviço realizado às {Moment(route.params?.dataSource.dataEnvio).format('LT')} {Moment(route.params?.dataSource.dataEnvio).format('DD/MM/YYYY')}</Text>
                  </View>
                  <View style={{marginVertical:15}}>
                    <Text style={styles.mediumtextbold}>A sua conta foi reenviada para o endereços abaixo</Text>
                    { Loading ? <ActivityIndicator color="#000" size="large" /> :<>
                    <Text style={[styles.smalltext,{textAlign: 'center',marginVertical:5}]}>{dataMain.data?.endereco.logradouro+','+dataMain.data?.endereco.localizacao+' - '+dataMain.data?.endereco.bairro+dataMain.data?.endereco.municipio+'/'+dataMain.data?.endereco.uf+' - CEP '+dataMain.data?.endereco.cep}</Text>
                    </>
                    }
                  </View>
                  <View>
                    <Text style={styles.smalltext}>O prazo para entrega da segunda via da conta é de cinco</Text>
                    <Text style={styles.smalltext}>dias úteis e terá um custo de R$1,24, a ser cobrado em</Text>
                    <Text style={styles.smalltext}>sua próxima fatura.</Text>
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