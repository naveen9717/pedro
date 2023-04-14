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

import {
  StyledCardContent,
  StyledViewStatus,
  StyledContentStatus,
  StyledCardBoxShadow,
  StyledTextStatus,
  StyledInstallCode,
  StyledAddress,
  StyledText,
} from './styles';

type Props = {
  status: string;
  title: string;
  code_install: string;
  mesReferencia: string;
  dataVencimento:string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export default function CardChild({
  status,
  title,
  code_install,
  dataVencimento,
  mesReferencia,
  onPress,
}: Props) {
  const {height} = Dimensions.get('window');
  const items = [
    { id: 'edit', label: 'Entenda sobre seu parcelament' },
  ];
  return (
   
       <View style={styles.checkboxContainer}>
         
                <Card style={{backgroundColor:'white'}}>
                <Card.Title
                  // title=""
                  subtitle={title}
                  // rightStyle={{backgroundColor:'#02ade1'}}
                  right={(props) => 
                     
                      <MenuProvider style={{flexDirection: 'column'}}>
                     <Menu style={{ height: 50 }}>
                      <MenuTrigger><IconButton {...props} icon="dots-vertical" containerColor="#02ade1" iconColor="#FFF"  /></MenuTrigger>
                     <MenuOptions>
                    <MenuOption value={1} text='Entenda sobre seu parcelamento' customStyles={optionStyles}/>
                     </MenuOptions>
                    </Menu>
                    </MenuProvider>
                 
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
                    <View style={styles.borderBottom}>
            
                    <View>
                        <Text style={styles.title}>{status}</Text>
                    </View>
                    <View>
                      <Text style={styles.first}>Vencimento</Text>
                      <Text style={styles.second}>{Moment(dataVencimento).format('DD/MM/YYYY')}</Text>
                    </View>
                  <View>
                     <Text style={styles.first}>Referente à</Text>
                     <Text style={styles.second}>Fevereiro{mesReferencia}</Text>
                   </View>
            
                 </View>

                 <View style={{flexDirection: 'row',  justifyContent: 'space-between',marginVertical:15}}>
            
                    <View>
                    <TouchableOpacity
                        onPress={onPress}
                       >
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

const optionStyles = {
  optionWrapper: {
    backgroundColor: 'white',
    zIndex:100
  },
  optionText: {
    color:'#02ade1',
    fontWeight:'600'
  },
};
const styles = StyleSheet.create({
  container: {
   
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' 
  },
  borderBottom:{
     flexDirection: 'row', 
     justifyContent: 'space-between',
     borderColor:'#f4f4f4',
     borderBottomWidth:1,
     borderTopWidth:1,
     paddingVertical:7
  },
  checkboxContainer: {
    marginBottom: 20,
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