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
  ActivityIndicator

} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Label, Title } from './styles';
import { useTheme } from 'styled-components/native';
import { MainGenericContainer } from '../../../components/Containers/index';
import { HeaderCustom } from '../../../components/HeaderCustom';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext, AuthContextProps } from '../../../contexts/useAuth';
import { ContainerLoading } from '../Login/styles';
import { Load } from '../../../components/Button/styles';
import { RootState } from '../../../redux/reducer';
import { AlertModal } from '../../../components/Modal/AlertModal';
import HistoryDataServices from '../../../shared/services/HistoryDataServices';
import {AccessibilityWidget} from '../../../components/AccessibilityWidget';
import { Card, Paragraph } from 'react-native-paper';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BarChart } from "react-native-gifted-charts";

export function InvoiceHistoryChart() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const[Loading,setLoading] = useState(true);

  const [dataSource, setDataSource] = useState([])
  const { height } = Dimensions.get('window');

  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{ title: string; msg: string }>({
    title: '',
    msg: '',
  });

  console.log('History:', dataSource);



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
    //Get History Data List
    HistoryDataServices.getHistoryData().then((res) => {
      setDataSource(res.data.historicoContas);
      setLoading(false); 
  });
  }, []);

 
  const theme = useTheme();
  
  const { goBack } = useNavigation();

  function handleHome() {
    navigation.navigate('')
  }


  const stringifybarData = dataSource.map((data,key) => {
    return {value: data?.totalDaFatura,frontColor: '#02ade1',label:moment().month(key).format("MMM")}
  });

  const stringifylineData = dataSource.map((data,key) => {
    return {value: data?.mediaConsumo,dataPointText: `${data?.mediaConsumo}`}
  });



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
              { Loading ? <ActivityIndicator color="#000" size="large" style={styles.activity}/> :<>

                <View style={{ paddingBottom: height * 0.0324, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                  <Title paddingBottom={height * 0.0216}> Histórico de consumo</Title>
                    <Text style={styles.smalltext}>Lorem ipsum</Text>
                </View>
              <View style={styles.checkboxContainer}>
                {/* Optional chaining used while api get data*/}
               <Card style={styles.bgColorWhite}>
                <Card.Content>
                 <View style={styles.flexRowAlignSpace}>
                  <Text style={styles.mediumtextbold}>Ultimas faturas</Text>
                  <Text style={styles.label}>Ultimos 7 meses</Text>
                 </View>
                 <BarChart 
                   data={stringifybarData}   
                   barWidth={26}
                   initialSpacing={5}
                   spacing={8}
                   barBorderRadius={4}
                   yAxisThickness={0}
                   xAxisColor={'gray'}
                   yAxisTextStyle={{color: 'gray',fontSize:10}}
                   stepValue={300}
                   maxValue={2700}
                   noOfSections={9}
                   yAxisLabelTexts={['0', '300KWh', '600KWh', '900KWh', '1200KWh', '1500KWh','1800KWh','2100KWh','2400KWh','2700KWh']}
                   labelWidth={30}
                   xAxisLabelTextStyle={styles.XAxis}
                   lineConfig={{
                         color: '#0058a0',
                         thickness: 2,
                         textFontSize:10
                        
                        //  curved: true,
                        //  hideDataPoints: true,
                        //  shiftY: 20,
                        //  initialSpacing: -30,
                  }} 
                 showLine={true}
                 lineData={stringifylineData}
                 />
                 <View style={styles.flexRow}>
                 <View style={styles.flexRowAlign}>
                 <FontAwesome name="circle" color="#02ade1" size={15} />

                  <Text style={styles.bartext}>Valor de consumo</Text>
                  </View>
                  <View style={styles.flexRowAlign}>
                  <FontAwesome name="circle" color="#0058a0" size={15} />

                  <Text style={styles.bartext}>Média de consuma</Text>
                  </View>
                 </View>

                 <View style={styles.bottomtext}>
                 <View style={styles.flexColumnMT}>
                  <Text style={styles.smalltext}>Última fatura</Text>
                  <Text style={styles.mediumtextbold}>R$ {dataSource[0]?.totalDaFatura}</Text>
                  </View>
                  <View style={styles.flexColumn}>
                  <Text style={styles.smalltext}>Média de consumo</Text>
                  <Text style={styles.mediumtextbold}>R$ {dataSource[0]?.mediaFaturamento}</Text>
                  </View>
                 </View>
                </Card.Content>
               </Card>
              </View>

              <View style={styles.checkboxContainer}>
               
               <Card style={styles.bgColorWhite}>
                <Card.Content>
                <View style={styles.flexRowAlignSpace}>
                  <Text style={styles.mediumtextbold}>Ultimas faturas</Text>
                  <Text style={styles.label}>Ultimos 7 meses</Text>
                 </View>
                 <BarChart 
                   data={stringifybarData}   
                   barWidth={26}
                   initialSpacing={5}
                   spacing={8}
                   barBorderRadius={4}
                   yAxisThickness={0}
                   xAxisColor={'gray'}
                   yAxisTextStyle={{color: 'gray',fontSize:10}}
                   stepValue={300}
                   maxValue={2700}
                   noOfSections={9}
                   yAxisLabelTexts={['0', '300KWh', '600KWh', '900KWh', '1200KWh', '1500KWh','1800KWh','2100KWh','2400KWh','2700KWh']}
                   labelWidth={30}
                   xAxisLabelTextStyle={styles.XAxis}
                   lineConfig={{
                         color: '#0058a0',
                         thickness: 2,
                         textFontSize:10
                        //  curved: true,
                        //  hideDataPoints: true,
                        //  shiftY: 20,
                        //  initialSpacing: -30,
                  }} 
                 showLine={true}
                 lineData={stringifylineData}
                 />
                 <View style={styles.flexRow}>
                 <View style={styles.flexRowAlign}>
                   <FontAwesome name="circle" color="#02ade1" size={15} />
                   <Text style={styles.bartext}>Valor de consumo</Text>
                  </View>
                  <View style={styles.flexRowAlign}>
                   <FontAwesome name="circle" color="#0058a0" size={15} />
                   <Text style={styles.bartext}>Média de consuma</Text>
                  </View>
                 </View>

                 <View style={styles.bottomtext}>
                 <View style={styles.flexColumnMT}>
                   <Text style={styles.smalltext}>Última fatura</Text>
                   <Text style={styles.mediumtextbold}>{dataSource[0]?.consumoKwh}kWh</Text>
                  </View>
                  <View style={styles.flexColumn}>
                   <Text style={styles.smalltext}>Média de consumo</Text>
                   <Text style={styles.mediumtextbold}>{dataSource[0]?.mediaConsumo}kWh</Text>
                  </View>
                 </View>
                  
                </Card.Content>
               </Card>
              </View>

               
                </>
                }
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
  bgColorWhite:{
    backgroundColor:'white'
  },
  checkboxContainer: {
    marginBottom: 15,
  },
  XAxis:{
    color: 'gray', 
    textAlign: 'center',
    fontSize:11
  },

  flexColumn:{
    flexDirection:'column'
  },
  flexColumnMT:{
    flexDirection:'column',
    marginTop:5
  },
  flexRowAlign:{
    flexDirection:'row',
    alignItems:'flex-start'
  },
  flexRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:10
  },
  flexRowAlignSpace:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  label: {
    margin: 5,
    fontSize: 11,
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
  bartext: {
    fontWeight: '500',
    fontSize: 10,
    marginHorizontal:2
  },
});