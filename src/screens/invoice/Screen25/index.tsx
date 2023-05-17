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
import { PieChart } from "react-native-gifted-charts";
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';


export function Screen25() {
  const { b2cLogin } = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
 
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
    navigation.navigate('InvoiceEasy')
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
        <Text style={[styles.smalltext,{fontWeight:'600',color:'black'}]}>R$ {data.item.money}</Text>
      </View>
    )
}

const pieData = [
  {value: 54,name:"COFINS):", color: '#ed1c25', text: '54%',money:'22,13'},
  {value: 40, name:"PIS:",color: '#02ade1', text: '30%',money:'47,69'},
  {value: 20, name:"ICMS:",color: '#f68b1f', text: '26%',money:'22,13'},
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
              
              <View style={styles.checkboxContainer}>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={[styles.largetextbold,{marginVertical:5}]}>Entenda sua conta</Text>
                  </View>
                 
                <View style={{ marginVertical:5}}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Sua leitura</Text>
                    <Text style={[styles.smalltext,{marginVertical:10}]}>O consumo ultrapassou 200 quilowatt-hora e a alíquota de ICMS foi de 25%</Text>
                    <Text style={[styles.smalltext,{marginVertical:10}]}>AQui voce pode comparar e conterr os principais itens presenres na sua coara de me na promo</Text>

                </View> 
                <View style={{ marginVertical:10}}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>Seu consumo</Text>
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
                  <View style={{ marginVertical:10}}>
                    <Text style={[styles.mediumtextbold,{marginVertical:5}]}>O que é consumo?</Text>
                    <Text style={[styles.smalltext,{marginVertical:10}]}>E a quantidade de energia gasta em quilowatt-hora(KVvI durante seu periodo de consumo</Text>
                </View> 
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

                  <View style={{marginVertical:5,}}>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2}]}>Período de consumo: 33 dias</Text>
                    <View style={{flexDirection:'row',width:'100%',height:30}}>
                       <View style={{width:'15%',backgroundColor:'#80c342',borderBottomLeftRadius:15,borderTopLeftRadius:15}}/>
                       <View style={{width:'85%',backgroundColor:'#eeeeee',borderBottomRightRadius:15,borderTopRightRadius:15}}/>
                    </View>
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                      <Text style={[styles.smalltext,{color:'black'}]}>16/03</Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>18/03</Text>
                    </View>
                  </View>

                  <View style={{marginVertical:15}}>
                   <View style={{marginVertical:5}}>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',color:'black',marginVertical: 1}]}>Bandeira</Text>
                   <View style={{ backgroundColor: '#04704e',width:'40%',padding:6,borderRadius:3,flexDirection:'row',marginVertical:10 }}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'white',marginHorizontal:2}]}>Bandeira verde</Text>
                   </View>
                  </View>
                  <Text style={[styles.smalltext,{color:'black'}]}>A tarifa não tem acréscimo.</Text>
                 </View>

                 <View style={{marginVertical:5}}>
                   <View >
                   <View style={{ backgroundColor: '#fbcd5b',width:'40%',padding:6,borderRadius:3,flexDirection:'row',marginVertical:10 }}> 
                   <FeatherIcon name="flag" color="#f15e38" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'#f15e38',marginHorizontal:2}]}>Bandeira verde</Text>
                   </View>
                  </View>
                  <Text style={[styles.smalltext,{color:'black'}]}>A tarifa tem um acréscimo de R$ 1,50 a cada 100 kWh conumidos.</Text>
                 </View>

                 <View style={{marginVertical:5}}>
                   <View >
                   <View style={{ backgroundColor: '#ed2125',width:'40%',padding:6,borderRadius:3,flexDirection:'row',marginVertical:10 }}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'yellow',marginHorizontal:2}]}>Bandeira verde</Text>
                   </View>
                  </View>
                  <Text style={[styles.smalltext,{color:'black'}]}>A tarifa tem um acréscimo de R$ 4,00 a cada 100 kWh consumidos.</Text>
                 </View>

                 <View style={{marginVertical:5}}>
                   <View >
                   <View style={{ backgroundColor: '#ed2125',width:'40%',padding:6,borderRadius:3,flexDirection:'row',marginVertical:10 }}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'yellow',marginHorizontal:2}]}>Bandeira verde</Text>
                   </View>
                  </View>
                  <Text style={[styles.smalltext,{color:'black'}]}>A tarifa tem um acréscimo de R$ 6,00 a cada 100 kWh consumidos.</Text>
                 </View>

                 <View style={{marginVertical:5}}>
                   <View >
                   <View style={{ backgroundColor: '#c0181b',width:'40%',padding:6,borderRadius:3,flexDirection:'row',marginVertical:10 }}> 
                   <FeatherIcon name="flag" color="yellow" size={18} /><Text style={[styles.smalltext,{fontWeight:'600',color:'yellow',marginHorizontal:2}]}>Escassez hídrica</Text>
                   </View>
                  </View>
                  <Text style={[styles.smalltext,{color:'black'}]}>A tarifa tem um acréscimo de R$ 14.20 a cada 100kWh consumidos (exceto para clientes baixa renda).</Text>
                 </View>

                 <View style={{marginVertical:5,backgroundColor: '#1d58a0',padding:15,borderTopRightRadius:35}}>
                  <Text style={[styles.smalltext,{color:'white'}]}>As bandeiras tarifárias são classificadas pelas cores verde, amarela e vermelha, que indicam mensalmente se haverá ou não acréscimo no valor da energia, devido ao uso das usinas termelétricas.</Text>
                  <Text style={[styles.smalltext,{color:'white',marginVertical:15}]}>A decisão sobre qual bandeira será aplicada num determinado período é da Anel (Agência Nacional de Energia Elétrica).</Text>
                 </View>
              
              <View>
              <Text style={styles.mediumtextbold}>Tributos</Text>
              <View style={{flexDirection:'row'}}>
                 <View style={{marginVertical:15}}>
                   <PieChart
                     donut
                     data={pieData}
                     showText
                     textColor="black"
                     radius={120}
                     innerRadius={75}
                     textSize={7}
                     focusOnPress
                     showValuesAsLabels
                     showTextBackground
                     textBackgroundRadius={15}
                   />

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
              <Text style={[styles.mediumtextbold,{marginVertical:15,textAlign:'center'}]}>Vencimento: 13/05/2022</Text>


              <View style={{flexDirection:'row'}}>
                 <View style={{marginVertical:15}}>
                   <PieChart
                     donut
                     data={pieData}
                     showText
                     textColor="black"
                     radius={120}
                     innerRadius={75}
                     textSize={7}
                     focusOnPress
                     showValuesAsLabels
                     showTextBackground
                     textBackgroundRadius={15}
                   />

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
              <Text style={[styles.mediumtextbold,{marginVertical:15,textAlign:'center'}]}>Vencimento: 13/05/2022</Text>
            </View>
            </View>

              <View style={{marginVertical:5}}>
                  <View>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',marginHorizontal:2}]}>Os tributos são compostos por:</Text>
                  </View>
                   <Text style={[styles.smalltext,{color:'black',marginVertical:5}]}>Programas de Integração Social (PIS): Tributo Federal que assegura recursos voltados ao trabalhador e programas sociais do Governo Federal. De modo geral, tem a finalidade de melhorar a distribuicão da renda nacional.</Text>

                   <Text style={[styles.smalltext,{color:'black',marginVertical:5}]}>Contribuição para Financiamento da Seguridade Social (COFINS): Também é um tributo Federal e incide sobre a receita bruta das empresas em geral, se destinando a financiar a seguridade social (previdência social, a saúde e a assistência social).</Text>

                   <Text style={[styles.smalltext,{color:'black',marginVertical:5}]}>Importo sobre Circulação de Mercadorias e Serviços (ICMS): Esse é um tributo Estadual aplicado sobre qualquer produto ou serviço, como por exemplo, a energia elétrica fornecida. Cada Estado estabelece uma alíquota para esse imposto que pode ser variável de acordo com o seu consumo.</Text>
                 </View>
            </View>

              <View style={{marginVertical:5}}>
                  <View>
                   <Text style={[styles.mediumtextbold,{fontWeight:'600',marginHorizontal:2}]}>ICMS:</Text>
                  </View>
                  <Text style={[styles.smalltext,{color:'black',marginVertical:5}]}>As regras de cobrança do ICMS são definidas pelos Estados. A distribuidora faz apenas o repasse integralM desse imposto para Secretaria da Fazenda Estadual(SEFAZ).</Text>
                 </View>
                 
                 <View style={{marginVertical:5,}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                     <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2}]}>Mês de referência</Text>
                     <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2}]}>Quantidade</Text>
                   </View>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2,textAlign:'center',width:'55%'}]}>25%</Text>
                    <View style={{flexDirection:'row',width:'100%',height:30}}>
                       <View style={{width:'55%',backgroundColor:'#f15e38',borderBottomLeftRadius:15,borderTopLeftRadius:15}}/>
                       <View style={{width:'45%',backgroundColor:'#eeeeee',borderBottomRightRadius:15,borderTopRightRadius:15}}/>
                    </View>
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                      <Text style={[styles.smalltext,{color:'black'}]}>16/03</Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>18/03</Text>
                    </View>
                </View>

                <View style={{marginVertical:5,}}>
                   <Text style={[styles.smalltext,{fontWeight:'600',color:'black',marginVertical:2,textAlign:'center',width:'55%'}]}>25%</Text>
                    <View style={{flexDirection:'row',width:'100%',height:30}}>
                       <View style={{width:'55%',backgroundColor:'#f15e38',borderBottomLeftRadius:15,borderTopLeftRadius:15}}/>
                       <View style={{width:'45%',backgroundColor:'#eeeeee',borderBottomRightRadius:15,borderTopRightRadius:15}}/>
                    </View>
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                      <Text style={[styles.smalltext,{color:'black'}]}>16/03</Text>
                      <Text style={[styles.smalltext,{color:'black'}]}>18/03</Text>
                    </View>
                  </View>

                  <View style={{marginVertical:10,flexDirection:'row',justifyContent:'flex-start'}}>
                    <View>
                       <Text style={{color:'#80c342',fontSize:20}}>0%</Text>
                    </View>
                    <View>
                      <Text style={[styles.smalltext,{color:'black',marginHorizontal:10}]}>Não é cobrado o ICMS caso o consumo de energia seja de até 90 kWh.</Text>
                    </View>
                </View>


                <View style={{marginVertical:10,flexDirection:'row',justifyContent:'flex-start'}}>
                    <View>
                       <Text style={{color:'#fecd5b',fontSize:20}}>12%</Text>
                    </View>
                    <View>
                      <Text style={[styles.smalltext,{color:'black',marginHorizontal:10}]}>É o percentual do ICMS caso o consumo de energia seja entre 91 kWh e 200 kWh.</Text>
                    </View>
                  </View>

                  <View style={{marginVertical:10,flexDirection:'row',justifyContent:'flex-start'}}>
                    <View>
                       <Text style={{color:'#f15e38',fontSize:20}}>25%</Text>
                    </View>
                    <View>
                      <Text style={[styles.smalltext,{color:'black',marginHorizontal:10}]}>É o percentual do ICMS caso o consumo de energia seja entre 91 kWh e 200 kWh.</Text>
                    </View>
                </View>


                <View style={{marginVertical:5,}}>
                   <Text style={[styles.mediumtext,{fontWeight:'600',color:'black',marginVertical:2,}]}>Taxas</Text>
                  </View>
                  <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                       <Text style={styles.smalltext}>Encargos Setoriais</Text>
                    </View>
                    <View>
                      <Text style={[styles.largetextbold,{color:'black',marginVertical:0}]}>R$12,78</Text>
                    </View>
                </View>

                <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                       <Text style={styles.smalltext}>Perdas</Text>
                    </View>
                    <View>
                      <Text style={[styles.largetextbold,{color:'black',marginVertical:0}]}>R$8,75</Text>
                    </View>
                </View>

                <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                       <Text style={styles.smalltext}>Total de taxas</Text>
                    </View>
                    <View>
                      <Text style={[styles.largetextbold,{color:'#02ade1',marginVertical:0}]}>R$21,53</Text>
                    </View>
                </View>
                  <Text style={[styles.mediumtextbold,{textAlign:'center'}]}>Vencimento: 13/05/2022</Text>

                <View style={{marginVertical:5,}}>
                   <Text style={[styles.mediumtext,{fontWeight:'600',color:'black',marginVertical:2,}]}>Taxas</Text>
                  </View>
                  <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                       <Text style={styles.smalltext}>Encargos Setoriais</Text>
                    </View>
                    <View>
                      <Text style={[styles.largetextbold,{color:'black',marginVertical:0}]}>R$12,78</Text>
                    </View>
                </View>

                <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                       <Text style={styles.smalltext}>Perdas</Text>
                    </View>
                    <View>
                      <Text style={[styles.largetextbold,{color:'black',marginVertical:0}]}>R$8,75</Text>
                    </View>
                </View>

                <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                       <Text style={styles.smalltext}>Total de taxas</Text>
                    </View>
                    <View>
                      <Text style={[styles.largetextbold,{color:'#02ade1',marginVertical:0}]}>R$21,53</Text>
                    </View>
                </View>
                  <Text style={[styles.mediumtextbold,{textAlign:'center'}]}>Vencimento: 13/05/2022</Text>
                  <Text style={[styles.smalltext,{}]}>Aqui você vê as cobranças de juros e multa por atraso de pagamento e a Taxa de Contribuição para o Custeio do Serviço de Iluminação Pública (COSIP/CIP) que é cobrada pelo uso da iluminação pública da cidade, sendo recolhido pela CPFL e repassado a Prefeitura Municipal. Caso tenha algum serviço de terceiros, como seguros, ele também é exibido aqui.</Text>

                  <View style={{marginVertical:15,backgroundColor: '#1d58a0',padding:15,borderTopRightRadius:35}}>
                  <Text style={[styles.smalltext,{color:'white'}]}>A CPFL/RGE faz apenas a arrecadação dos valores desse tributos e repassa o valor integral aos órgãos responsáveis.</Text>
                 </View>
                 
                <View style={{marginVertical:25}}>
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