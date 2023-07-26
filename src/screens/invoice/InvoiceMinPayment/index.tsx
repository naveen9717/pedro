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
  
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Label, Title, ContainerViewButton, ContainerViewLogo } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../../components/Containers/index';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { Button } from '../../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
import { AuthContext, AuthContextProps } from '../../../contexts/useAuth';
import { AlertModal } from '../../../components/Modal/AlertModal';
import { Card, Paragraph } from 'react-native-paper';
import OtherDataServices from '../../../shared/services/OtherDataServices';


export function InvoiceMinPayment() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [dataSource, setDataSource] = useState([])

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

  
  useEffect(() => {
  //Get History Data List
  OtherDataServices.putBloquearData().then((res) => {
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

  function handleHome() {
    changeStep(0);
  }

  const handleClick = () => {
    toggleModalPix()
    // navigation.navigate('Info')
    navigation.navigate('Info', {
      dataSource
     });
  };


  function handlePix() {
    toggleModalPix()
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
              <MainGenericContainer style={{ paddingTop: height * 0.02, height: height }}>
                <View style={{ paddingBottom: height * 0.0324, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Title paddingBottom={height * 0.0216}>Conta Mínima</Title>
                  <Text style={styles.label}>Procotocolo: 000000000</Text>
                </View>

                <View style={styles.checkboxContainer}>
                  <Card style={styles.bgWhite}>
                    <Card.Content>
                      <View style={styles.flexRowSpace}>
                        <View>
                          <Text style={styles.smalltext}>Conta mínima</Text>
                          <Text style={[styles.amount,{ marginVertical: 5}]}>R$ 20,30</Text>
                        </View>
                      </View>
                      <View style={[styles.flexRowSpace,{borderTopWidth:1,borderTopColor:'#f1f1f1',paddingVertical:10 }]}>
                        <View>
                          <Text style={styles.title}>Alberta</Text>
                        </View>
                        <View>
                          <Text style={styles.throughone}>Vencimento</Text>
                          <Text style={styles.throughtwo}>13/03/2022</Text>
                        </View>
                        <View>
                          <Text style={styles.first}>Referente à</Text>
                          <Text style={styles.second}>Fevereiro/2022</Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.smalltext}>O valor deste mês não atingiuo valor de R$70,00 e será acumulado sem encargos na próxima conta.</Text>
                </View>
                <View style={[styles.checkboxContainer,{ flexDirection: 'row'}]}>
                   <Text style={styles.smalltext}>Para gerar código para pagamento. </Text>
                   <Text style={styles.label}>Clique aqui{'>'} </Text>
                </View>
                <ContainerViewButton>
                  <Button
                    title="Quero desabilitar essa função"
                    type="primary"
                    // onPress={handleSignIn}
                    onPress={handleClick}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>
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
  flexRowSpace:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bgWhite:{
    backgroundColor:'white'
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#02ade1',
    fontWeight:'500'
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
    backgroundColor: '#fed26c',
    color: '#f36c3e',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  first: {
    color: 'black'
  },
  throughone: {
    color: 'black',
    textDecorationLine:'line-through'
  },
  second: {
    fontWeight: '500',
    color: '#02ade1',
    flexShrink: 1,
  },
  throughtwo: {
    fontWeight: '500',
    color: '#02ade1',
    flexShrink: 1,
    textDecorationLine:'line-through'
  },
});