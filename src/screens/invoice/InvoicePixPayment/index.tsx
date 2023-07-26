import React, { useState, useEffect, useContext } from 'react';
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
import { useNavigation } from '@react-navigation/native';

import { Label, Title } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../../components/Containers/index';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
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


export function InvoicePixPayment() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
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

  const handleClick = () => {
    // navigation.navigate('login' as never);
    navigation.navigate('PaymentInvoice');
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
                  <Title paddingBottom={height * 0.0216}>Pagamento por PIX</Title>
                  <Label style={styles.smalltextbold}>Como realizar seu pagamento via Pix?</Label>
                </View>
                
                <View style={styles.viewflex}>
                  <View style={styles.iconcenter}>
                     <SimpleLineIcons name="screen-smartphone" color="#ffffff" size={18} />
                  </View>
                  <View >
                    <Text style={styles.smalltextleft}> Abra o aplicativo do seu banco e acesse o PIX</Text>
                  </View>
                </View>
                <View style={styles.viewflex}>
                  <View style={styles.iconcenter}>
                    <MaterialCommunityIcons name="qrcode-scan" color="#ffffff" size={18} />
                  </View>
                  <View>
                    <Text style={styles.smalltextleft}> Escolha a opção pagar com QR code e escaneie o código acima</Text>
                  </View>
                </View>
                <View style={styles.viewflex}>
                  <View style={styles.iconcenter}>
                    <MaterialIcons name="check" color="#ffffff" size={18} />
                  </View>
                  <View>
                    <Text style={styles.smalltextleft}> Confirme as informações de pagamento</Text>
                  </View>
                </View>

                <View style={{ paddingBottom: height * 0.0324, }}>
                  <Text style={styles.mediumtextbold}> Principais vantagens do seu pagamentos via PlX:</Text>
                  <FlatList
                    data={[
                       {key: 'Rapide na informação de pagamento no mesmo dia;'},
                       {key: 'Bloqueio para Novas Ações de Cobrança;'},
                       {key: 'Agilidade na Baixa de Conta no mesmo dia;'},
                       {key: 'Não necessidade de abertura de NS para'},
                       {key: 'Paiva da Cantaa Palias'},
                      ]}
                     renderItem={({item}) => <View style={styles.flexRow}><View style={styles.bullets}></View><Text style={styles.bullettext}>{item.key}</Text></View>}
                   />
                </View>

                <Text style={styles.mediumtextbold}>Outros métodos de pagamentos</Text>
                <View style={styles.mTop}>
                <Card style={styles.CardView}>
                  <Card.Content>
                      <View>
                         <AntIcon name="barcode" color="#000000" size={30} />
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
  flexRow:{
    flexDirection:'row'
  },
  CardView:{
    backgroundColor: '#fff',
    width: '30%' 
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
  mTop:{
    marginVertical:20
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
    fontSize: 13,
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
  bartext:{
    fontWeight:'500',
    color:'#02ade1',
    fontSize:10
  },
  bullets:{
    width: 6,
    height:6,
    backgroundColor:'#02ade1',
    borderRadius:6
  }
});