// import React, { useState, useRef, useEffect, useContext } from 'react';
import React, { useState,useContext,useEffect } from 'react'

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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListItem, SearchBar } from "react-native-elements";
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
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FAB } from 'react-native-paper';
import { AnimatedFAB } from 'react-native-paper';
import ContaServices from '../../../shared/services/ContaServices';


export function Screen18() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [dataMain, setDataMain] = useState({})
  const[Loading,setLoading] = useState(true);

  const [state, setState] = useState({search: ''});
  const updateSearch = search => {setState({ search });
  };

  const[segment,setSegment]= useState({
    selectedIndex: 0,
    selectedIndices: [0],
    customStyleIndex: 0,
  });


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
  //Get Conat Data Main
  ContaServices.getDataConta().then((res) => {
    // console.log('Main',res.data)
    setDataMain({data: res.data});
    setLoading(false); 
  });
  }, []);


  const { height } = Dimensions.get('window');
 
 const  handleCustomIndexSelect = (index: number) => {
    setSegment(prevState => ({ ...prevState, customStyleIndex: index }))
  }
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
    navigation.navigate('InvoiceEasyComposition')
  };

  const barData = [
    {value: 2500,frontColor: '#02ade1',label:'Jan'}, 
    {value: 3500,frontColor: '#02ade1',label:'Feb'}, 
    {value: 4500,frontColor: '#02ade1',label:'Mar'}, 
    {value: 5000,frontColor: '#02ade1',label:'Apr'},
    {value: 3000,frontColor: '#02ade1',label:'May'}
  ];

 

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
              <Text style={[styles.label,{textAlign:'right'}]}>Procotocolo: 000000000</Text>

                <View style={{ marginVertical:8}}>
                  <Title>Selecionar a instalação</Title>
                </View>

                <View style={{ marginVertical:5}}>
                  <Text style={styles.smalltext}>Qual instalação deseja acessar?</Text>
                </View>

                <View style={{ marginVertical:5}}>
                  { Loading ? <ActivityIndicator color="#000" size="large" /> :<>
                   <Text style={styles.mediumtextbold}>{dataMain.data?.enderecoInstalacao}</Text>
                    </>
                  }
                </View>
                
                <View style={{ marginVertical:5}}>
                 <SearchBar
                    inputStyle={{backgroundColor: 'white'}}
                    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                    inputContainerStyle={{backgroundColor: 'white',height:35}}
                    placeholderTextColor={'#g5g5g5'}
                    placeholder={'Searching...'}
                    searchIcon={{color:'#02ade1',size:30,}}
                 />
              </View>
              <View style={{ marginVertical:10}}>
                <Card style={{ backgroundColor: '#FFFFFF' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent:'flex-start'}}>
                         <View style={{ backgroundColor: '#80c342',flexShrink:2,width:10,marginHorizontal:-16,marginVertical:-15,borderTopStartRadius:14,borderBottomStartRadius:14}}>
                         </View>
                        <View style={{flexShrink:4,marginLeft:25}}>
                         <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                          <Text style={[styles.mediumtextbold,{marginVertical:1}]}>Casa da mãe</Text>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,backgroundColor: '#80c342',color:'#FFFFFF',paddingHorizontal:15,borderRadius:10}]}>Ativa</Text>
                         </View>
                         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' ,marginVertical:4}}>
                          <Text style={[styles.smalltext,{marginVertical:1}]}>Número da Instalação: </Text>
                          <Text style={[styles.label,{marginVertical:1}]}>0123453333</Text>
                         </View>
                         <View>
                          
                          <Text style={[styles.smalltext,{marginVertical:5}]}>Avenida Paulista, 1000, Bela Vista, São Paulo - SP</Text>
                         </View>
                       </View>
                      </View>
                    </Card.Content>
                </Card>
              </View>

              <View style={{ marginVertical:10}}>
                <Card style={{ backgroundColor: '#FFFFFF' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent:'flex-start'}}>
                         <View style={{ backgroundColor: '#80c342',flexShrink:2,width:10,marginHorizontal:-16,marginVertical:-15,borderTopStartRadius:14,borderBottomStartRadius:14}}>
                         </View>
                        <View style={{flexShrink:4,marginLeft:25}}>
                         <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                          <Text style={[styles.mediumtextbold,{marginVertical:1}]}>Casa</Text>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,backgroundColor: '#80c342',color:'#FFFFFF',paddingHorizontal:15,borderRadius:10}]}>Ativa</Text>
                         </View>
                         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' ,marginVertical:4}}>
                          <Text style={[styles.smalltext,{marginVertical:1}]}>Número da Instalação: </Text>
                          <Text style={[styles.label,{marginVertical:1}]}>0123450943</Text>
                         </View>
                         <View>
                          <Text style={[styles.smalltext,{marginVertical:5}]}>Rua da Consolação, 198, Bela Vista, São Paulo - SP</Text>
                         </View>
                       </View>
                      </View>
                      </Card.Content>
                </Card>
              </View>

              <View style={{ marginVertical:10}}>
                <Card style={{ backgroundColor: '#FFFFFF' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent:'flex-start'}}>
                         <View style={{ backgroundColor: '#ed2125',flexShrink:2,width:10,marginHorizontal:-16,marginVertical:-15,borderTopStartRadius:14,borderBottomStartRadius:14}}>
                         </View>
                        <View style={{flexShrink:4,marginLeft:25}}>
                         <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                          <Text style={[styles.mediumtextbold,{marginVertical:1}]}>Dois irmãos construções</Text>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,backgroundColor: '#ed2125',color:'#FFFFFF',paddingHorizontal:15,borderRadius:10}]}>Inativa</Text>
                         </View>
                         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' ,marginVertical:4}}>
                          <Text style={[styles.smalltext,{marginVertical:1}]}>Número da Instalação: </Text>
                          <Text style={[styles.label,{marginVertical:1}]}>0123450943</Text>
                         </View>
                         <View>
                          <Text style={[styles.smalltext,{marginVertical:5}]}>Avenida Norte Sul, 100, Taquaral, Campinas - SP</Text>
                         </View>
                       </View>
                      </View>
                      </Card.Content>
                </Card>
              </View>

              <View style={styles.checkboxContainer}></View>
                </MainGenericContainer>
                <FAB
                icon="message"
                animated={true}
                color="#FFFFFF"
                mode="elevated"
                style={styles.fab}
                onPress={() => console.log('Pressed')}
              />
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#2ea55e',
  },
  checkbox: {
    alignSelf: 'center',
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
    fontSize: 12.5,
    color: 'black',
  },
  mediumtext: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginVertical: 15,
  },
  mediumtextbold: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    marginVertical: 10,
  },
  mediumtextboldblue: {
    fontSize: 15,
    color: '#02ade1',
    fontWeight: '500',
    marginVertical: 10,
  },
  largetextbold: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginVertical: 10,
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
  onpress: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: 'maroon',
    borderRadius: 5
  },
  first: {
    color: 'black'
  },
  throughone: {
    color: 'black',
    textDecorationLine:'line-through'
  },
  white: {
    color: 'white',
    textAlign: 'center'
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
  bartext: {
    fontWeight: '500',
    color: '#02ade1',
    fontSize: 10,
    marginHorizontal:5
  },
  icon: {
    width: 20,
    height: 20,
    color: '#02ade1',
  },
  bar: {
    width: 14,
    height: 14,
    borderRadius:7
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
  },
  tabContent: {
    color: '#444444',
    fontSize: 18,
    margin: 24,
  },
  bottomtext: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:20,
    borderTopWidth:1,
    borderTopColor:'lightgrey'
  },
});