import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens

import { WelcomeSegundaVia } from '../../screens/WelcomeSegundaVia';
import { TenScreen } from '../../screens/TenScreen';

import { PagarConta } from '../../screens/PagarConta';
import {HeaderCustom} from '../../components/HeaderCustom';
import {useWindowDimensions} from 'react-native';
import CustomMenuStandard from '../../components/CustomMenuStandard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { TwelveScreen } from '../../screens/TwelveScreen';
import { ThirteenScreen } from '../../screens/ThirteenScreen';
import { FourteenScreen } from '../../screens/FourteenScreen';
import { NinteenScreen } from '../../screens/NinteenScreen';
import { TwoSevenScreen } from '../../screens/TwoSevenScreen';
import { TwentyScreen } from '../../screens/TwentyScreen';
import { blue400, grey100 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

//Screen names
const buttonName = "Início";
const pagName = "Serviços";
const tenName = "Ten";
const fourteen ="fourteen";

const Tab = createBottomTabNavigator();

function TabsContainer() {

  const {Navigator, Screen} = createDrawerNavigator();
  const dimensions = useWindowDimensions();
  return (
      <Tab.Navigator
        initialRouteName={buttonName}
        
        screenOptions={{
          // headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = 'Início';
                let rn1 = 'Serviços';
                let rn2 ='Meus dados';
    
                if (rn === buttonName) {
                  iconName = focused ? 'apps' : 'apps';
    
                } else if (rn1 === pagName) {
                  iconName = focused ? 'add-circle' : 'add-circle';

                } else if (rn2 === tenName) {
                  iconName = focused ? 'contact' : 'contact';
          }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          //   },
          drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
          // drawerStyle: {
          //   backgroundColor: theme.COLORS.DRAWER_STYLE,
          // },
          header: () => (
            <HeaderCustom
              // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
              hideMessage={true}
              // onBackPress={async () => goBack()}
              // backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              // leftOnPress={handleHome}
              leftAction={'back'}
            />
          ),
        }}
        drawerContent={() => <CustomMenuStandard />}
        tabBarOptions={{
          activeTintColor: '#02ade1',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 14, fontWeight:"700",paddingBottom: 5,paddingTop: 5, fontSize: 10 },
          style: { backgroundColor: 'gray', elevation: 0, shadowOpacity: 0, borderTopWidth:2, borderColor:'orange' },
          indicatorStyle: {    borderTopColor: 'teal',
            borderTopWidth: 2,
            flex:1,
            left:"9%"
          },
        }}
        >
        <Tab.Screen name={pagName} component={TenScreen} />
        {/* <Tab.Screen name={tenName} component={TwelveScreen} /> */}

        {/* <Tab.Screen name={tenName} component={ThirteenScreen} /> */}

        {/* <Tab.Screen name={tenName} component={NinteenScreen} /> */}
        {/* <Tab.Screen name={tenName} component={TwoSevenScreen} /> */}
        {/* <Tab.Screen name={tenName} component={TwentyScreen} /> */}

        <Tab.Screen name={buttonName} component={WelcomeSegundaVia} />
        

      </Tab.Navigator>
  );
}

export default TabsContainer;