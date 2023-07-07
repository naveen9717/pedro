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
  Text,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
// Alert, Modal, StyleSheet, Text, Pressable, View
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import { Label, Title, ContainerViewButton, ContainerViewLogo } from './styles';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../../components/Containers/index';
// import Widget from '../../components/Widget';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { Button } from '../../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../../components/Button/styles';
import { RootState } from '../../../redux/reducer';
import { AlertModal } from '../../../components/Modal/AlertModal';
import ClipboardToast from 'react-native-clipboard-toast';
import { Card, Snackbar } from 'react-native-paper';
import Modal from "react-native-modal";
import ContaServices from '../../../shared/services/ContaServices';
import OtherDataServices from '../../../shared/services/OtherDataServices';
import QRCode from 'react-native-qrcode-svg';
import AntIcon from 'react-native-vector-icons/AntDesign';
import CardChildSecond from '../../../components/CardChildSecond';

import RNShareFile from 'react-native-share-pdf';

export function PaymentInvoice({ route, navigation }) {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  // const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [isSelected, setSelection] = useState(true);
  const [dataMain, setDataMain] = useState(undefined)
  const [dataSource, setDataSource] = useState('')

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisiblePop, setModalVisiblePop] = useState(false);
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const [isModalPixVisible, setModalPixVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setDataMain(dataMain);
  };

  
  // const { email, numeroProtocolo,dataEnvio } = route.params;

  const toggleModalPix = () => {
    setModalPixVisible(!isModalPixVisible)
  }

  const toggleModalPop = () => {
    setModalVisiblePop(!isModalVisiblePop)
  }
 
  const netInfo = useNetInfo();

  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{ title: string; msg: string }>({
    title: '',
    msg: '',
  });

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
    console.log('routeparams',route.params);
  //Get Conat Data Main
  ContaServices.getDataConta().then((res) => {
    // console.log('Main',res.data)
    setDataMain({data: res.data});
  });

  OtherDataServices.getInvoiceData().then((res) => {
    setDataSource(res.data);
});

  }, []);

  const { height } = Dimensions.get('window');
 
  const theme = useTheme();
  const changeStep = (s: number) => {
    setStep(s);
  };
  const { goBack } = useNavigation();
  const [btnClick, setBtnClick] = useState(0);

  const handleClickBack = () => {
    // toggleModalPix()
    navigation.navigate('InvoiceHome')
  };
  function handleHome() {
    changeStep(0);
  }

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

  const handleClick = () => {
    // toggleModalPix()
    setModalVisible(!isModalVisible);
    navigation.navigate('InvoicePaymentInfoSuccess')
  };

  const handleClickCopiar = () => {
    // toggleModalPix()
    setModalPixVisible(!isModalPixVisible);
    navigation.navigate('InvoiceSolicitedInfo')
    
  };

  const handleClickEnviar = () => {
    // toggleModalPix()
    setModalVisible(!isModalVisible);
    navigation.navigate('InvoiceSendToHome', {
      itemId: 1,
      otherParam: 'Enviar por correspondência',
    });
    
  };

  const handleClickPDF = () => {
    // toggleModalPix()
    setModalVisible(!isModalVisible);
    navigation.navigate('InvoiceDownload', {
      itemId: 2,
      otherParam: 'Enviar por correspondência',
    });
  };

  const handleClickPix = () => {
    // Como realizar seu pagamento via Pix?
    setModalPixVisible(!isModalPixVisible);
    navigation.navigate('InvoicePixPayment');
  };

  const handleClickBarras = () => {
    // Como realizar seu pagamento via Código barras?>
    setModalVisible(!isModalVisible);
    navigation.navigate('InvoiceBillPayment');
  };

  const handlePagar = () => {
    navigation.navigate('PaymentInvoice', {CardData:dataSource});
  };

  function handleChild2() {
    navigation.navigate('Ajuda')
  }

  const DataSecondary = () => {
    return route.params.CardData?.map(element => {
      return (
        <CardChildSecond
        key={element?.mesReferencia}
        title="Conta de energia"
        status={element?.statusPagamento}
        code_install={element?.codigoParceiroNegocio}
        mesReferencia={element?.mesReferencia}
        dataVencimento={element?.dataVencimento}
        // parcelamentoD={element?.parcelamentoDisponivel}
        contaMinima={element?.contaMinima}
        valorContaAtual={element?.valor}
        // onPress={handlePagar}
        // onPress2={handleChild2}
      />        
      );
    });
  };

  const CodigoBarra = (props)=>{
    console.log('propsnew',props.dataCodigoMain?.data);
    return (
      <View
      style={{height: '70%',backgroundColor: 'white',marginTop: '80%',width: '100%'}}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View
          style={styles.bordercorner}>
          <View
            style={{flexDirection: 'row',height: '100%',marginTop: 10,}}>
            <View style={[styles.boxcontainer]}>
              <View style={{ marginVertical: 12 }}>
                <Text style={styles.mediumtextbold}>Pagamento via código de barras</Text>
                <Text style={styles.smalltext}>O pagamento por código de barras pode levar</Text>
                <Text style={styles.smalltext}>até 3 dias úteis para ser confırmado</Text>
              </View>
              <View style={{ backgroundColor: 'lightgrey', padding: 10 }}>
                <Text style={[styles.smalltext, { textAlign: 'center' }]}>{props.dataCodigoMain?.data.pagamentoCodigoBarra}</Text>
              </View>
              <ContainerViewButton>
                <View style={{ marginVertical: 10 }}></View>
                <Button
                  title="Copiar código de barras"
                  type="secondary"
                  Icon="copy"
                  IconColor="#FFFFFF"
                  bgColor="#2da55d"
                  onPress={handleClick}
                  isLoading={isLogging}
                />
                <View style={{ marginVertical: 10 }}></View>
                <Button
                  title="Visualizar PDF"
                  type="secondary"
                  Icon="copy"
                  IconColor="#FFFFFF"
                  onPress={handleClickPDF}
                  isLoading={isLogging}
                />
                <View style={{ marginVertical: 10 }}></View>
                <Button
                  title="Compartilhar"
                  type="primary"
                  Icon="share-2"
                  IconColor="#02ade1"
                  onPress={SharePdf}
                  isLoading={isLogging}
                />
                <View style={{ marginVertical: 10 }}></View>
                <Button
                  title="Enviar por correspondência"
                  type="primary"
                  Icon="mail"
                  IconColor="#02ade1"
                  onPress={handleClickEnviar}
                  isLoading={isLogging}
                />
              </ContainerViewButton>
              <View style={styles.bottom}>
              <TouchableOpacity onPress={handleClickBarras}>
                <Text style={styles.second}>Como realizar seu pagamento via Código barras?<AntIcon name="right" color="#02ade1" size={10} /></Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
    )
  }

  const ModalPix = (props)=>{
    console.log('pixnew',props.dataPixMain?.data);
    return (
     
            <TouchableWithoutFeedback onPress={toggleModalPix}>
                    <View
                      style={{height: '80%', backgroundColor: 'white', marginTop: '80%',width: '100%'}}>
                      <View
                        style={{
                          flex: 1,
                          marginTop: -30,
                          borderTopRightRadius: 40,
                          borderTopLeftRadius: 40,
                          backgroundColor: 'white',
                          paddingVertical: 5,
                        }}>
                        <View style={{ flex: 1 }}>
                          <View style={[styles.boxcontainer]}>
                            <View style={{ marginVertical: 12 }}>
                              <Text style={styles.mediumtextbold}>Pagamento via PIX</Text>
                              <Text style={styles.smalltext}>Copie o código PIX ou leia o QR Code para pagar</Text>
                              <Text style={styles.smalltext}>su a conta! Tenha agilidade na baixa da conta no</Text>
                              <Text style={styles.smalltext}>mesmo dia!</Text>
                            </View>
                            <View style={{marginVertical:15}}>
                            <ContainerViewButton>
                              <Button
                                title="Copiar código PIX"
                                type="secondary"
                                Icon="copy"
                                IconColor="#FFFFFF"
                                onPress={handleClickCopiar}
                                isLoading={isLogging}
                              />
                            </ContainerViewButton>
                          </View>
                            <View style={styles.checkboxContainer}>
                              <Text style={styles.mediumtext}>Ou ler o QR code</Text>
                              <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <QRCode value={props.dataPixMain?.data.pagamentoCodigoPix.pix}/>
                                </View>
                                <View style={[styles.bottom,{justifyContent: 'center', alignItems: 'center',marginVertical:50}]}>
                                <TouchableOpacity onPress={handleClickPix}>
                                 <Text style={styles.second}>Como realizar seu pagamento via Pix?<AntIcon name="right" color="#02ade1" size={10} /></Text></TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                    </View>
                </View>
              </View>
         </TouchableWithoutFeedback>
    )
  }


  const RiscodeCorte = (props)=>{
    console.log('propsnew',props.dataMain?.data);
    return (
     
      <View style={{height: '90%',backgroundColor: 'white',width: '100%'}}>
        <TouchableWithoutFeedback onPress={toggleModalPix}>
         <View style={{flex: 1,marginTop: -30,backgroundColor: 'white',}}>
         <View style={{flexDirection: 'row',height: '100%',marginTop: 10,}}>
         <View style={[styles.boxcontainer]}>
          <View style={{ marginVertical: 10 }}>
          <Text style={[styles.mediumtextbold,{ textAlign: 'center'}]}>Aviso importante!</Text>
          <Text style={styles.smalltext}>Não ldentificamos o pagamentos das suas</Text>
          <Text style={styles.smalltext}>s contas, por este motivo seu imóvel</Text>
          <Text style={styles.smalltext}>ujeito a suspensão de energia</Text>
          <Text style={styles.smalltext}>elétrica.</Text>
         </View>
         <View style={{ marginVertical: 10 }}>
          <Text style={styles.smalltext}>Para evitar que issO aconteça, pedimos que</Text>
          <Text style={styles.smalltext}>regularize os débitos até a data do reaviso</Text>
          <Text style={styles.smalltext}>Xx/XX/XXXX.</Text>
         </View>
         <View style={{ marginVertical: 10 }}>
          <Text style={styles.smalltext}>Se voce ja efetuouo pagamento, pedimos</Text>
          <Text style={styles.smalltext}>que desconsidere este aviso. O</Text>
          <Text style={styles.smalltext}>processamento</Text>
          <Text style={styles.smalltext}>do pagamento poderá ocorrer em até 72hs.</Text>
         </View>

         <View style={{ marginVertical: 10 }}>
          <Text style={styles.smalltext}>Se o pagamento foi realizado após a data</Text>
          <Text style={styles.smalltext}>do reavis0, pedimos que fique atento e</Text>
          <Text style={styles.smalltext}>pacompanhe o processamento por aqui,</Text>
          <Text style={styles.smalltext}>pois, se nossa equipe comparecer no local</Text>
          <Text style={styles.smalltext}>para efetuar a suspensão do fornecimento,</Text>
          <Text style={styles.smalltext}>você deverá apresentar os comprovantes.</Text>
        </View>
    
        <ContainerViewButton>
         <View style={{ marginVertical: 8 }}></View>
         <Button
           title="Realizar pagamento"
           type="secondary"
           // onPress={handleSignIn}
           onPress={toggleModalPop}
           isLoading={isLogging}
         />
        <View style={{ marginVertical: 8 }}></View>
        <Button
         title="Já realizei o pagamento, preciso religar"
         type="secondary"
         // onPress={handleSignIn}
         onPress={toggleModalPop}
         isLoading={isLogging}
       />
       <View style={{ marginVertical: 8 }}></View>
       <Button
         title="Fechar"
         type="secondary"
         // onPress={handleSignIn}
         onPress={toggleModalPop}
         isLoading={isLogging}
       />
       <View style={[styles.checkboxContainer,{ flexDirection: 'row'}]}>
          <CheckBox
           value={isSelected}
           onValueChange={setSelection}
           style={styles.checkbox}
           tintColors={{ true: '#02ade1', false: 'black' }}
        />
        <Text style={[styles.smalltext,{ marginVertical: 8}]}>Não mostrar mais essa mensagem hoje</Text>
      </View>
     </ContainerViewButton>
   </View>
 </View>
</View>
</TouchableWithoutFeedback>
</View>
    )
  }

  return (
    <>
      <AlertModal
        showModal={showModal}
        setShowModal={handleModal}
        msg={modalInfo.msg}
        title={modalInfo.title}
      />
     
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.BACKGROUND }}>
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
              onBackPress={async () => handleClickBack()}
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
              <MainGenericContainer style={{ paddingTop: height * 0.02}}>
                <View style={{ paddingBottom: height * 0.0324, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Title paddingBottom={height * 0.0216}>Pagmenta da conta</Title>
                  <Text style={styles.label}>Procotocolo: 000000000</Text>
                </View>
                <View style={styles.checkboxContainer}>
                {DataSecondary()}
                  {/* <Card style={{ backgroundColor: 'white' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text style={[styles.smalltext,{fontSize:10,fontWeight:'600'}]}>Parcelamento em código de barras</Text>
                          <Text style={styles.amount}>R$ 124.153,58</Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={toggleModalPop}
                            style={styles.onpress}>
                            <Text style={[styles.smalltext,{ fontSize:10,color: 'white' }]}>Risco de corte </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',borderTopColor:'#f1f1f1',borderTopWidth:1,paddingVertical:10 }}>
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
                  </Card> */}
                </View>
                
                <View style={styles.checkboxContainer}>
                  <Text style={styles.mediumtext}>Método de pagamento</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.cardFirstStyle}>
                      <Card style={{ backgroundColor: 'white', borderRadius: 10, borderBottomEndRadius: 0, borderTopEndRadius: 0, marginTop: 2, }}>
                        <Card.Content>
                          <View style={{ flexDirection: 'row' }}>
                            <View>
                              <Text style={[styles.smalltext,{fontWeight:'500'}]}>Pagar</Text>
                              <Text style={[styles.smalltext, {marginBottom:10,fontWeight:'500'}]}>com Pix</Text>
                              <Image
                                source={require('../../../assets/icons/icGroup.png')}
                                style={styles.icon}
                              />
                            </View>
                          </View>
                        </Card.Content>
                      </Card>
                    </View>
                    <View style={styles.cardSecondStyle}>
                      <Card.Content>
                        <View style={styles.container}>
                          <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 20 }}>
                            <View style={styles.container}>
                            <TouchableWithoutFeedback onPress={onToggleSnackBar}><Text style={styles.white}>{visible ? 'Copia e cola' : 'Copia e cola'}</Text></TouchableWithoutFeedback>
                             </View>
                            </View>
                            <View style={{ borderBottomColor: '#4ec6ea', borderBottomWidth: 1, flex: 1, width: 220 }} />
                            <TouchableOpacity onPress={toggleModalPix}>
                              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 20 }} >
                                <Text style={styles.white}>Ver QR code</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Card.Content>
                    </View>
                  </View>
                  <Snackbar
                      wrapperStyle={{backgroundColor:'transparent',marginVertical:"90%"}}
                      style={{backgroundColor:"#80c342",width:"100%"}}
                      duration={500}
                      visible={visible}
                      onDismiss={onDismissSnackBar}
                      action={{
                            label: '',
                            onPress: () => {
                            // Do something
                        },
                      }}>
                        <Text style={{color:"#FFFFFF",fontSize:12,width:"100%"}}><AntIcon name="check" color="#FFFFFF" size={15} /> Código PIX copiado com sucesso</Text>
                  </Snackbar>
                </View>

                <TouchableWithoutFeedback onPress={toggleModal}>
                  <Card style={{ backgroundColor: '#fff', width: '28%' }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                          <AntIcon name="barcode" color="#000000" size={30} />
                          <Text style={[styles.bartext, {marginTop:5}]}>Código de</Text>
                          <Text style={[styles.bartext, {marginTop:2, marginBottom:-2}]}>barra</Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableWithoutFeedback>
              </MainGenericContainer>

              <View style={{ flex: 1 }}>
                <Modal isVisible={isModalVisible} style={{ margin: 0 }}>
                   <CodigoBarra dataCodigoMain={dataMain}/>
                </Modal>
              </View>
              <View style={{ flex: 1 }}>
                <Modal isVisible={isModalPixVisible} style={{ margin: 0 }}>
                 <ModalPix dataPixMain={dataMain}/>
                </Modal>
              </View>
              <View style={{ flex: 1 }}>
               <Modal isVisible={isModalVisiblePop}>
                 <RiscodeCorte/>
              </Modal>
          </View>
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
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  bordercorner:{
    flex: 1,
    marginTop: -30,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  cardFirstStyle:{
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1.5,
  },
  cardSecondStyle:{
    alignItems: 'center',
    backgroundColor: '#02ade1',
    justifyContent: 'center',
    flex:4,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomStartRadius: 0,
    borderTopLeftRadius: 0,
    marginTop: 2,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 5,
    fontSize: 10,
    color: '#02ade1',
    fontWeight: '600'
  },
  amount: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '600'
  },
  smalltext: {
    fontSize: 13,
    color: 'black',
  },
  mediumtext: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginVertical: 15,
  },
  mediumtextbold: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginVertical: 15,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
    backgroundColor: '#f8b1ab',
    color: '#c0151c',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  onpress: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#c0151c',
    borderRadius: 4
  },
  first: {
    color: 'black',
    fontSize:11
  },
  white: {
    color: 'white',
    textAlign: 'center'
  },
  second: {
    fontWeight: '500',
    color: '#02ade1',
    fontSize:11
  },
  bartext: {
    fontWeight: '500',
    color: '#02ade1',
    fontSize: 10
  },
  icon: {
    width: 40,
    height: 40,
    color: '#02ade1',
  },
  bar: {
    width: 30,
    height: 20,
    marginTop:-10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bottom: {
    marginVertical: 20,
    fontSize: 8,
  },
  boxcontainer: {
    paddingHorizontal: 50
  },
  scanicons: {
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  }
});