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
  FlatList
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Label, Title, ContainerViewButton, ContainerViewLogo } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../components/Containers/index';
// import Widget from '../../components/Widget';
import { HeaderCustom } from '../../components/HeaderCustom';
import { AccessibilityWidget } from '../../components/AccessibilityWidget';

import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../components/Button/styles';
import { RootState } from '../../redux/reducer';
import { AlertModal } from '../../components/Modal/AlertModal';
import { Card } from 'react-native-paper';

export function InvoiceBillPayment({route}) {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [step, setStep] = useState(0);
  const { itemId, otherParam } = route.params;


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
      <SafeAreaView
        style={{ flex: 0, backgroundColor: theme.COLORS.BACKGROUND }}
      />
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: theme.COLORS.PRIMARY_800 }} /> */}
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
                <View style={{ paddingBottom: height * 0.0324, }}>
                  <Title paddingBottom={height * 0.0216}>
                  Pagamento por Código de barra
                  </Title>
                  <Label style={styles.smalltextbold}>{otherParam}</Label>
                </View>
                
                <View style={styles.viewflex}>
                  <View>
                   <Image
                    source={require('../../assets/images/phone.circle.png')}
                    style={styles.icon}
                   />
                  </View>
                  <View>
                    <Text style={styles.smalltextleft}> Pague via internet utilizando o código de barras do boleto</Text>
                  </View>
                </View>
                <View style={styles.viewflex}>
                  <View >
                   <Image
                    source={require('../../assets/images/phone.circle.png')}
                    style={styles.icon}
                   />
                  </View>
                  <View>
                    <Text style={styles.smalltextleft}> Ou imprima o boleto e pague no bancoo</Text>
                  </View>
                </View>
                <View style={styles.viewflex}>
                  <View>
                   <Image
                    source={require('../../assets/images/phone.circle.png')}
                    style={styles.icon}
                   />
                  </View>
                  <View>
                    <Text style={styles.smalltextleft}> Sempre confira o prazo de validade do Código de barra e prazos de pagamento.</Text>
                  </View>
                </View>

                <View style={{ paddingBottom: height * 0.0324,paddingVertical:15 }}>
                  <Text style={styles.smalltext}>Atenção: Não se esqueça de pagar seu boleto até a</Text>
                  <Text style={styles.smalltext}>data de vencimento original de sua fatura para evitar</Text>
                  <Text style={styles.smalltext}>juros e multa.</Text>
                </View>

                <Text style={styles.mediumtextbold}>Outros métodos de pagamentos</Text>
                 <View style={{flexDirection:'row'}}>
                 
                <Card style={{ backgroundColor: '#fff', marginHorizontal:10,borderRadius:3 }}>
                 <Card.Content>
                      <View>
                         <Image
                           source={require('../../assets/icons/icBarcode.png')}
                           style={styles.bar}
                          />
                         <Text style={styles.bartext}>Pix</Text>
                      </View>
                 </Card.Content>
               </Card>
               <Card style={{ backgroundColor: '#fff', flex: 2.2,marginHorizontal:10,borderRadius:3 }}>
                 <Card.Content>
                      <View>
                         <Image
                           source={require('../../assets/icons/icBarcode.png')}
                           style={styles.bar}
                          />
                         <Text style={styles.bartext}>Cartão</Text>
                         <Text style={styles.bartext}>de crédito</Text>
                      </View>
                 </Card.Content>
               </Card>
               <View style={{ flex: 2,marginHorizontal:10  }}></View>
            </View>
                {ModalLoading(isLoading)}
              </MainGenericContainer>
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
    marginVertical: 40,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  mTop:{
    marginVertical:20
  },
  amount: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight:'600'
  },
  smalltext: {
    fontSize: 13,
    color:'black',
    
  },
  smalltextleft: {
    fontSize: 13,
    color:'black',
    marginLeft:10
  },
  smalltextbold: {
    fontSize: 12.5,
    color:'black',
    fontWeight:'700'
  },
  bullettext: {
    fontSize: 12,
    color:'black',
    marginTop:-8,
    paddingVertical:5,
    marginLeft:10
  },
   mediumtext: {
    fontSize: 18,
    color:'black',
    fontWeight:'500',
    marginVertical: 15,
  },
  mediumtextbold: {
    fontSize: 16,
    color:'black',
    fontWeight:'500',
    marginVertical: 15,
  },
  viewflex:{
    flexDirection:'row',
    marginBottom:15,
    justifyContent:'flex-start'
  },
  title: {
    fontSize:13,
    fontWeight:'600',
    marginTop:10,
    backgroundColor:'#f8b1ab',
    color:'maroon',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius:5
  },
  onpress:{
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor:'maroon',
    borderRadius:5
  },

  first:{
    color:'black'
  },
  white:{
    color:'white',
    textAlign:'center'
  },
  second:{
    fontWeight:'500',
    color:'#02ade1',
    flexShrink: 1 
  },
  bartext:{
    fontWeight:'500',
    color:'#02ade1',
    fontSize:10
  },
  icon:{
    width:25,
    height: 25,
    color:'#02ade1',
  },
  bar:{
    width:40,
    height: 30,
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
  bottom:{
    marginVertical:20,
    fontSize:8
  },
  boxcontainer:{
    paddingHorizontal:50
  },
  listcontainer: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  bullets:{
    width: 10,
    height:10,
    backgroundColor:'#02ade1',
    borderRadius:10
  }
 
});