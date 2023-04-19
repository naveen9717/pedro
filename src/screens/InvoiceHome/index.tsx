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
  FlatList

} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Label, Title, ContainerViewButton, ContainerViewLogo } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../components/Containers/index';
import { HeaderCustom } from '../../components/HeaderCustom';
import { Button } from '../../components/Button';
import { SmallButton } from '../../components/SmallButton';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../components/Button/styles';
import { RootState } from '../../redux/reducer';
import { AlertModal } from '../../components/Modal/AlertModal';
import CardMain from '../../components/CardMain';
import CardChild from '../../components/CardChild';
import Modal from "react-native-modal";
import DateRangePicker from "rnv-date-range-picker";
import moment from 'moment'
import ContaServices from '../../shared/services/ContaServices';
import {AccessibilityWidget} from '../../components/AccessibilityWidget';


export function InvoiceHome() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const [dataMain, setDataMain] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [selectedRange, setRange] = useState({});


  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalPixVisible, setModalPixVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalPix = () => {
    setModalPixVisible(!isModalPixVisible)
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

  console.log('Net Info:', netInfo);
  console.log('dataSource:', dataSource);
  console.log('dataMain:', dataMain);


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
      setDataSource(res.data);
  });
  //Get Conat Data Main
  ContaServices.getDataConta().then((res) => {
    // console.log('Main',res.data)
    setDataMain({data: res.data});
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


  const handleClick = () => {
    toggleModalPix()
    navigation.navigate('Info')
  };


  function handlePix() {
    toggleModalPix()
  }

  function handleClickHist() {
    navigation.navigate('InvoiceHistoryChart')
    }

  const renderItem = (data) => {
    return (
      <CardChild
      key={data.item?.mesReferencia}
      title="Conta de energia"
      status={data.item?.statusPagamento}
      code_install={data.item?.pagamentoCodigoBarra}
      mesReferencia={data.item?.mesReferencia}
      dataVencimento={data.item?.dataVencimento}
      parcelamentoD={data.item?.parcelamentoDisponivel}
      temParcelamentoEmA={data.item?.temParcelamentoEmAberto}
      valorContaAtual={data.item?.valorContaAtual}
      onPress={handleChild}
    />
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
                <View style={{ paddingBottom: height * 0.0324, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Title paddingBottom={height * 0.0216}>
                    Minha conta atual
                  </Title>
                  <Text style={styles.label}>Procotocolo: 000000000</Text>
                </View>
                <View style={styles.checkboxContainer}>
                {/* Optional chaining used while api get data*/}
                  <CardMain 
                    key={1}
                    title="Instalaçãão"
                    status='statusPagamento'
                    code_install={dataMain.data?.codigoInstalacao}
                    status={dataMain.data?.statusPagamento}
                    parcelamentoD={dataMain.data?.parcelamentoDisponivel}
                    valorContaAtual={dataMain.data?.valorContaAtual}
                    address="Avenida Norte Sul, 1000 - Taquaral
                Campinas/SP - CEP 13256-558"
                  /> 
                  
                 <View style={styles.filter}>
                 
                 <View style={styles.filterInner}>
                   <Text style={styles.filtertext}>Status: Todos</Text>
                 </View>
                 <View style={styles.filterInner}>
                   <Text style={styles.filtertext}>Período: {moment(selectedRange.firstDate, 'YYY-MM-DD').format('DD/MM')} - {moment(selectedRange.secondDate, 'YYY-MM-DD').format('DD/MM')}</Text>
                 </View>
                   <View style={styles.iconouter}>
                     <TouchableWithoutFeedback onPress={handlePix}>
                      <Image
                         source={require('../../assets/icons/icFilter.png')}
                         style={styles.icon}
                      />
                    </TouchableWithoutFeedback>
                   </View>
                 </View>

                 <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:15}}>
                 <View>
                   <Text style={styles.filtertext}>Baixar todas faturas</Text>
                 </View>
                 <View>
                 <TouchableWithoutFeedback onPress={handleClickHist}>
                   <Text style={styles.second}>Ver histórico de consumo></Text>
                   </TouchableWithoutFeedback>
                 </View>
                 </View>

                 <View style={{marginVertical:15}}>
                 <FlatList
                    data={dataSource}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.id.toString()}
                 /> 
                 </View>
                </View>

                {ModalLoading(isLoading)}
              </MainGenericContainer>

              <View style={{ flex: 1 }}>
                <Modal isVisible={isModalPixVisible} style={{ margin: 0 }}>
                  <TouchableWithoutFeedback onPress={handlePix}>
                    <View
                      style={{
                        height: '100%',
                        backgroundColor: 'white',
                        marginTop: '30%',
                        width: '100%'
                      }}>
                      <View
                        style={{
                          flex: 1,
                          marginTop: -30,
                          borderTopRightRadius: 40,
                          borderTopLeftRadius: 40,
                          backgroundColor: 'white',
                          paddingVertical: 4,
                        }}>

                        <View style={{ flex: 1 }}>
                          <View style={[styles.boxcontainer]}>
                            <View style={{ marginVertical: 8 }}>
                              <Text style={styles.mediumtextbold}>Filtros</Text>
                              <Text style={styles.smalltext}>Selecione os filtros de instalação</Text>
                            </View>
                            <ContainerViewButton>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between',marginVertical: 8 }}>
                            <SmallButton
                                title="Paga"
                                type="secondary"
                                // onPress={handleSignIn}
                                bgColor="#e1e874"
                                Color="#167a51"
                                onPress={handleClick}
                                isLoading={isLogging}
                              />
                              <SmallButton
                                title="Aberta"
                                type="secondary"
                                // onPress={handleSignIn}
                                bgColor="#fed26c"
                                Color="#f37040"
                                onPress={handleClick}
                                isLoading={isLogging}
                              />
                              <SmallButton
                                title="Vencida"
                                type="secondary"
                                bgColor="#f8b1ab"
                                Color="#c6252a"
                                // onPress={handleSignIn}
                                onPress={handleClick}
                                isLoading={isLogging}
                              />
                              
                             </View>
                            </ContainerViewButton>

                            <View style={{ marginVertical: 8 }}>
                              <Text style={styles.mediumtextbold}>Período de referência </Text>
                              <Text style={styles.smalltext}>Na opção período personalizado, você pode acessar as contas dos últimos 10 anos. Busque em intervalos de até 12 meses.</Text>
                            </View>
                            <ContainerViewButton>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between',marginVertical: 8 }}>
                              <SmallButton
                                title="3 meses"
                                type="primary"
                                // onPress={handleSignIn}
                                onPress={handleClick}
                                isLoading={isLogging}
                              />
                              <SmallButton
                                title="6 meses"
                                type="primary"
                                // onPress={handleSignIn}
                                onPress={handleClick}
                                isLoading={isLogging}
                              />
                              <SmallButton
                                title="Personalizado"
                                type="secondary"
                                // onPress={handleSignIn}
                                onPress={handleClick}
                                isLoading={isLogging}
                              />
                             </View>
                            </ContainerViewButton>
                            <View style={{ marginVertical: 8 }}>
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
                                   // minDate={moment().subtract(100, "days")}
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
    marginBottom: 10,
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
    paddingVertical:5,
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:'#02ade1',
    marginHorizontal:10,
    borderRadius:10
  },
  filtertext:{
    fontSize:12
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
  amount: {
    marginBottom: 10,
    fontSize: 22,
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
    color: 'maroon',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  onpress: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: 'maroon',
    borderRadius: 5
  },

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
    flexShrink: 1
  },
  bartext: {
    fontWeight: '500',
    color: '#02ade1',
    fontSize: 10
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
    fontSize: 8
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