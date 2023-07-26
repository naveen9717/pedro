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
import { MainGenericContainer } from '../../../components/Containers/index';
// import Widget from '../../components/Widget';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';

import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../../components/Button/styles';
import { RootState } from '../../../redux/reducer';
import { AlertModal } from '../../../components/Modal/AlertModal';
import { Card } from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export function InvoiceBillPayment() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [step, setStep] = useState(0);


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
                  <Title paddingBottom={height * 0.0216}>Pagamento por Código de barra</Title>
                  <Label style={styles.smalltextbold}>Como realizar seu pagamento via Código de barra?</Label>
                </View>
                
                <View style={styles.viewflex}>
                  <View style={styles.iconcenter}>
                    <SimpleLineIcons name="screen-smartphone" color="#ffffff" size={18} />
                  </View>
                  <View>
                    <Text style={styles.smalltextleft}> Pague via internet utilizando o código de barras do boleto</Text>
                  </View>
                </View>
                <View style={styles.viewflex}>
                   <View style={styles.iconcenter}>
                     <MaterialCommunityIcons name="printer" color="#ffffff" size={18} />
                  </View>
                  <View>
                    <Text style={styles.smalltextleft}> Ou imprima o boleto e pague no bancoo</Text>
                  </View>
                </View>
                <View style={styles.viewflex}>
                  <View style={styles.iconcenter}>
                     <MaterialIcons name="event-note" color="#ffffff" size={18} />
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
                  <View style={{ flex:2.5 }}>
                   <Card style={styles.cardfirst}>
                    <Card.Content>
                      <View>
                         <AntIcon name="barcode" color="#000000" size={25} />
                         <Text style={[styles.bartext, {marginTop:15}]}>Pix</Text>
                      </View>
                    </Card.Content>
                  </Card>
               </View>
               <Card style={styles.viewcard}>
                 <Card.Content>
                      <View>
                        <AntIcon name="wallet" color="#02ade1" size={20} />
                         <Text style={[styles.bartext, {marginTop:15}]}>Cartão</Text>
                         <Text style={[styles.bartext, {marginVertical:5}]}>de crédito</Text>
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
  cardfirst:{
    backgroundColor: '#fff',
    marginHorizontal:10,
    borderRadius:3
  },
  iconcenter:{
    backgroundColor:'#02ade1',
    width:26,
    height:26,
    borderRadius:13,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'
  },
  viewcard:{
    backgroundColor: '#fff',
    flex: 2.5,
    marginHorizontal:10,
    borderRadius:3
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
  white:{
    color:'white',
    textAlign:'center'
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
});