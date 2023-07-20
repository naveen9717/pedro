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
  TouchableWithoutFeedback,
  ActivityIndicator

} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Label, Title, ContainerViewButton, ContainerViewLogo } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../../components/Containers/index';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { Button } from '../../../components/Button';
import { SmallButton } from '../../../components/SmallButton';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../../components/Button/styles';
import { RootState } from '../../../redux/reducer';
import { AlertModal } from '../../../components/Modal/AlertModal';
import CardMain from '../../../components/CardMain';
import CardChild from '../../../components/CardChild';
import Modal from "react-native-modal";
import DateRangePicker from "rnv-date-range-picker";
import moment from 'moment'
import ContaServices from '../../../shared/services/ContaServices';
import {AccessibilityWidget} from '../../../components/AccessibilityWidget';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export function InvoiceHome() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Todos");
  const [active, setActive] = useState(false);
  const[Loading,setLoading] = useState(true);


  const [dataMain, setDataMain] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [selectedRange, setRange] = useState({firstDate:'03',secondDate:'06'});


  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalPixVisible, setModalPixVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalPix = () => {
    setModalPixVisible(!isModalPixVisible)
  }

  const netInfo = useNetInfo();


// console.log('text',text);

  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{ title: string; msg: string }>({
    title: '',
    msg: '',
  });

  // console.log('dataSource:', dataSource);
  // console.log('dataMain:', dataMain);


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
    //Get Conat Data List
    ContaServices.getDataContaList().then((res) => {
      setDataSource(res.data.debitos);
      // setLoading(false); 
  });
  //Get Conat Data Main
  ContaServices.getDataConta().then((res) => {
    // console.log('Main',res.data)
    setDataMain({data: res.data});
    setLoading(false); 
  });
  }, []);

  const { height } = Dimensions.get('window');
 
  const theme = useTheme();
  
  const { goBack } = useNavigation();

  function handleHome() {
    navigation.navigate('')
  }

  function handleChild() {
    navigation.navigate('Meus dados')
  }

 
  const handlePagar = () => {
    navigation.navigate('PaymentInvoice', {CardData:dataSource});
  };

  function handleChild2(value){
    console.log('datavalue',value)
    // navigation.navigate('Ajuda',{datavalue:value})
    navigation.navigate({
      name: 'InvoiceEasy',
      params: { post: value },
    });
  }
  const handleClick = () => {
    toggleModalPix()
    navigation.navigate('Info')
  };


  function handlePix() {
    toggleModalPix()

    const result = dataSource.filter(d=>d.mesReferencia == moment(selectedRange?.secondDate).format('YYYY/MM'));
    // console.log("resultremaining",result);
    // console.log("dateselectedsecond", moment(selectedRange?.secondDate).format('YYYY/MM'));
    // console.log("status", status);

    setDataSource(result);
  }

  function handleClickHist() {
    navigation.navigate('InvoiceHistoryChart')
    }


const list = () => {
  return dataSource?.map(element => {
    return (
      <CardChild
      key={element?.mesReferencia}
      title="Conta de energia"
      status={element?.statusPagamento}
      code_install={element?.codigoParceiroNegocio}
      mesReferencia={element?.mesReferencia}
      dataVencimento={element?.dataVencimento}
      // parcelamentoD={element?.parcelamentoDisponivel}
      contaMinima={element?.contaMinima}
      valorContaAtual={element?.valor}
      periodoConsumo={element?.periodoConsumo}
      onPress={handlePagar}
      onPress2={ () => handleChild2(element?.periodoConsumo) }
    />        
     
    );
  });
};

let DataSecondary = (dataSource.length >=1 ) ? list() : <View style={{flex:1,justifyContent: "center",alignItems: "center"}}><Text>NO DATA FOUND IN SELECTED FILTER</Text></View>;

function webViewRender(step: number) {
    throw new Error('Function not implemented.');
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
              <MainGenericContainer style={{ paddingTop: height * 0.02 }}>
                  { Loading ? <ActivityIndicator color="#000" size="large" style={styles.activity}/> :<>
                <View style={{ paddingBottom: height * 0.0324, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Title paddingBottom={height * 0.0216}>Minha conta atual</Title>
                  <Text style={styles.label}>Procotocolo: 000000000</Text>
                </View>
                
                <View style={styles.checkboxContainer}>
                {/* Optional chaining used while api get data*/}
                <CardMain 
                    key={1}
                    title="Instalaçãão"
                    code_install={dataMain.data?.codigoInstalacao}
                    status={dataMain.data?.statusPagamento}
                    parcelamentoD={dataMain.data?.parcelamentoDisponivel}
                    valorContaAtual={dataMain.data?.valorContaAtual}
                    address={dataMain.data?.enderecoInstalacao}
                    // address={dataMain.data?.endereco.logradouro+','+dataMain.data?.endereco.localizacao+' - '+dataMain.data?.endereco.bairro+dataMain.data?.endereco.municipio+'/'+dataMain.data?.endereco.uf+' - CEP '+dataMain.data?.endereco.cep}
                  />  
               
                 <View style={styles.filter}>
                 
                 <View style={styles.filterInner}>
                   <Text style={styles.filtertext}>Status: {status}</Text>
                 </View>
                 <View style={styles.filterInner}>
                 {/* let result = condition ? value1 : value2; */}
                 {/* moment(selectedRange?.firstDate, 'YYY-MM-DD').format('DD/MM')} - {moment(selectedRange?.secondDate, 'YYY-MM-DD').format('DD/MM') */}
                   <Text style={styles.filtertext}>Período: {moment(selectedRange?.firstDate).format('MMM/YYYY')} - {moment(selectedRange?.secondDate).format('MMM/YYYY')}</Text>
                 </View>
                   <View style={styles.iconouter}>
                     <TouchableWithoutFeedback onPress={handlePix}>
                     <AntIcon name="filter" color="#FFFFFF" size={13} />
                    </TouchableWithoutFeedback>
                   </View>
                 </View>

                 <View style={styles.viewicon}>
                   <View style={{ flexDirection: 'row', }}>
                    <View style={styles.filtertexticon}>
                      <MaterialIcons name="file-download" color="#FFFFFF" size={13} />
                    </View>
                    <View>
                        <Text style={styles.filtertext}> Baixar todas faturas</Text>
                    </View>
                  </View>

                 <View>
                   <TouchableWithoutFeedback onPress={handleClickHist}>
                     <Text style={styles.second}>Ver histórico de consumo <AntIcon name="right" color="#02ade1" size={13} /> </Text>
                   </TouchableWithoutFeedback>
                 </View>
                </View>

                 <View style={{marginVertical:15}}>
                   {/* {list()} */}
                   {DataSecondary}
                 </View>
                </View>

                {/* {ModalLoading(isLoading)} */}
                </>
}
              </MainGenericContainer>

              <View style={{ flex: 1 }}>
                <Modal isVisible={isModalPixVisible} style={{ margin: 0 }}>
                  <TouchableWithoutFeedback onPress={handlePix}>
                    <View style={styles.handlepixview}>
                      <View style={styles.bordercorner}>
                        <View style={{ flex: 1 }}>
                          <View style={[styles.boxcontainer]}>
                            <View style={{ marginVertical: 3 }}>
                              <Text style={styles.mediumtextbold}>Filtros</Text>
                              <Text style={styles.smalltext}>Selecione os filtros de instalação</Text>
                            </View>
                            <ContainerViewButton>
                             <View style={styles.viewtouch}>
                               <TouchableWithoutFeedback onPress={() => setStatus("Paga")}><Text style={[styles.input,{color:'#167a51',backgroundColor:'#e1e874',paddingHorizontal:20,borderColor:'#e1e874'}]}>Paga</Text></TouchableWithoutFeedback>
                               <TouchableWithoutFeedback onPress={() => setStatus("Aberta")}><Text style={[styles.input,{color:'#f37040',backgroundColor:'#fed26c',paddingHorizontal:20,borderColor:'#fed26c'}]}>Aberta</Text></TouchableWithoutFeedback>
                               <TouchableWithoutFeedback onPress={() => setStatus("Vencida")}><Text style={[styles.input,{color:'#c6252a',backgroundColor:'#f8b1ab',paddingHorizontal:20,borderColor:'#f8b1ab'}]}>Vencida</Text></TouchableWithoutFeedback>
                             </View>
                            </ContainerViewButton>

                            <View style={{ marginVertical: 3 }}>
                              <Text style={styles.mediumtextbold}>Período de referência </Text>
                              <Text style={styles.smalltext}>Na opção período personalizado, você pode acessar as contas dos últimos 10 anos. Busque em intervalos de até 12 meses.</Text>
                            </View>
                            <ContainerViewButton>
                            <View style={styles.viewtouch}>
                               <TouchableWithoutFeedback onPress={() => setText("3 messes")}><Text style={styles.input}>3 messes</Text></TouchableWithoutFeedback>
                               <TouchableWithoutFeedback onPress={() => setText("6 messes")}><Text style={styles.input}>6 messes</Text></TouchableWithoutFeedback>
                               <TouchableWithoutFeedback onPress={() => setText("Personalizado")}><Text style={styles.input}>Personalizado</Text></TouchableWithoutFeedback>
                            </View>
                            </ContainerViewButton>
                            <View style={{ marginVertical: 3 }}>
                              <Text style={styles.mediumtextbold}>ou Selecione o período </Text>
                            </View> 
                           <View>
                                <DateRangePicker
                                    onSelectDateRange={(range) => {
                                    setRange(range);
                                    }}
                                    blockSingleDateSelection={true}
                                    responseFormat="YYYY-MM-DD"
                                    // maxDate={moment()}
                                   //  minDate={moment().subtract(100, "days")}
                                  />
                            </View>
                            <ContainerViewButton>
                              <Button
                                title="Aplicar filtros"
                                type="secondary"
                                // onPress={handleSignIn}
                                onPress={handlePix}
                                isLoading={isLogging}
                              />
                            </ContainerViewButton>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewtouch:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginVertical: 3
  },
  viewicon:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:15
  },
  handlepixview:{
    height: '85%',
    backgroundColor: 'white',
    marginTop: '35%',
    width: '100%'
  },
  bordercorner:{
    flex: 1,
    marginTop: -30,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: 'white',
    paddingVertical: 4,
  },
  checkboxContainer: {
    marginBottom: 10,
  },
  activity:{
    flex: 1,
    marginTop:240,
    justifyContent: 'center',
    alignItems:'center'
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
  filter:{
    flexDirection:'row'
  },
  filterInner:{
    paddingVertical:6,
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:'#02ade1',
    marginHorizontal:8,
    borderRadius:10
  },
  filtertext:{
    fontSize:11
  },
  filtertexticon:{
    backgroundColor:"#80c342",
    width:22,
    height:22,
    borderRadius:22,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center'
  },
  input: {
    height: 25,
    margin: 4,
    padding: 4,
    borderWidth: 1,
    borderRadius:4,
    fontWeight:'600'
 },
  icon:{
    width:15,
    height:15
  },
  iconouter:{
    width:30,
    height:30,
    backgroundColor:'#02ade1',
    borderRadius:15,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  // amount: {
  //   marginBottom: 10,
  //   fontSize: 22,
  //   fontWeight: '600'
  // },
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
    marginVertical: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
    backgroundColor: '#f8b1ab',
    color: 'maroon',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  // onpress: {
  //   paddingVertical: 2,
  //   paddingHorizontal: 10,
  //   backgroundColor: 'maroon',
  //   borderRadius: 5
  // },
  first: {
    color: 'black'
  },
  white: {
    color: 'white',
    textAlign: 'center'
  },
  second: {
    fontWeight: '500',
    color: '#02ade1',
    fontSize:12
  },
  // bartext: {
  //   fontWeight: '500',
  //   color: '#02ade1',
  //   fontSize: 10
  // },
  bar: {
    width: 30,
    height: 20,
    marginTop:-10
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  bottom: {
    marginVertical: 20,
    fontSize: 8
  },
  boxcontainer: {
    paddingHorizontal: 50
  },
  // scanicons: {
  //   height: 120,
  //   width: 120,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }
});