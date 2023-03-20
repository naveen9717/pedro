import React from 'react';

import {
  Dimensions,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {boxShadowCard} from '../../helpers/functions/utils';
import { Card, Paragraph } from 'react-native-paper';


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
  address: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export default function CardMain({
  status,
  title,
  code_install,
  address,
  onPress,
}: Props) {
  const {height} = Dimensions.get('window');
  // onPress={() => navigate('ListSecondProof')
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingTop: height * 0.01,
      }}>
     
         <View style={{marginBottom:20}}>
                <Card style={{backgroundColor:'white'}}>
                
                    <Card.Content>
                    
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                      <View>
                        <Text style={styles.smalltext}>{title}</Text>
                        <Text style={styles.mediumtextbold}>{code_install}</Text>
                      </View>
                     <View>
                      <TouchableOpacity
                      //  onPress={handleClick}
                       style={styles.onpress}>
                       <Text style={{color:'white'}}>Trocar instalação <Image
                    source={require('../../assets/icons/right-arrow.png')}
                    style={styles.icon}
                  /></Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
            
                    <View>
                    <Text style={styles.addressheading}>Endereço</Text>
                    <StyledAddress numberOfLines={2}>{address}</StyledAddress>
                    </View>
                    
            
                 </View>

            
                 <View style={{alignItems:'center'}}>

                   <Text style={styles.smalltext}>Total de débitos em aberto</Text>
                  <Text style={styles.amount}>R$ 15.8283,58</Text>
               </View>
         
            
                 <View style={styles.bottomview}><Text style={{color:'white',textAlign:'center'}}>Parcelamento disponivel <Image
                    source={require('../../assets/icons/right-arrow.png')}
                    style={styles.icon}
                  /></Text></View>
                  </Card.Content>
               </Card>

                </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    marginBottom: 10,
    fontSize: 25,
    color:'#02ade1',
    fontWeight:'600'
  },
  smalltext: {
    fontSize: 13,
    color:'black',
    marginTop:15
  },
  addressheading: {
    fontSize:15,
    fontWeight:'600',
    marginTop:10
  },
  onpress:{
    paddingVertical: 2,
    paddingHorizontal: 15,
    backgroundColor:'#02ade1',
    borderRadius:5
  },
  bottomview:{
    paddingVertical: 2,
    paddingHorizontal: 15,
    backgroundColor:'#80c342',
    borderRadius:5
  },
  icon:{
    width:10,
    height: 10
  },
  label: {
    margin: 5,
    fontSize:10,
    color:'#02ade1',
    fontWeight:'600'
  },
   mediumtext: {
    fontSize: 18,
    color:'black',
    fontWeight:'500',
    marginVertical: 15,
  },
  mediumtextbold: {
    fontSize: 13,
    color:'black',
    fontWeight:'600',
  },
  title: {
    fontSize:13,
    fontWeight:'600',
    marginTop:10,
    backgroundColor:'orange',
    color:'red',
    paddingVertical: 2,
    paddingHorizontal: 15,
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
  
  bar:{
    width:40,
    height: 30,

  }
});