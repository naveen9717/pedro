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
  TouchableWithoutFeedback,
  FlatList

} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Label, Title, ContainerViewButton, ContainerViewLogo } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../components/Containers/index';
import { HeaderCustom } from '../../components/HeaderCustom';
import { Button } from '../../components/Button';
import { SmallButton } from '../../components/SmallButton';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../components/Button/styles';
import { RootState } from '../../redux/reducer';
import { AlertModal } from '../../components/Modal/AlertModal';
import ContaServices from '../../shared/services/ContaServices';
import {AccessibilityWidget} from '../../components/AccessibilityWidget';
import { Card, Paragraph } from 'react-native-paper';

import { BarChart } from "react-native-gifted-charts";

export function InvoiceHistoryChart() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const [dataMain, setDataMain] = useState({})
  const [dataSource, setDataSource] = useState([])
  const { height } = Dimensions.get('window');

  const screenWidth = Dimensions.get("window").width;



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
  console.log('dataSource:', dataSource);
  console.log('dataMain:', dataMain);


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
  //   //Get Conat Data List
  //   ContaServices.getDataContaList().then((res) => {
  //     setDataSource(res.data);
  // });
  // //Get Conat Data Main
  // ContaServices.getDataConta().then((res) => {
  //   // console.log('Main',res.data)
  //   setDataMain({data: res.data});
  // });
  }, []);

 
  const theme = useTheme();
  
  const { goBack } = useNavigation();

  function handleHome() {
    navigation.navigate('')
  }

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
                <View style={{ paddingBottom: height * 0.0324, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                  <Title paddingBottom={height * 0.0216}> Histórico de consumo</Title>
                    <Text style={styles.smalltext}>Lorem ipsum</Text>
                </View>
              <View style={styles.checkboxContainer}>
                {/* Optional chaining used while api get data*/}
               <Card style={{ backgroundColor: '#fff' }}>
                <Card.Content>
                  
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={styles.mediumtextbold}>Ultimas faturas</Text>
                  <Text style={styles.label}>Ultimos 7 meses</Text>
                 </View>
                <BarChart 
                   data={barData}   
                   barWidth={30}
                   initialSpacing={15}
                   spacing={18}
                   barBorderRadius={4}
                   yAxisThickness={0}
                   xAxisType={'dashed'}
                   xAxisColor={'lightgray'}
                   yAxisTextStyle={{color: 'lightgray',fontSize:10}}
                   stepValue={1000}
                   maxValue={6000}
                   noOfSections={5}
                   yAxisLabelTexts={['0', '1KWh', '2KWh', '3KWh', '4KWh', '5KWh']}
                   labelWidth={20}
                   xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
                   lineConfig={{
                         color: '#0058a0',
                        //  thickness: 3,
                        //  curved: true,
                        //  hideDataPoints: true,
                        //  shiftY: 20,
                        //  initialSpacing: -30,
                  }} 
                 showLine/>
                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:10}}>
                 <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                 <Text style={[styles.bar, {backgroundColor:'#02ade1'}]}></Text>
                  <Text style={styles.bartext}>Valor de consumo</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                  <Text style={[styles.bar, {backgroundColor:'#0058a0'}]}></Text>

                  <Text style={styles.bartext}>Média de consuma</Text>
                  </View>
                 </View>

                 <View style={styles.bottomtext}>
                 <View style={{flexDirection:'column',marginTop:5}}>
                  <Text style={styles.smalltext}>Última fatura</Text>
                  <Text style={styles.mediumtextbold}>R$ 237,00</Text>
                  </View>
                  <View style={{flexDirection:'column'}}>
                  <Text style={styles.smalltext}>Média de consumo</Text>
                  <Text style={styles.mediumtextbold}>R$ 200,00</Text>
                  </View>
                 </View>
                  
                </Card.Content>
               </Card>
              </View>

              <View style={styles.checkboxContainer}>
                {/* Optional chaining used while api get data*/}
               <Card style={{ backgroundColor: '#fff' }}>
                <Card.Content>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={styles.mediumtextbold}>Ultimas faturas</Text>
                  <Text style={styles.label}>Ultimos 7 meses</Text>
                 </View>
                <BarChart 
                   data={barData}   
                   barWidth={30}
                   initialSpacing={15}
                   spacing={18}
                   barBorderRadius={4}
                   yAxisThickness={0}
                   xAxisType={'dashed'}
                   xAxisColor={'lightgray'}
                   yAxisTextStyle={{color: 'lightgray',fontSize:10}}
                   stepValue={1000}
                   maxValue={6000}
                   noOfSections={5}
                   yAxisLabelTexts={['0', '1KWh', '2KWh', '3KWh', '4KWh', '5KWh']}
                   labelWidth={20}
                   xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
                   lineConfig={{
                         color: '#0058a0',
                        //  thickness: 3,
                        //  curved: true,
                        //  hideDataPoints: true,
                        //  shiftY: 20,
                        //  initialSpacing: -30,
                    }} 
                 showLine/>
                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:10}}>
                 <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                 <Text style={[styles.bar, {backgroundColor:'#02ade1'}]}></Text>
                  <Text style={styles.bartext}>Valor de consumo</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                  <Text style={[styles.bar, {backgroundColor:'#0058a0'}]}></Text>

                  <Text style={styles.bartext}>Média de consuma</Text>
                  </View>
                 </View>

                 <View style={styles.bottomtext}>
                 <View style={{flexDirection:'column',marginTop:5}}>
                  <Text style={styles.smalltext}>Última fatura</Text>
                  <Text style={styles.mediumtextbold}>R$ 237,00</Text>
                  </View>
                  <View style={{flexDirection:'column'}}>
                  <Text style={styles.smalltext}>Média de consumo</Text>
                  <Text style={styles.mediumtextbold}>R$ 200,00</Text>
                  </View>
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
            {webViewRender(step)}
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
    marginBottom: 15,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 5,
    fontSize: 10,
    fontWeight: '600'
  },
  bottomtext: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:20,
    borderTopWidth:1,
    borderTopColor:'lightgrey'
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
    fontWeight: '500',
    marginVertical: 5,
    color: '#02ade1',
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
    fontSize: 10,
    marginHorizontal:2
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
 
  boxcontainer: {
    paddingHorizontal: 50
  },

  chart: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    width: 290
  }
});