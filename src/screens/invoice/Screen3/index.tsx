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
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent
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

import { Card, Paragraph } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Screen3() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [isSelected, setSelection] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisiblePop, setModalVisiblePop] = useState(false);

  const [isModalPixVisible, setModalPixVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
    console.log('clickdrawer');
    changeStep(0);
  }

  const handleClickPagar = () => {
    // toggleModalPix()
    navigation.navigate('Meus dados')
  };

  const handleClickDeta = () => {
    // toggleModalPix()
    navigation.navigate('Ajuda')
  };

  const handleClickDebit = () => {
    // toggleModalPix()
    navigation.navigate('Meus')
  };


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
              leftAction={'menu'}
            /> 
            <AccessibilityWidget
            marginTop={
              Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }
            />

            <ScrollView>
              <MainGenericContainer>

              <View style={{backgroundColor:"#02ade1",marginLeft:-40,marginRight:-40,paddingLeft:40,paddingRight:40,paddingVertical:20}}>
                      <View>
                        <Text style={[styles.filtertext,{color:'#FFFFFF'}]} > Olá. Gustavo Risonho</Text>
                        <Text style={[styles.filtertext,{color:'#FFFFFF'}]} > N° da instalação: 0123453333 </Text>
                      </View>

                      <View style={{marginVertical:15}}>
                        <Text style={[styles.filtertext,{color:'#FFFFFF'}]} > Avenida Paulista, 1000</Text>
                        <Text style={[styles.mediumtextbold,{color:'#FFFFFF'}]} > Como podemos ajudar hoje?</Text>
                      </View> 
              </View>
           
              <View style={{ paddingBottom: height * 0.0324,marginVertical:10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginVertical:5}}>
                 <View>
                  <Title>Minhas contas</Title>
                </View>
                  <View style={{ backgroundColor: '#04704e',padding:6,borderRadius:3,flexDirection:'row' }}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'white',marginHorizontal:2}]}>Bandeira verde</Text>
                  </View>
                  </View>
              </View>

              <View style={{ marginVertical:15}}>
                  <Card style={{ backgroundColor: '#fecd5b' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',paddingHorizontal:12 }}>
                        <View style={{ marginHorizontal:2}}>
                        <AntIcon name="exclamationcircleo" color="#ed1c25" size={17} />
                        </View>
                        <View style={{ marginHorizontal:5}}>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,color:'#ed1c25'}]}>Você possui 3 contas em aberto Com valor total de R$ 1.909.000,00</Text>
                        </View>
                        <AntIcon name="right" color="#ed1c25" size={17} />
                      </View>
                      </Card.Content>
                </Card>
              </View>

              <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:15}}>
                  <View style={{ flexDirection: 'row', }}>
                    <View>
                      <FeatherIcon name="dollar-sign" color="#02ade1" size={18} />
                      </View>
                      <View>
                        <Text style={styles.filtertext} > Precisa financiar suas contas?</Text>
                        </View>
                      </View>
                  <View>
                   <Text style={styles.second}>Saiba mais <AntIcon name="right" color="#02ade1" size={13} /> </Text>
                 </View>
                 
                 </View>
           
                <View style={styles.checkboxContainer}>
                  <Card style={{ backgroundColor: 'white' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text style={styles.smalltext}>Conta de energia</Text>
                          <Text style={styles.amount}>R$ 124.153,58</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View>
                          <Text style={styles.title}>Alberta</Text>
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
                      <View style={styles.viewfull}>
                       <View>
                       <TouchableWithoutFeedback onPress={handleClickPagar}>
                         <Text style={styles.second}>Pagar sua</Text>
                         </TouchableWithoutFeedback>
                       </View>
                       <View>
                       <TouchableWithoutFeedback onPress={handleClickDeta}>
                          <Text style={styles.second}>Detalhamento</Text>
                          </TouchableWithoutFeedback>
                       </View>
                       <View>
                         <FeatherIcon name="share-2" color="#02ade1" size={20} />
                       </View>
                      </View>
                    </Card.Content>
                  </Card>
                </View>

                <View style={{marginVertical:10}}>
                  <Title>Sugestões para você</Title>
                </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback onPress={handleClickDebit}>

                  <Card style={{ backgroundColor: '#fff', flex: 2,margin:5 }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                          <FontIcon name="files-o" color="#02ade1" size={25} />
                          <Text style={[styles.bartext, {marginTop:10}]}>Débitos e segunda via</Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>

                  
                </TouchableWithoutFeedback>


                <Card style={{ backgroundColor: '#fff', flex: 2,margin:5 }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                          <FontIcon name="files-o" color="#02ade1" size={25} />
                          <Text style={[styles.bartext, {marginTop:10}]}>Histórico de contas</Text>
                        </View>
                      </View>
                    </Card.Content>
                </Card>

                <Card style={{ backgroundColor: '#fff', flex: 2,margin:5 }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                          <Ionicons name="flash-off-outline" color="#02ade1" size={25} />
                          <Text style={[styles.bartext, {marginTop:10}]}>Entenda sua conta</Text>
                        </View>
                      </View>
                    </Card.Content>
                </Card>
                
                </View>

              <View style={styles.viewfull}>
                <TouchableWithoutFeedback onPress={handleClickDebit}>
                  <Card style={{ backgroundColor: '#fff', flex: 2,margin:5 }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                        <Ionicons name="flash-off-outline" color="#02ade1" size={25} />
                          <Text style={[styles.bartext, {marginTop:10}]}>Falta de energia</Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>

                </TouchableWithoutFeedback>


                <Card style={{ backgroundColor: '#fff', flex: 2, margin:5 }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                          <AntIcon name="bars" color="#02ade1" size={25} />
                          <Text style={[styles.bartext, {marginTop:10}]}>Meus pedidos</Text>
                        </View>
                      </View>
                    </Card.Content>
                </Card>

                <Card style={{ backgroundColor: '#fff', flex: 2, margin:5 }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                          <FeatherIcon name="grid" color="#02ade1" size={25} />
                          <Text style={[styles.bartext, {marginTop:10}]}>Ver mais serviços</Text>
                        </View>
                      </View>
                    </Card.Content>
                </Card>
                
              </View>

                <View style={{marginVertical:10}}>
                  <Title>Meus pedidos em aberto</Title>
                </View>

                <View style={styles.checkboxContainer}>
                  <Card style={{ backgroundColor: 'white',padding:14 }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'center',alignContent:'center',alignItems:'center' }}>
                        <View>
                          <Text style={styles.smalltextbold}>Troca de nome na conta</Text>
                          <Text style={[styles.smalltext,{marginVertical:5}]}>Envie a sua selfie para finalizar a </Text>
                          <Text style={[styles.smalltext,{marginVertical:0}]}>a solicitacão</Text>
                          <Text style={styles.second}>Enviar selfie</Text>
                        </View>
                    
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text style={styles.smalltext}>   28/05</Text>
                        </View>
                      </View>
                     </View>
                    </Card.Content>
                  </Card>
                </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
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
  viewfull:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical:10 
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
  smalltextbold: {
    fontSize: 13,
    color: 'black',
    fontWeight: '600'
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
  icon:{
    width:20,
    height: 20,
    color:'#02ade1',
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
  filtertext:{
    fontSize:12
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