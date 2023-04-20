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
import { AccessibilityWidget } from '../../components/AccessibilityWidget';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../components/Containers/index';
// import Widget from '../../components/Widget';
import { HeaderCustom } from '../../components/HeaderCustom';
import { Button } from '../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../components/Button/styles';
import { RootState } from '../../redux/reducer';
import { AlertModal } from '../../components/Modal/AlertModal';

import { Card, Paragraph } from 'react-native-paper';
import Modal from "react-native-modal";

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

  console.log('Net Info:', netInfo);

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
              <MainGenericContainer style={{ paddingTop: height * 0.02, height: height }}>
                
                <View style={{ paddingBottom: height * 0.0324, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Title paddingBottom={height * 0.0216}>
                  Minhas contas
                  </Title>
                  <Text style={styles.label}>Procotocolo: 000000000</Text>
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
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginVertical:10 }}>

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
                       <Image
                            source={require('../../assets/icons/share.png')}
                            style={styles.icon}
                          />
                       </View>

                      </View>
                    </Card.Content>
                  </Card>
                </View>

                <TouchableWithoutFeedback onPress={handleClickDebit}>

                  <Card style={{ backgroundColor: '#fff', width: '28%' }}>
                    <Card.Content>
                      <View style={styles.container}>
                        <View>
                          <Image
                            source={require('../../assets/icons/icBarcode.png')}
                            style={styles.bar}
                          />
                          <Text style={[styles.bartext, {marginTop:20}]}>Débitos e segunda via</Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableWithoutFeedback>
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