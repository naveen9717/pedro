import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';

import {Container, ContainerBadge, ContainerBadgeView} from './styles';

import StatusBarColor from '../../config/StatusBarColor';
import {
  boxShadowHeaderStyle,
  // boxShadowStyle,
} from '../../helpers/functions/utils';

type Props = {
  backgroundColor: string;
  isPrimaryColorDark: boolean;
  showBackButton: boolean;
  onBackPress: () => {};
  isFocused: boolean;
};

export function Header({
  backgroundColor,
  isPrimaryColorDark,
  showBackButton = false,
  onBackPress,
  isFocused,
}: Props) {
  const navigation = useNavigation();
  const icBell = require('../../assets/images/bell.png');
  const icLogo = require('../../assets/images/Logo_CPFL_Energia.png');
  return (
    <>
      <StatusBarColor
        backgroundColor={backgroundColor}
        isPrimaryColorDark={isPrimaryColorDark}
      />

      <Container style={boxShadowHeaderStyle()}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress}>
            {/* <Feather name="arrow-left" size={23} color={backgroundColor} /> */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
            {/* <Feather name="menu" size={23} color={backgroundColor} /> */}
          </TouchableOpacity>
        )}

        <Image
          style={{
            width: 45,
            height: 33,
          }}
          source={icLogo}
        />
        <ContainerBadge>
          <ContainerBadgeView size={10} />
          <Image resizeMode="contain" source={icBell} />
        </ContainerBadge>
      </Container>
    </>
  );
}
