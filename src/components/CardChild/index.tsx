import React,{useState} from 'react';

import {
  Dimensions,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {boxShadowCard} from '../../helpers/functions/utils';
import { Card,IconButton } from 'react-native-paper';
import Moment from 'moment';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Tooltip } from 'react-native-elements';

type Props = {
  status: string;
  title: string;
  code_install: string;
  mesReferencia: string;
  dataVencimento:string;
  temParcelamentoEmA:Boolean;
  parcelamentoD:Boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export default function CardChild({
  status,
  title,
  code_install,
  dataVencimento,
  mesReferencia,
  parcelamentoD,
  temParcelamentoEmA,
  onPress,
}: Props) {
  const {height} = Dimensions.get('window');

  const renderConditionalText=() =>{
    if (status === "Paga") {
      return  <Text style={styles.pagaV}>{status}</Text>;
    }
    else if (status !== "Paga" || Moment(dataVencimento).format('DD/MM/YYYY')> new Date().toString() ) {
      return  <Text style={styles.vencidaV}>Vencida</Text>;
    }
    else {
      return  <Text style={styles.abertaV}>Aberta</Text>;
    }
   }

   const renderToggle=() =>{
    if (parcelamentoD == true || temParcelamentoEmA == true) {
      return  <Tooltip popover={<View><Text style={styles.labels}>Entenda sobre seu</Text><Text style={styles.labels}>parcelamento</Text></View>} withOverlay={false} containerStyle={styles.popovershadow} backgroundColor="#efeded"><Text><IconButton icon="dots-vertical" containerColor="#02ade1" iconColor="#FFF"  /></Text></Tooltip>
      ;
    }
    else {
      return  null;
    }
   }

  return (
   
       <View style={styles.checkboxContainer}>
                <Card style={{backgroundColor:'white'}}>
                <Card.Title
                  // title=""
                  subtitle={title}
                  // rightStyle={{backgroundColor:'#02ade1'}}
                  right={(props) => 
                    renderToggle()
                    }
                    >
                </Card.Title>
                  <Card.Content>
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                      <View>
                        {/* <Text style={styles.smalltext}>{title}</Text> */}
                        <Text style={styles.amount}>R$ 124.153,58</Text>
                      </View>
                  </View>
                    <View style={styles.borderBottom} >
                      {renderConditionalText()}
                    <View>
                      <Text style={styles.first}>Vencimento</Text>
                      <Text style={styles.second}>{Moment(dataVencimento).format('DD/MM/YYYY')}</Text>
                    </View>
                  <View>
                     <Text style={styles.first}>Referente à</Text>
                     <Text style={styles.second}>Feverei {mesReferencia}</Text>
                   </View>
                 </View>

                 <View style={{flexDirection: 'row',  justifyContent: 'space-between',marginVertical:15}}>
                    <View>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.second}>Pagar sua Conta</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={styles.second}>Detalhamento</Text>
                    </View>
                  <View>
                  <Image
                    source={require('../../assets/icons/share.png')}
                    style={styles.icon}
                  />
                   </View>
                 </View>
                  </Card.Content>
               </Card>
            </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' 
  },
  borderBottom:{
     flexDirection: 'row', 
     justifyContent: 'space-between'
  },
  pagaV:{
    fontSize:13,
    fontWeight:'600',
    marginTop:10,
    backgroundColor:'#e1e874',
    color:'#04704e',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius:5
  },
  vencidaV:{
    fontSize:13,
    fontWeight:'600',
    marginTop:10,
    backgroundColor:'#f8b1ab',
    color:'#c0161b',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius:5
},
abertaV:{
  fontSize:13,
    fontWeight:'600',
    marginTop:10,
    backgroundColor:'#fed26c',
    color:'#f15e38',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius:5
},
  checkboxContainer: {
    marginBottom: 20,
  },
  popovershadow:{
    backgroundColor:"#fcfcfc",
    borderRadius:0, 
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 5,
    fontSize:10,
    color:'#02ade1',
    fontWeight:'600'
  },
  amount: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight:'600'
  },
  smalltext: {
    fontSize: 13,
    color:'black',
    
  },
  labels: {
    margin: 1,
    fontSize:12,
    color:'#02ade1',
    fontWeight:'600'
  },
   mediumtext: {
    fontSize: 18,
    color:'black',
    fontWeight:'500',
    marginVertical: 15,
  },
  title: {
    fontSize:13,
    fontWeight:'600',
    marginTop:10,
    backgroundColor:'#e1e874',
    color:'#04704e',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius:5
  },
  onpress:{
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor:'maroon',
    borderRadius:5
  },
  first:{
    color:'black'
  },
  white:{
    color:'white',
    textAlign:'center'
  },
  second:{
    fontWeight:'500',
    color:'#02ade1',
    flexShrink: 1 
  },
  bartext:{
    fontWeight:'500',
    color:'#02ade1',
    fontSize:10
  },
  icon:{
    width:20,
    height: 20,
    color:'#02ade1',
  },
  bar:{
    width:40,
    height: 30,
  }
});