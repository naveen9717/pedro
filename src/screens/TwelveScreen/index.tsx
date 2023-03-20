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
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext, AuthContextProps } from '../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../components/Button/styles';
import { RootState } from '../../redux/reducer';
import { AlertModal } from '../../components/Modal/AlertModal';
import { Card } from 'react-native-paper';

export function TwelveScreen() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();
  
  const netInfo = useNetInfo();
  // function handleSignUp() {
  //   navigation.navigate('emailverification' as never);
  // }
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

  const handleClick = () => {
    // navigation.navigate('login' as never);
    navigation.navigate('MinhaContaAtual' as never);
  };

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
            {/* <HeaderCustom
              marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
              hideMessage={true}
              onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              leftOnPress={handleHome}
              leftAction={'menu'}
            /> */}
            {/* <AccessibilityWidget
            // marginTop={
            //   Platform.OS === 'android' ? StatusBar.currentHeight : 0
            // }
            /> */}

            <ScrollView>
              <MainGenericContainer
                style={{ paddingTop: height * 0.02, height: height }}>
               
                <View style={{ paddingBottom: height * 0.0324, }}>
                  <Title paddingBottom={height * 0.0216}>
                  Pagamento por PIX
                  </Title>
                  <Label style={styles.smalltextbold}>Como realizar seu pagamento via Pix?</Label>
                </View>
                
                <View style={styles.viewflex}>
                  <View >
                   <Image
                    source={require('../../assets/images/phone.circle.png')}
                    style={styles.icon}
                   />
                  </View>
                  <View >
                    <Text style={styles.smalltextleft}> Abra o aplicativo do seu banco e acesse o PIX</Text>
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
                    <Text style={styles.smalltextleft}> Escolha a opção pagar com QR code e escaneie o código acima</Text>
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
                    <Text style={styles.smalltextleft}> Confirme as informações de pagamento</Text>
                  </View>
                </View>


                <View style={{ paddingBottom: height * 0.0324, }}>
                
                  <Text style={styles.mediumtextbold}>Principais vantagens do seu pagamentos via PlX:</Text>
                  <FlatList
                  data={[
                       {key: 'Rapidez na informação de pagamento no mesmo dia;'},
                       {key: 'Bloqueio para Novas Ações de Cobrança;'},
                       {key: 'Agilidade na Baixa de Conta no mesmo dia;'},
                       {key: 'Não necessidade de abertura de NS para'},
                       {key: 'Paiva da Cantaa Palias'},
                      ]}
                     renderItem={({item}) => <View style={{flexDirection:'row'}}><View style={styles.bullets}></View><Text style={styles.bullettext}>{item.key}</Text></View>}
                   />
                  
                </View>

                <Text style={styles.mediumtextbold}>Outros métodos de pagamentos</Text>

                <View style={styles.mTop}>
                 
                <Card style={{ backgroundColor: '#fff', width: '30%' }}>
                 <Card.Content>
                      <View>
                         <Image
                           source={require('../../assets/icons/icBarcode.png')}
                           style={styles.bar}
                          />

                         <Text style={styles.bartext}>Código de</Text>
                        <Text style={styles.bartext}>barra</Text>
                      </View>
                 </Card.Content>
               </Card>
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
  viewflex:{
    flexDirection:'row',
    marginBottom:15,
    justifyContent:'flex-start'
  },
  smalltextleft: {
    fontSize: 13,
    color:'black',
    marginLeft:10
  },
  smalltextbold: {
    fontSize: 12,
    color:'black',
    fontWeight:'500'
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