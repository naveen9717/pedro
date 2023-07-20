import React, {useState, useRef, useEffect, useContext} from 'react';
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
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {Label, Title, ContainerViewButton, ContainerViewLogo} from './styles';

import {useTheme} from 'styled-components/native';
import {MainGenericContainer} from '../../../components/Containers/index';
import {HeaderCustom} from '../../../components/HeaderCustom';
import {Button} from '../../../components/Button';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext, AuthContextProps} from '../../../contexts/useAuth';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../../components/Button/styles';
import {RootState} from '../../../redux/reducer';
import {AlertModal} from '../../../components/Modal/AlertModal';
import { PieChart } from "react-native-gifted-charts";



export function InvoiceEasyComposition() {
  const {b2cLogin} = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

 const DATA =[
	{
    name:"Taxas e tributos",
		color: "#02ade1",
		value: 71.05
	},
	{
    name:"CPFL Paulista",
		color: "#80c342",
		value: 23.13
	},
	{
    name:"Energia gerada",
		color: "#f68b1f",
		value: 47.69
	},
	{
    name:"Transmissäão",
		color: "#ed1c25",
		value: 7
	}
]
  const netInfo = useNetInfo();

  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{title: string; msg: string}>({
    title: '',
    msg: '',
  });

  console.log('Net Info:', netInfo);
  const [freeInternetDate, setFreeInternetDate] = useState<Date | null>(null);

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

  const {height} = Dimensions.get('window');
  
  const theme = useTheme();
  const changeStep = (s: number) => {
    setStep(s);
  };
  const {goBack} = useNavigation();
  const [btnClick, setBtnClick] = useState(0);

  function handleHome() {
    changeStep(0);
  }

  const handleClick = () => {
    // navigation.navigate('login' as never);
    navigation.navigate('InvoiceEasy');
  };

  const renderItem = (data) => {
    return (
      <View style={{marginVertical:8}}>
        <View style={{flexDirection:'row'}}>
        <View style={{width:16,height:16,borderRadius:8,backgroundColor:data.item.color}}></View>
        <Text style={[styles.mediumtextbold,{marginTop:-2,marginLeft:2}]}>{data.item.name}</Text>
        </View>
        <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>R$ {data.item.value}</Text>
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
     
      <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.BACKGROUND}}>
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
              <MainGenericContainer style={{paddingTop: height * 0.02}}>
                 <Text style={styles.bluemediumtext}>Procotocolo: 000000000</Text>
                <View style={{paddingBottom: height * 0.0324,justifyContent: 'center',alignItems: 'center'}}>
                  <View style={{alignItems:'flex-start'}}>
                  <Title paddingBottom={height * 0.0216}>
                  Conta fácil de entender
                  </Title>
                  <Text style={styles.mediumtextbold}>Composição da sua conta</Text>
                  <Text style={styles.smalltext}>Veja e entenda como é composta sua conta de energia.</Text>
                 </View>
                <View style={{flexDirection:'row'}}>
                   <View style={{marginVertical:15}}>
                    <PieChart
                     donut
                     data={DATA}
                     showText
                     textColor="black"
                     radius={100}
                     textSize={10}
                     focusOnPress
                     showValuesAsLabels
                     showTextBackground
                     textBackgroundRadius={15}
                   />

                  <Text style={[styles.mediumtextbold,{marginVertical:15}]}>Vencimento: 13/06/2022</Text>
                  </View>
                  <View style={{marginVertical:15}}>
                    <FlatList
                    data={DATA}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                 <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Total: R$ 146,68</Text>

                </View>
                </View>
                  
                 <View style={{marginVertical:15}}>
                  <Text style={styles.mediumtextbold}>A conta é dividida em quatro grupos principais:</Text>
                  <Text style={styles.smalltext}>Geração de energia: Aqui entra o seu consumo e as bandeiras tarifárias. Esse valor é atribuido a geração de energia elétrica.</Text>
                 </View>
                 <View style={{marginVertical:15}}>

                  <Text style={styles.smalltext}>Taxas e tributos: São as taxas de juros, seguros e todos os impostos municipais, estaduais e federais</Text>
                  </View>

                  <View style={{marginVertical:15}}>

                  <Text style={styles.smalltext}>Distribuição: Esse éo valor arrecadado pela sua distribuidora. E com ele que as manutenções, reparos e melhorias são feitas.</Text>
                  </View>

                  <View style={{marginVertical:15}}>

                  <Text style={styles.smalltext}>Transmissão: Sabe aquelas grandes torres que cortam a cidade? Elas são as linhas de transmissão que levam a energia da usina até a subestação da distribuidora.</Text>
                  
                  </View>
                </View>
                <View style={{marginVertical:15}}>

                <ContainerViewButton>
                  <Button
                    title="Voltar"
                    type="secondary"
                    // onPress={handleSignIn}
                    onPress={handleClick}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>
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
  // checkboxContainer: {
  //   flexDirection: 'row',
  //   marginBottom: 20,
  // },
  // checkbox: {
  //   alignSelf: 'center',
  // },
  // label: {
  //   margin: 8,
  // },
  smalltext:{
    fontSize:12,
  },
  // smallertext:{
  //   fontSize:12,
  //   textAlign:'center'
  // },
  // largetext:{
  //   fontSize:15,
  //   fontWeight:'500',
  //   color:'#02ade1',
  //   textAlign:'center'
  // },
  mediumtext:{
    fontSize:13,
    textAlign:'center'
  },
  bluemediumtext:{
    fontSize:13,
    textAlign:'right',
    color:'#02ade1',
    fontWeight:'500',
    marginBottom:5
  },
  mediumtextbold:{
    fontSize:14,
    textAlign:'center',
    fontWeight:'500',
    marginVertical:5,
    color:'black'
  }
});