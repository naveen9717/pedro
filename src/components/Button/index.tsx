import React from 'react';
import {Dimensions} from 'react-native';
import {RectButtonProps} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {Container, Title, Load, TypeProps} from './styles';

type Props = RectButtonProps & {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
  marginBottom?: number;
  children?: React.ReactNode;
  disabled?: boolean;
  height?: number;
  Icon?:string;
  IconColor?:string;
  onPress?: () => void;
};

export function Button({
  title,
  Icon,
  IconColor,
  type = 'primary',
  isLoading = false,
  marginBottom,
  // disabled = false,
  children,
  height,
  onPress,
}: Props) {
  const dim = Dimensions.get('window');
  return (
    <Container
      type={type}
      disabled={isLoading}
      onPress={onPress}
      marginBottom={marginBottom as number}
      height={height}>
      {isLoading ? (
        <Load />
      ) : (
        <>
        
          <Title type={type}><AntIcon name={Icon} color={IconColor} size={15} /> {title}</Title>
          {children}
        </>
      )}
    </Container>
  );
}
