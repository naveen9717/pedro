import React, { useState,useContext,useEffect } from 'react'

import {
  Platform,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback
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
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { BarChart } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HistoryDataServices from '../../../shared/services/HistoryDataServices';
import moment from 'moment'
import RNShareFile from 'react-native-share-pdf';

export function InvoiceEasy({ route, navigation }) {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  // const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState([]);
  const[Loading,setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([])

  const [state, setState] = useState({search: ''});
  const updateSearch = search => {setState({ search });
  };

  const[segment,setSegment]= useState({
    selectedIndex: 0,
    selectedIndices: [0],
    customStyleIndex: 0,
  });

  console.log('routenav',route)

  const netInfo = useNetInfo();
 
  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{ title: string; msg: string }>({
    title: '',
    msg: '',
  });

  const mockData = {
    filename: 'InvoiceEasy.pdf',
    document: `text`
  }
  const SharePdf = async () => {
    const showError = await RNShareFile.sharePDF(mockData.document, mockData.filename);
  if (showError) {
    // Do something with the error
    console.log('showError',showError)
  }
}
// console.log('tab',tab);
  
  useEffect(() => {
    HistoryDataServices.getTabBarData().then((res) => {
      setTab(res.data.historicoContas);
   });

    //Get History Data List
    HistoryDataServices.getHistoryData().then((res) => {
      setDataSource(res.data.historicoContas);
      setLoading(false); 
  });
  }, []);
  // {value: 254,date:"05/2022", color: '#80c342',color2:'#eeeeee', percentage: '68%',percent:'32%'},

  const stringifyHorizontalData = dataSource.map((data,key) => {
    return {value: data?.totalDaFatura,frontColor: '#02ade1',label:moment().month(key).format("MMM")}
  });

  const stringifylineData = dataSource.map((data,key) => {
    return {value: data?.mediaConsumo,dataPointText: `${data?.mediaConsumo}`}
  });

  var arr = [];

  const stringifybarData = tab.map((data,key) => {
    arr.push(...[{value: data?.mediaConsumo,color: '#02ade1',color2:'#eeeeee', percentage: '68%',percent:'32%'}])
  });

  // console.log('arr',arr);

  const stringybarData = tab.map((data,key) => {
    return {value: data?.mediaConsumo,color: '#02ade1',color2:'#eeeeee', percentage: '68%',percent:'32%'}
  });

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

  const handleBaixar = () => {
    navigation.navigate('InvoiceDownload')
  };
  

  const barData = [
    {value: 2500,frontColor: '#02ade1',label:'Jan'}, 
    {value: 3500,frontColor: '#02ade1',label:'Feb'}, 
    {value: 4500,frontColor: '#02ade1',label:'Mar'}, 
    {value: 5000,frontColor: '#02ade1',label:'Apr'},
    {value: 3000,frontColor: '#02ade1',label:'May'}
  ];

  

  const renderItem = (data) => {
    return (
      <View style={{marginVertical:5}}>
        <View style={{flexDirection:'row'}}>
        <View style={{width:14,height:14,borderRadius:7,backgroundColor:data.item.color}}></View>
        <Text style={[styles.mediumtextbold,{marginTop:-2,marginLeft:2}]}>{data.item.name}</Text>
        </View>
        <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>R$ {data.item.value}</Text>
      </View>
    )
}

const pieData = [
  {value: 0.48,name:"Taxas e tributos", color: '#02ade1', text: '0,48%'},
  {value: 0.15, name:"CPFL Paulista",color: '#80c342', text: '0,15%'},
  {value: 0.32, name:"Energia gerada",color: '#f68b1f', text: '0,32%'},
  {value: 0.039,  name:"Transmissäão",color: '#ed1c25', text: ' 0,039%'},
];

const HorizontalBarData = [
  {value: 254,date:"05/2022", color: '#80c342',color2:'#eeeeee', percentage: '68%',percent:'32%'},
  {value: 280, date:"04/2022",color: '#fecd5b',color2:'#eeeeee', percentage: '75%',percent:'25%'},
];

const renderHorizontalItem = (data) => {
  return (
    <View style={{marginVertical:5,}}>
      <View style={styles.cardfirst}>
      <View style={{width:data.item.percentage,backgroundColor:data.item.color,borderTopStartRadius:15,borderBottomStartRadius:15}}/>
      <View style={{width:data.item.percent,backgroundColor:data.item.color2,borderTopEndRadius:15,borderBottomEndRadius:15,}}/>
      </View>
      <View style={styles.cardsecond}>
      <Text style={[styles.smalltext,{color:'black'}]}>{data.item.date}</Text>
      <Text style={[styles.smalltext,{color:'black'}]}>KWh {data.item.value}</Text>
      </View>
    </View>
  )
}

const HorizontalBarData2 = [
  {value: dataSource[0]?.consumoKwh,name:"ICMS", color: '#80c342',color2:'#fecd5b',color3: 'red',color4: '#eeeeee',  percentone: (90*100)/dataSource[0]?.consumoKwh+'%',percenttwo:(dataSource[0]?.consumoKwh-90)*100/dataSource[0]?.consumoKwh+'%',percentthree:(dataSource[0]?.consumoKwh-199)*100/dataSource[0]?.consumoKwh+'%',percentfour:'0%'},
];

console.log('dataSource',dataSource[0]?.consumoKwh);
const renderHorizontalItem2 = (data) => {
  return (
    <View style={{marginVertical:5,}}>
      <View style={styles.cardfirst}>
      <View style={{width:data.item.percentone,backgroundColor:data.item.color,borderTopStartRadius:15,borderBottomStartRadius:15}}/>
      <View style={{width:data.item.percenttwo,backgroundColor:data.item.color2}}/>
      <View style={{width:data.item.percentthree,backgroundColor:data.item.color3}}/>
      <View style={{width:data.item.percentfour,backgroundColor:data.item.color4,borderTopEndRadius:15,borderBottomEndRadius:15,}}/>

    </View>
      <View style={styles.cardsecond}>
      <Text style={[styles.smalltext,{color:'black'}]}>{data.item.name}</Text>
      <Text style={[styles.smalltext,{color:'black'}]}>KWh {data.item.value}</Text>
      </View>
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

                <View style={styles.mV_10}>
                  <Title>Conta fácil de entender</Title>
                </View>
                
                <View style={{ marginVertical:5}}>
                 <SearchBar
                   inputStyle={{backgroundColor: 'white'}}
                   containerStyle={styles.borderStyle}
                   inputContainerStyle={{backgroundColor: 'white',height:40}}
                   placeholderTextColor={'#g5g5g5'}
                   placeholder={'Searching...'}
                   searchIcon={{color:'#02ade1',size:30,}}
                 />
              </View>
              <View style={styles.mV_10}>
                <Card style={{ backgroundColor: '#80c342' }}>
                    <Card.Content>
                      <View style={styles.cardexc}>
                        <View>
                        <AntIcon name="exclamationcircleo" color="yellow" size={17} />
                        </View>
                        <View>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,color:'#FFFFFF'}]}>Data da próxima leitura: 17/05/2022</Text>
                        </View>
                      </View>
                      </Card.Content>
                </Card>
              </View>

              <View style={styles.checkboxContainer}>
               <SegmentedControlTab
                  values={['Resumo', 'Detalhes','Próxima']}
                  selectedIndex={segment.customStyleIndex}
                  onTabPress={handleCustomIndexSelect}
                  borderRadius={10}
                  tabsContainerStyle={{ height: 55, backgroundColor: '#FFFFFF'}}
                  tabStyle={{ backgroundColor: '#FFFFFF', borderColor: '#F2F2F2',shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 3, }}
                  activeTabStyle={{ backgroundColor: '#02ade1', }}
                  tabTextStyle={styles.tabstyle}
                  activeTabTextStyle={{ color: '#FFFFFF' }}
               />
               {segment.customStyleIndex === 0
                    && 
                    <View style={{ marginVertical: 20 }}>
                    <View style={styles.checkboxContainer}>
                    <Card style={{ backgroundColor: 'white' }}>
                      <Card.Content>
                        <View style={styles.cardexc}>
                          <View>
                            <Text style={styles.smalltext}>Parcelamento em código de barras</Text>
                            <Text style={[styles.amount,{marginVertical:5}]}>R$ { route.params?.post.valor}</Text>
                          </View>
                        </View>
                        <View style={styles.vencida}>
                          <View>
                            <Text style={styles.title}>{route.params?.post.statusPagamento}</Text>
                          </View>
                          <View>
                            <Text style={styles.first}>Vencimento</Text>
                            <Text style={styles.second}>{moment(route.params?.post.dataVencimento).format('DD/MM/YYYY')}</Text>
                          </View>
                          <View>
                            <Text style={styles.first}>Consumo</Text>
                            <Text style={styles.second}>{route.params?.post.consumo} kWh</Text>
                          </View>
                        </View>
                        <View style={styles.viewreal}>
                         <View>
                          <Text style={styles.second}>Realizar pagamento</Text>
                        </View>
                        <View>
                        <TouchableWithoutFeedback onPress={SharePdf}>
                        <FeatherIcon name="share-2" color="#02ade1" size={18} />
                        </TouchableWithoutFeedback>
                        </View>
                      </View>
                      </Card.Content>
                    </Card>
                  </View>
  
                  <View style={styles.mV_15}>
                  <Card style={{ backgroundColor: '#04704e' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                        <View style={{ marginHorizontal:5}}>
                        <AntIcon name="exclamationcircleo" color="yellow" size={17} />
                        </View>
                        <View style={{ marginHorizontal:5}}>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,color:'#FFFFFF'}]}>O valor da sua conta está 18% menor que o mês anterior. Em Abril você pagou R$300,00.</Text>
                        </View>
                      </View>
                    </Card.Content>
                </Card>
              </View>
                  <ContainerViewButton>
                    <Button
                      title="Baixar segunda via"
                      type="secondary"
                      // onPress={handleSignIn}
                      onPress={handleBaixar}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
                  <View style={styles.mV_10}>
                    <Text style={[styles.largetextbold,styles.mV_10]}>Entenda sua conta</Text>
                    <Text style={[styles.mediumtextbold,styles.mV_15]}>Sua leitura</Text>
                  </View>
                  <View style={styles.mV_15}>
                  <Card style={{ backgroundColor: '#f68b1f' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,color:'#FFFFFF'}]}>O local dos medidores (relógios) no seu prédio/condomínio estava trancado sem a chave e nossa equipe não conseguiu realizar a leitura. Seu faturamento nesse mês foi calculado pela média de consumo.</Text>
                        </View>
                      </View>
                      </Card.Content>
                </Card>
               </View>
                <View style={styles.mV_10}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Sua leitura</Text>
                    <Text style={[styles.smalltext,styles.mV_10]}>Confira abaixo os principais motivos que levaram ao aumento:</Text>
                </View> 

                <View style={styles.mV_15}>
                  <View style={styles.viewmes}>
                    <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Mes de referência</Text>
                    <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Quantidade</Text>
                  </View>
                  { Loading ? <ActivityIndicator color="#000" size="large" style={styles.activity}/> :<>
                    <FlatList
                    data={stringybarData}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                   </>
                }
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>Seu consumo aumentou comparado ao més passado.</Text>
                </View>


                <View style={styles.mV_15}>
                 <View style={styles.viewtributos}>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',color:'black'}]}>Tributos</Text>
                 </View>
                 { Loading ? <ActivityIndicator color="#000" size="large" style={styles.activity}/> :<>
                  <FlatList
                    data={HorizontalBarData2}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem2(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                   </>
                  }
                    
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>O consumo ultrapassou 200 quilowatt-hora e a alíquota de ICMS foi de 25%</Text>

                </View>

                <View style={styles.mV_15}>
                 <View style={styles.viewtarif}>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',color:'black',marginVertical: 1}]}>Bandeira tarifária</Text>
                  <View style={{ backgroundColor: '#04704e',padding:6,borderRadius:3,flexDirection:'row' }}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'white',marginHorizontal:2}]}>Bandeira verde</Text>
                  </View>

                 </View>
                 <View style={{marginVertical:5,}}>
                 <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2}]}>Período de consumo: 29 dias</Text>
                    <View style={{flexDirection:'row',width:'100%',height:30}}>
                       <View style={{width:'100%',backgroundColor:'#80c342',borderRadius:15}}/>
                    </View>

                    <View style={styles.viewmes}>
                      <Text style={[styles.smalltext,{color:'black'}]}>
                      { route.params?.post.periodoConsumo ? route?.params.post.periodoConsumo.split('-')[0] :'18/04'}
                      </Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>
                      { route.params?.post.periodoConsumo ? route?.params.post.periodoConsumo.split('-')[1] :'17/05'}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>A bandeira tarifária vigente foi a verde e por isso, não houve acréscimo no valor.</Text>

                </View>


             <View style={styles.checkboxContainer}>
              <Text style={styles.mediumtextbold}>Seu histórico de consumo</Text>

                {/* Optional chaining used while api get data*/}
               <Card style={{ backgroundColor: '#fff' }}>
                <Card.Content>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={styles.mediumtextbold}>Ultimas faturas</Text>
                  <Text style={styles.label}>Ultimos 7 meses</Text>
                 </View>
                  <BarChart 
                   data={stringifyHorizontalData}   
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
                   xAxisLabelTextStyle={{color: 'gray', textAlign: 'center',fontSize:11}}
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
                 <View style={styles.viewstyles}>
                 <View style={styles.RowFlex}>
                 <Text style={[styles.bar, {backgroundColor:'#02ade1'}]}></Text>
                  <Text style={styles.bartext}>Valor de consumo</Text>
                  </View>
                  <View style={styles.viewbar}>
                  <Text style={[styles.bar, {backgroundColor:'#0058a0'}]}></Text>

                  <Text style={styles.bartext}>Média de consuma</Text>
                  </View>
                 </View>

                 <View style={styles.bottomtext}>
                 <View style={styles.flexColumn}>
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
               <Text style={[styles.smalltext,{marginVertical:20}]}>Seu consumo está abaixo da média. Em meses anteriores você já pagou valor igual ou maior ao desse.mes.</Text>
               <ContainerViewButton>
                    <Button
                      title="Ver todas as informações"
                      type="primary"
                      // onPress={handleSignIn}
                      onPress={handleClick}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
              </View>
              
              <View>
              <Text style={styles.mediumtextbold}>Composiçāo da sua conta</Text>
              <View style={{flexDirection:'row'}}>
                 <View style={styles.mV_15}>
                   <PieChart
                     donut
                     data={pieData}
                     showText
                     textColor="black"
                     radius={100}
                     textSize={8}
                     focusOnPress
                     showValuesAsLabels
                     showTextBackground
                     textBackgroundRadius={20}
                   />
                  <Text style={[styles.mediumtextbold,styles.mV_15]}>Total: R$ 146,68</Text>

                  </View>
                  <View style={styles.mV_15}>
                    <FlatList
                    data={pieData}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                </View>
              </View>

              <ContainerViewButton>
                    <Button
                      title="Ver todas as informações"
                      type="primary"
                      // onPress={handleSignIn}
                      onPress={handleClick}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
               </View>
              </View>
              
               }

               {segment.customStyleIndex === 1
                    &&                     
                    <View style={{ marginVertical: 20 }}>
                    <View style={styles.checkboxContainer}>
                    <View style={styles.viewlietura}>
                      <View style={styles.innerview}>
                         <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Data da leitura anterior</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>16/03/2022</Text>
                      </View>
                      <View style={styles.innerview}>                         
                         <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Dias consumidos</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>33 dias</Text>
                      </View>
                    </View>
                    <View style={styles.viewlietura}>
                    <View style={styles.innerview}>                         
                         <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Data da leitura atual</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>18/04/2022</Text>
                      </View>
                      <View style={styles.innerview}>                         
                        <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Mês referência</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>Abril</Text>
                      </View>
                    </View>
                  </View>

                  <ContainerViewButton>
                    <Button
                      title="Baixar segunda via"
                      type="secondary"
                      // onPress={handleSignIn}
                      onPress={handleBaixar}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
                  <View style={styles.mV_10}>
                    <Text style={[styles.largetextbold,styles.mV_10]}>Entenda sua conta</Text>
                    <Text style={[styles.mediumtextbold,styles.mV_15]}>Sua leitura</Text>
                  </View>
                  <View style={styles.mV_15}>
                  <Card style={{ backgroundColor: '#80c342' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,color:'#FFFFFF'}]}>Obrigada por manter o acesso livre ao seu medidor (relógio). Nossa equipe esteve no seu imóvel no dia XX/XX para fazer a leitura..</Text>
                        </View>
                      </View>
                      </Card.Content>
                </Card>
               </View>
                <View style={styles.mV_10}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Sua leitura</Text>
                    <Text style={[styles.smalltext,styles.mV_10]}>Confira abaixo os principais motivos que levaram ao aumento:</Text>
                </View> 


                <View style={styles.mV_15}>
                 <View style={styles.viewmes}>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Mes de referência</Text>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Quantidade</Text>
                 </View>
                    <FlatList
                    data={HorizontalBarData}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>Seu consumo aumentou comparado ao més passado.</Text>
                </View>
                <View style={styles.mV_15}>
                 <View style={{flexDirection:'row',width:'100%',marginVertical:5}}>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Tributos</Text>
                 </View>
                    <FlatList
                    data={HorizontalBarData2}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem2(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>O consumo ultrapassou 200 quilowatt-hora e a alíquota de ICMS foi de 25%</Text>

                </View>

                <View style={styles.mV_15}>
                 <View style={styles.viewtarif}>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',color:'black',marginVertical: 1}]}>Bandeira tarifária</Text>
                  <View style={{ backgroundColor: '#04704e',padding:6,borderRadius:3,flexDirection:'row' }}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'white',marginHorizontal:2}]}>Bandeira verde</Text>
                  </View>

                 </View>
                 <View style={{marginVertical:5,}}>
                 <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2}]}>Período de consumo: 29 dias</Text>
                    <View style={{flexDirection:'row',width:'100%',height:30}}>
                       <View style={{width:'100%',backgroundColor:'#80c342',borderRadius:15}}/>
                    </View>
                    <View style={styles.viewmes}>
                    <Text style={[styles.smalltext,{color:'black'}]}>
                    { route.params?.post.periodoConsumo ? route?.params.post.periodoConsumo.split('-')[0] :'18/04'}
                      </Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>
                      { route.params?.post.periodoConsumo ? route?.params.post.periodoConsumo.split('-')[1] :'18/04'}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>A bandeira tarifária vigente foi a verde e por isso, não houve acréscimo no valor.</Text>

                </View>


             <View style={styles.checkboxContainer}>
             <Text style={styles.mediumtextbold}>Seu histórico de consumo</Text>

                {/* Optional chaining used while api get data*/}
               <Card style={{ backgroundColor: '#fff' }}>
                <Card.Content>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={styles.mediumtextbold}>Ultimas faturas</Text>
                  <Text style={styles.label}>Ultimos 7 meses</Text>
                 </View>
                 <BarChart 
                   data={stringifyHorizontalData}   
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
                   xAxisLabelTextStyle={{color: 'gray', textAlign: 'center',fontSize:11}}
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
                 <View style={styles.viewvalor}>
                 <View style={styles.RowFlex}>
                 <Text style={[styles.bar, {backgroundColor:'#02ade1'}]}></Text>
                  <Text style={styles.bartext}>Valor de consumo</Text>
                  </View>
                  <View style={styles.RowFlex}>
                  <Text style={[styles.bar, {backgroundColor:'#0058a0'}]}></Text>

                  <Text style={styles.bartext}>Média de consuma</Text>
                  </View>
                 </View>

                 <View style={styles.bottomtext}>
                 <View style={styles.flexColumn}>
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
               <Text style={[styles.smalltext,{marginVertical:20}]}>Seu consumo está abaixo da média. Em meses anteriores você já pagou valor igual ou maior ao desse.mes.</Text>
               <ContainerViewButton>
                    <Button
                      title="Ver todas as informações"
                      type="primary"
                      // onPress={handleSignIn}
                      onPress={handleClick}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
              </View>
              
              <View>
              <Text style={styles.mediumtextbold}>Composiçāo da sua conta</Text>
              <View style={{flexDirection:'row'}}>
                 <View style={styles.mV_15}>
                   <PieChart
                     donut
                     data={pieData}
                     showText
                     textColor="black"
                     radius={100}
                     textSize={10}
                     focusOnPress
                     showValuesAsLabels
                     showTextBackground
                     textBackgroundRadius={15}
                   />
                  <Text style={[styles.mediumtextbold,styles.mV_15]}>Total: R$ 146,68</Text>

                  </View>
                  <View style={styles.mV_15}>
                    <FlatList
                    data={pieData}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                </View>
              </View>

              <ContainerViewButton>
                    <Button
                      title="Ver todas as informações"
                      type="primary"
                      // onPress={handleSignIn}
                      onPress={handleClick}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
               </View>
              </View>
              }
                
                {segment.customStyleIndex === 2
                    && <View style={{ marginVertical: 20 }}>
                    <View style={styles.checkboxContainer}>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                      <View style={styles.viewdata}>
                         <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Data da leitura anterior</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>17/05/2022</Text>
                      </View>
                    </View>
                  </View>

                  <ContainerViewButton>
                    <Button
                      title="Baixar segunda via"
                      type="secondary"
                      // onPress={handleSignIn}
                      onPress={handleBaixar}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
                  <View style={styles.mV_10}>
                    <Text style={[styles.largetextbold,styles.mV_10]}>Entenda sua conta</Text>
                    <Text style={[styles.mediumtextbold,styles.mV_15]}>Sua leitura</Text>
                  </View>
                  <View style={styles.mV_15}>
                  <Card style={{ backgroundColor: '#80c342' }}>
                    <Card.Content>
                      <View style={styles.RowJustify}>
                        <View>
                          <Text style={[styles.mediumtextbold,{marginVertical:1,color:'#FFFFFF'}]}>Obrigada por manter o acesso livre ao seu medidor (relógio). Nossa equipe esteve no seu imóvel no dia XX/XX para fazer a leitura..</Text>
                        </View>
                      </View>
                      </Card.Content>
                </Card>
               </View>
                <View style={styles.mV_10}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Sua leitura</Text>
                    <Text style={[styles.smalltext,styles.mV_10]}>Confira abaixo os principais motivos que levaram ao aumento:</Text>
                </View> 

                <View style={styles.mV_15}>
                 <View style={styles.viewmes}>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Mes de referência</Text>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Quantidade</Text>
                 </View>
                    <FlatList
                    data={HorizontalBarData}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>Seu consumo aumentou comparado ao més passado.</Text>
                </View>
                <View style={styles.mV_15}>
                 <View style={styles.viewtributos}>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Tributos</Text>
                 </View>
                    <FlatList
                    data={HorizontalBarData2}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem2(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>O consumo ultrapassou 200 quilowatt-hora e a alíquota de ICMS foi de 25%</Text>
                </View>

                <View style={styles.mV_15}>
                 <View style={styles.viewbanderia}>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',color:'black',marginVertical: 1}]}>Bandeira tarifária</Text>
                  <View style={styles.viewfeather}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'white',marginHorizontal:2}]}>Bandeira verde</Text>
                  </View>

                 </View>
                 <View style={{marginVertical:5,}}>
                 <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2}]}>Período de consumo: 29 dias</Text>
                    <View style={{flexDirection:'row',width:'100%',height:30}}>
                       <View style={styles.viewbana}/>
                    </View>
                    <View style={styles.viewdate}>
                    <Text style={[styles.smalltext,{color:'black'}]}>
                    { route.params?.post.periodoConsumo ? route?.params.post.periodoConsumo.split('-')[0] :'18/04'}
                      </Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>
                      { route.params?.post.periodoConsumo ? route?.params.post.periodoConsumo.split('-')[1] :'18/04'}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>A bandeira tarifária vigente foi a verde e por isso, não houve acréscimo no valor.</Text>
                </View>

             <View style={styles.checkboxContainer}>
             <Text style={styles.mediumtextbold}>Seu histórico de consumo</Text>
                {/* Optional chaining used while api get data*/}
               <Card style={{ backgroundColor: '#fff' }}>
                <Card.Content>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <Text style={styles.mediumtextbold}>Ultimas faturas</Text>
                  <Text style={styles.label}>Ultimos 7 meses</Text>
                 </View>
                 <BarChart 
                   data={stringifyHorizontalData}   
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
                   xAxisLabelTextStyle={{color: 'gray', textAlign: 'center',fontSize:11}}
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
                 <View style={styles.viewconsumo}>
                 <View style={styles.viewbar}>
                 <Text style={[styles.bar, {backgroundColor:'#02ade1'}]}></Text>
                  <Text style={styles.bartext}>Valor de consumo</Text>
                  </View>
                  <View style={styles.viewbar}>
                  <Text style={[styles.bar, {backgroundColor:'#0058a0'}]}></Text>

                  <Text style={styles.bartext}>Média de consuma</Text>
                  </View>
                 </View>

                 <View style={styles.bottomtext}>
                 <View style={styles.flexColumn}>
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
               <Text style={[styles.smalltext,{marginVertical:20}]}>Seu consumo está abaixo da média. Em meses anteriores você já pagou valor igual ou maior ao desse.mes.</Text>
               <ContainerViewButton>
                    <Button
                      title="Ver todas as informações"
                      type="primary"
                      // onPress={handleSignIn}
                      onPress={handleClick}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
              </View>
              
              <View>
              <Text style={styles.mediumtextbold}>Composiçāo da sua conta</Text>
              <View style={{flexDirection:'row'}}>
                 <View style={styles.mV_15}>
                   <PieChart
                     donut
                     data={pieData}
                     showText
                     textColor="black"
                     radius={100}
                     textSize={10}
                     focusOnPress
                     showValuesAsLabels
                     showTextBackground
                     textBackgroundRadius={15}
                   />
                  <Text style={[styles.mediumtextbold,styles.mV_15]}>Total: R$ 146,68</Text>

                  </View>
                  <View style={styles.mV_15}>
                    <FlatList
                    data={pieData}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                </View>
              </View>

              <ContainerViewButton>
                    <Button
                      title="Ver todas as informações"
                      type="primary"
                      // onPress={handleSignIn}
                      onPress={handleClick}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
               </View>
              </View>}
                    
              </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  flexColumn:{
    flexDirection:'column',
    marginTop:5
  },
  RowFlex:{
    flexDirection:'row',
    alignItems:'flex-start'
  },
  RowJustify:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  viewstyles:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:10
  },
  tabstyle:{
    color: '#717171', 
    fontWeight: 'bold'
  },
  cardfirst:{
    flexDirection:'row',
    width:'100%',
    height:30
  },
  vencida:{
    flexDirection: 'row',
     justifyContent: 'space-between',
     borderBottomColor:'#f3f3f3',
     borderTopColor:'#f3f3f3',
     borderBottomWidth:1,
     borderTopWidth:1,
     paddingVertical:5
  },
  cardsecond:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
  },
  viewreal:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical:15
  },
  borderStyle:{
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderRadius: 5
  },
  cardexc:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewmes:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
  },
  viewlietura:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:5
  },
  viewbar:{
    flexDirection:'row',
    alignItems:'flex-start'
  },
  innerview:{
    flexDirection:'column',
    width:'60%',
    justifyContent:'space-between'
  },
  viewtributos:{
    flexDirection:'row',
    width:'100%',
    marginVertical:5
  },
  viewtarif:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    marginVertical:5
  },
  viewconsumo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:10
  },
  viewfeather:{
    backgroundColor: '#04704e',
    padding:6,
    borderRadius:3,
    flexDirection:'row'
  },
  viewbana:{
    width:'100%',
    backgroundColor:'#80c342',
    borderRadius:15
  },
  viewdate:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between'
  },
  viewdata:{
    flexDirection:'column',
    width:'100%',
    alignContent:'center',
    alignItems:'center'
  },
  viewbanderia:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    marginVertical:5
  },
  activity:{
    flex: 1,
    marginTop:240,
    justifyContent: 'center',
    alignItems:'center'
  },
  viewvalor:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:10
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
  first: {
    color: 'black'
  },
  second: {
    fontWeight: '500',
    color: '#02ade1',
    flexShrink: 1,
  },
  bartext: {
    fontWeight: '500',
    color: '#02ade1',
    fontSize: 10,
    marginHorizontal:5
  },
  bar: {
    width: 14,
    height: 14,
    borderRadius:7
  },
  bottomtext: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:20,
    borderTopWidth:1,
    borderTopColor:'lightgrey'
  },
  mV_15:{
    marginVertical:15
  },
  mV_10:{
    marginVertical:10
  }
});