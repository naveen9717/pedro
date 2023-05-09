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
  FlatList
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


export function InvoiceEasy() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState([]);
 
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

console.log('tab',tab);
  
  useEffect(() => {
    HistoryDataServices.getTabBarData().then((res) => {
      setTab(res.data.historicoContas);
   });
  }, []);
  // {value: 254,date:"05/2022", color: '#80c342',color2:'#eeeeee', percentage: '68%',percent:'32%'},

  var arr = [];

  const stringifybarData = tab.map((data,key) => {
    arr.push(...[{value: data?.mediaConsumo,color: '#02ade1',color2:'#eeeeee', percentage: '68%',percent:'32%'}])
  });

  console.log('arr',arr);

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
  {value: 54,name:"Taxas e tributos", color: '#02ade1', text: '54%'},
  {value: 40, name:"CPFL Paulista",color: '#80c342', text: '30%'},
  {value: 20, name:"Energia gerada",color: '#f68b1f', text: '26%'},
  {value: 21,  name:"Transmissäão",color: '#ed1c25', text: '26%'},
];

const HorizontalBarData = [
  {value: 254,date:"05/2022", color: '#80c342',color2:'#eeeeee', percentage: '68%',percent:'32%'},
  {value: 280, date:"04/2022",color: '#fecd5b',color2:'#eeeeee', percentage: '75%',percent:'25%'},
];

const renderHorizontalItem = (data) => {
  return (
    <View style={{marginVertical:5,}}>
      <View style={{flexDirection:'row',width:'100%',height:30}}>
      <View style={{width:data.item.percentage,backgroundColor:data.item.color,borderTopStartRadius:15,borderBottomStartRadius:15}}/>
      <View style={{width:data.item.percent,backgroundColor:data.item.color2,borderTopEndRadius:15,borderBottomEndRadius:15,}}/>
      </View>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
      <Text style={[styles.smalltext,{color:'black'}]}>{data.item.date}</Text>
      <Text style={[styles.smalltext,{color:'black'}]}>KWh {data.item.value}</Text>
      </View>
    </View>
  )
}

const HorizontalBarData2 = [
  {value: 254,name:"ICMS", color: '#80c342',color2:'#fecd5b',color3: 'red',color4: '#eeeeee',  percentone: '25%',percenttwo:'35%',percentthree:'12%',percentfour:'28%'},
];

const renderHorizontalItem2 = (data) => {
  return (
    <View style={{marginVertical:5,}}>
      <View style={{flexDirection:'row',width:'100%',height:30}}>
      <View style={{width:data.item.percentone,backgroundColor:data.item.color,borderTopStartRadius:15,borderBottomStartRadius:15}}/>
      <View style={{width:data.item.percenttwo,backgroundColor:data.item.color2}}/>
      <View style={{width:data.item.percentthree,backgroundColor:data.item.color3}}/>
      <View style={{width:data.item.percentfour,backgroundColor:data.item.color4,borderTopEndRadius:15,borderBottomEndRadius:15,}}/>


      </View>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
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

                <View style={{ marginVertical:10}}>
                  <Title>Conta fácil de entender</Title>
                </View>
                
                <View style={{ marginVertical:5}}>
                 <SearchBar
                   inputStyle={{backgroundColor: 'white'}}
                   containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                   inputContainerStyle={{backgroundColor: 'white',height:40}}
                   placeholderTextColor={'#g5g5g5'}
                   placeholder={'Searching...'}
                   searchIcon={{color:'#02ade1',size:30,}}
                 />
              </View>
              <View style={{ marginVertical:10}}>
                <Card style={{ backgroundColor: '#80c342' }}>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                  tabTextStyle={{ color: '#717171', fontWeight: 'bold' }}
                  activeTabTextStyle={{ color: '#FFFFFF' }}
               />
               {segment.customStyleIndex === 0
                    && 
                    <View style={{ marginVertical: 20 }}>
                    <View style={styles.checkboxContainer}>
                    <Card style={{ backgroundColor: 'white' }}>
                      <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View>
                            <Text style={styles.smalltext}>Parcelamento em código de barras</Text>
                            <Text style={styles.amount}>R$ 124.153,58</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View>
                            <Text style={styles.title}>Vencida</Text>
                          </View>
                          <View>
                            <Text style={styles.first}>Vencimento</Text>
                            <Text style={styles.second}>13/03/2022</Text>
                          </View>
                          <View>
                            <Text style={styles.first}>Consumo</Text>
                            <Text style={styles.second}>10.000 kWh</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row',  justifyContent: 'space-between',marginVertical:15}}>
                         <View>
                          <Text style={styles.second}>Realizar pagamento</Text>
                        </View>
                        <View>
                        <FeatherIcon name="share-2" color="#02ade1" size={18} />
                        </View>
                      </View>
                      </Card.Content>
                    </Card>
                  </View>
  
                  <View style={{ marginVertical:15}}>
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
                      onPress={handleHome}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
                  <View style={{ marginVertical:10}}>
                    <Text style={[styles.largetextbold,{marginVertical:10}]}>Entenda sua conta</Text>
                    <Text style={[styles.mediumtextbold,{marginVertical:15}]}>Sua leitura</Text>
                  </View>
                  <View style={{ marginVertical:15}}>
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
                <View style={{ marginVertical:10}}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Sua leitura</Text>
                    <Text style={[styles.smalltext,{marginVertical:10}]}>Confira abaixo os principais motivos que levaram ao aumento:</Text>
                </View> 


                <View style={{marginVertical:15}}>
                 <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Mes de referência</Text>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>Quantidade</Text>
                 </View>
                    <FlatList
                    data={stringybarData}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>Seu consumo aumentou comparado ao més passado.</Text>

                </View>


                <View style={{marginVertical:15}}>
                 <View style={{flexDirection:'row',width:'100%',marginVertical:5}}>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',color:'black'}]}>Tributos</Text>
                 </View>
                    <FlatList
                    data={HorizontalBarData2}
                    // ItemSeparatorComponent={FlatListSeparator}
                    renderItem={item => renderHorizontalItem2(item)}
                    keyExtractor={item => item.value.toString()}
                   /> 
                  <Text style={[styles.smalltext,{marginVertical:10,color:'black'}]}>O consumo ultrapassou 200 quilowatt-hora e a alíquota de ICMS foi de 25%</Text>

                </View>

                <View style={{marginVertical:15}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginVertical:5}}>
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
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                      <Text style={[styles.smalltext,{color:'black'}]}>18/04</Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>17/04</Text>
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
                 <View style={{marginVertical:15}}>
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
                  <Text style={[styles.mediumtextbold,{marginVertical:15}]}>Total: R$ 146,68</Text>

                  </View>
                  <View style={{marginVertical:15}}>
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
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                      <View style={{flexDirection:'column',width:'60%',justifyContent:'space-between'}}>
                         <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Data da leitura anterior</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>16/03/2022</Text>
                      </View>
                      <View style={{flexDirection:'column',width:'60%',justifyContent:'space-between'}}>
                         <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Dias consumidos</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>33 dias</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                      <View style={{flexDirection:'column',width:'60%',justifyContent:'space-between'}}>
                         <Text style={[styles.smalltext,{color:'black',marginVertical:3}]}>Data da leitura atual</Text>
                         <Text style={[styles.mediumtextboldblue,{fontWeight:'600'}]}>18/04/2022</Text>
                      </View>
                      <View style={{flexDirection:'column',width:'60%',justifyContent:'space-between'}}>
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
                      onPress={handleHome}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
                  <View style={{ marginVertical:10}}>
                    <Text style={[styles.largetextbold,{marginVertical:10}]}>Entenda sua conta</Text>
                    <Text style={[styles.mediumtextbold,{marginVertical:15}]}>Sua leitura</Text>
                  </View>
                  <View style={{ marginVertical:15}}>
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
                <View style={{ marginVertical:10}}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Sua leitura</Text>
                    <Text style={[styles.smalltext,{marginVertical:10}]}>Confira abaixo os principais motivos que levaram ao aumento:</Text>
                </View> 


                <View style={{marginVertical:15}}>
                 <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
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
                <View style={{marginVertical:15}}>
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

                <View style={{marginVertical:15}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginVertical:5}}>
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
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                      <Text style={[styles.smalltext,{color:'black'}]}>18/04</Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>17/04</Text>
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
                 <View style={{marginVertical:15}}>
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
                  <Text style={[styles.mediumtextbold,{marginVertical:15}]}>Total: R$ 146,68</Text>

                  </View>
                  <View style={{marginVertical:15}}>
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
                      <View style={{flexDirection:'column',width:'100%',alignContent:'center',alignItems:'center'}}>
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
                      onPress={handleHome}
                      isLoading={isLogging}
                    />
                  </ContainerViewButton>
                  <View style={{ marginVertical:10}}>
                    <Text style={[styles.largetextbold,{marginVertical:10}]}>Entenda sua conta</Text>
                    <Text style={[styles.mediumtextbold,{marginVertical:15}]}>Sua leitura</Text>
                  </View>
                  <View style={{ marginVertical:15}}>
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
                <View style={{ marginVertical:10}}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Sua leitura</Text>
                    <Text style={[styles.smalltext,{marginVertical:10}]}>Confira abaixo os principais motivos que levaram ao aumento:</Text>
                </View> 


                <View style={{marginVertical:15}}>
                 <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
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
                <View style={{marginVertical:15}}>
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

                <View style={{marginVertical:15}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginVertical:5}}>
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
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                      <Text style={[styles.smalltext,{color:'black'}]}>18/04</Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>17/04</Text>
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
                 <View style={{marginVertical:15}}>
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
                  <Text style={[styles.mediumtextbold,{marginVertical:15}]}>Total: R$ 146,68</Text>

                  </View>
                  <View style={{marginVertical:15}}>
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