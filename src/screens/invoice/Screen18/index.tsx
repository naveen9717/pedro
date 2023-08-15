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
import { useNavigation} from '@react-navigation/native';
import {  SearchBar } from "react-native-elements";
import { Label, Title } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../../components/Containers/index';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
import { AuthContext, AuthContextProps } from '../../../contexts/useAuth';
import { AlertModal } from '../../../components/Modal/AlertModal';
import { Card, Paragraph } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import ContaServices from '../../../shared/services/ContaServices';


export function Screen18() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
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
    if (res.status==200) {
      setDataMain({data: res.data});
      setLoading(false); 
    } else {
      return {error: 'Internal Server Error'};
    }
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

                <View style={styles.mV_5}>
                  <Text style={styles.smalltext}>Qual instalação deseja acessar?</Text>
                </View>

                <View style={styles.mV_5}>
                  { Loading ? <ActivityIndicator color="#000" size="large" /> :<>
                    <Text style={styles.mediumtextbold}>{dataMain.data?.enderecoInstalacao}</Text>
                  </>
                  }
                </View>
                
                <View style={styles.mV_5}>
                 <SearchBar
                    inputStyle={styles.bgWhite}
                    containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                    inputContainerStyle={{backgroundColor: 'white',height:35}}
                    placeholderTextColor={'#g5g5g5'}
                    placeholder={'Searching...'}
                    searchIcon={{color:'#02ade1',size:30,}}
                 />
              </View>
              <View style={styles.mV_10}>
                <Card style={styles.bgWhite}>
                    <Card.Content>
                      <View style={styles.cardviewouter}>
                         <View style={styles.cardbodynew}>
                         </View>
                        <View style={styles.cardflex_4}>
                         <View style={styles.cardflex}>
                           <Text style={[styles.mediumtextbold,styles.mV_1]}>Casa da mãe</Text>
                           <Text style={[styles.mediumtextbold,{marginVertical:1,backgroundColor: '#80c342',color:'#FFFFFF',paddingHorizontal:15,borderRadius:10}]}>Ativa</Text>
                         </View>
                         <View style={styles.FlexRowsColor}>
                           <Text style={[styles.smalltext,styles.mV_1]}>Número da Instalação: </Text>
                           <Text style={[styles.label,styles.mV_1]}>0123453333</Text>
                         </View>
                         <View>
                           <Text style={[styles.smalltext,{marginVertical:5}]}>Avenida Paulista, 1000, Bela Vista, São Paulo - SP</Text>
                         </View>
                       </View>
                      </View>
                    </Card.Content>
                </Card>
              </View>

              <View style={styles.mV_10}>
                <Card style={styles.bgWhite}>
                    <Card.Content>
                      <View style={styles.cardviewouter}>
                         <View style={styles.cardbodynew}>
                         </View>
                        <View style={styles.cardflex_4}>
                         <View style={styles.cardflex}>
                            <Text style={[styles.mediumtextbold,styles.mV_1]}>Casa</Text>
                            <Text style={[styles.mediumtextbold,{marginVertical:1,backgroundColor: '#80c342',color:'#FFFFFF',paddingHorizontal:15,borderRadius:10}]}>Ativa</Text>
                         </View>
                         <View style={styles.FlexRowsColor}>
                            <Text style={[styles.smalltext,styles.mV_1]}>Número da Instalação: </Text>
                            <Text style={[styles.label,styles.mV_1]}>0123450943</Text>
                         </View>
                         <View>
                            <Text style={[styles.smalltext,styles.mV_5]}>Rua da Consolação, 198, Bela Vista, São Paulo - SP</Text>
                         </View>
                       </View>
                      </View>
                    </Card.Content>
                </Card>
              </View>

              <View style={styles.mV_10}>
                <Card style={styles.bgWhite}>
                    <Card.Content>
                      <View style={styles.cardviewouter}>
                         <View style={styles.cardbody}>
                         </View>
                        <View style={styles.cardbodyview}>
                         <View style={styles.cardflex}>
                            <Text style={[styles.mediumtextbold,styles.mV_1]}>Dois irmãos construções</Text>
                            <Text style={[styles.mediumtextbold,{marginVertical:1,backgroundColor: '#ed2125',color:'#FFFFFF',paddingHorizontal:15,borderRadius:10}]}>Inativa</Text>
                         </View>
                         <View style={styles.cardcontent}>
                            <Text style={[styles.smalltext,styles.mV_1]}>Número da Instalação: </Text>
                            <Text style={[styles.label,styles.mV_1]}>0123450943</Text>
                         </View>
                         <View>
                           <Text style={[styles.smalltext,styles.mV_5]}>Avenida Norte Sul, 100, Taquaral, Campinas - SP</Text>
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
                   onPress={() => console.log('FAB icon Pressed')}
                 />
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
  cardviewouter:{
    flexDirection: 'row', 
    justifyContent:'flex-start'
  },
  bgWhite:{
    backgroundColor: '#FFFFFF'
  },
  FlexRowsColor:{
    fontWeight:'600',
    color:'black',
    marginVertical:2
  },
  cardbodyview:{
    flexShrink:4,
    marginLeft:25
  },
  cardbodynew:{
    backgroundColor: '#80c342',
    flexShrink:2,
    width:10,
    marginHorizontal:-16,
    marginVertical:-15,
    borderTopStartRadius:14,
    borderBottomStartRadius:14
  },
  cardflex:{
    flexDirection: 'row', 
    justifyContent:'space-between'
  },
  cardcontent:{
    flexDirection: 'row', 
    justifyContent: 'flex-start' ,
    marginVertical:4
  },
  cardbody:{
    backgroundColor: '#ed2125',
    flexShrink:2,
    width:10,
    marginHorizontal:-16,
    marginVertical:-15,
    borderTopStartRadius:14,
    borderBottomStartRadius:14
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#2ea55e',
  },
  cardflex_4:{
    flexShrink:4,
    marginLeft:25
  },
  label: {
    fontSize: 13,
    color: '#02ade1',
    fontWeight:'500'
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
  mV_1:{
    marginVertical:1
  },
  mV_5:{
    marginVertical:5
  },
  mV_10:{
    marginVertical:10
  }
});