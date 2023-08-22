import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Platform,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Title, ContainerViewButton } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../../components/Containers/index';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { Button } from '../../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../../components/Button/styles';
import { RootState } from '../../../redux/reducer';
import { AlertModal } from '../../../components/Modal/AlertModal';
import OtherDataServices from '../../../shared/services/OtherDataServices';
import ContaServices from '../../../shared/services/ContaServices';

export function InvoiceSendToHome({route}) {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  // const { itemId, otherParam } = route.params;
  const [dataSource, setDataSource] = useState(undefined)
  const [tab, setTab] = useState([]);
  const[Loading,setLoading] = useState(true);


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

  //Get btn Data Main getReenviarData
  OtherDataServices.getReenviarData().then((res) => {
      if (res.status==200) {
        setDataSource(res.data);
      } else {
        return {error: 'Internal Server Error'};
      }
  });

 //Get Conat Data Main
 ContaServices.getDataConta().then((res) => {
  // console.log('Main',res.data)
  if (res.status==200) {
    setTab({data: res.data});
     setLoading(false); 
  } else {
    return {error: 'Internal Server Error'};
  }
 });
 
  }, []);

  const { height } = Dimensions.get('window');


  const theme = useTheme();
  const changeStep = (s: number) => {
    setStep(s);
  };
  const { goBack } = useNavigation();

  function handleHome() {
    changeStep(0);
  }

  const handleClick = () => {
    // navigation.navigate('login' as never);
    navigation.navigate('InvoiceSendedWithSuccess', {
     dataSource
    });
    // navigation.navigate('InvoiceSendedWithSuccess' as never);
  };

  const handleAlterar = () => {
    // navigation.navigate('login' as never);
    navigation.navigate('InvoiceSendedWithSuccess', {
     dataSource
    });
    // navigation.navigate('InvoiceSendedWithSuccess' as never);
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
              <MainGenericContainer style={{paddingTop: height * 0.02, height: height }}>
                <View style={{paddingBottom: height * 0.0324}}>
                  <Title paddingBottom={height * 0.0216}>Enviar por correspondência</Title>
                  <Text style={styles.smalltext}>O prazo para entrega da segunda via da conta é de cinco dias úteis e terá um custo de R$3,60, a ser cobrado em sua próxima fatura.</Text>
                </View>
                <View style={{ paddingBottom: height * 0.0324, }}>
                  <Title paddingBottom={height * 0.0216}>Endereço de entrega</Title>
                  { Loading ? <ActivityIndicator color="#000" size="large" /> :<>
                   <Text style={styles.mediumtext}>{tab.data?.endereco.logradouro+','+tab.data?.endereco.localizacao+' - '+tab.data?.endereco.bairro+tab.data?.endereco.municipio+'/'+tab.data?.endereco.uf+' - CEP '+tab.data?.endereco.cep}</Text>
                   </>
                  }
                </View>
                
                
                <ContainerViewButton>
                  <Button
                    title="Reenviar por correspondência"
                    type="secondary"
                    onPress={handleClick}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>

                <View style={styles.mTop}>
                  <Button
                   title="Alterar endereço de entrega"
                   type="primary"
                   onPress={handleAlterar}
                   isLoading={isLogging}
                 />
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
  mTop:{
    marginVertical:20
  },
  smalltext: {
    fontSize: 13,
    color:'black',
  },
  mediumtext: {
    fontSize: 14,
    color:'black',
  },
});