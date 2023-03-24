import React, {memo} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
// import { RectButton } from 'react-native-gesture-handler';

import {Container, ContainerBadge, ContainerBadgeView} from './styles';
import Feather from 'react-native-vector-icons/Feather';

import StatusBarColor from '../../config/StatusBarColor';
import {
  boxShadowHeaderStyle,
  // boxShadowStyle,
} from '../../helpers/functions/utils';
import {CleanButton} from '../ButtonClean';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  backgroundColor: string;
  isPrimaryColorDark: boolean;
  onBackPress?: () => void;
  isFocused: boolean;
  marginTop?: number | undefined;
  hideMessage?: boolean;
  showLeft?: boolean;
  leftOnPress?: () => void;
  leftAction?: 'back' | 'login' | 'menu';
};
const {width} = Dimensions.get('window');
export function HeaderCustom({
  backgroundColor,
  isPrimaryColorDark,
  marginTop,
  onBackPress,
  isFocused,
  hideMessage,
  showLeft,
  leftOnPress,
  leftAction,
}: Props) {
  const navigation = useNavigation();
  const icBell = require('../../assets/images/bell.png');
  const icLogo = require('../../assets/Logo_CPFL_Energia.png');
  return (
    <>
      <StatusBarColor
        backgroundColor={backgroundColor}
        isPrimaryColorDark={isPrimaryColorDark}
      />

      <Container style={{...boxShadowHeaderStyle(), marginTop: marginTop}}>
        {leftAction &&
          (leftAction === 'back' ? (
            <TouchableOpacity onPress={onBackPress}>
              <Feather
                // style={{alignItems: 'center'}}
                name="arrow-left"
                size={23}
                color={backgroundColor}
              />
            </TouchableOpacity>
          ) : leftAction === 'login' ? (
            <CleanButton onPress={leftOnPress} title={'Login'} />
          ) : leftAction === 'menu' ? (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
              {/* <Text>
                <Icon name="menu" size={23} color={backgroundColor} />;
              </Text> */}

              <Feather name="menu" size={23} color={backgroundColor} />
            </TouchableOpacity>
          ) : null)}

        <View style={{left: width * (0.5 - 0.052), position: 'absolute'}}>
          <Image
            style={{
              width: 45,
              height: 33,
            }}
            source={icLogo}
          />
        </View>
        <ContainerBadge style={{left: width * 0.9, position: 'absolute'}}>
          {hideMessage ? (
            <>
              <ContainerBadgeView size={10} />
              <Image resizeMode="contain" source={icBell} />
            </>
          ) : null}
        </ContainerBadge>
      </Container>
    </>
  );
}
