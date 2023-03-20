import React from 'react';

import {
  Dimensions,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
} from 'react-native';
import {boxShadowCard} from '../../helpers/functions/utils';

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

export default function CardSearch({
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
        paddingTop: height * 0.022,
      }}>
      <StyledCardBoxShadow style={boxShadowCard()}>
        <StyledCardContent status={status}>
          <StyledContentStatus>
            <StyledViewStatus status={status}>
              <StyledTextStatus>{status}</StyledTextStatus>
            </StyledViewStatus>
          </StyledContentStatus>
          <StyledText>
            <Text> Número da Instalação: </Text>
            <StyledInstallCode>{code_install}</StyledInstallCode>
          </StyledText>
          <StyledAddress numberOfLines={1}>{address}</StyledAddress>
        </StyledCardContent>
      </StyledCardBoxShadow>
    </TouchableOpacity>
  );
}
