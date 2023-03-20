import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';
import {ImageSourcePropType} from 'react-native';
import {Container, Title, ContainerViewIcon, TypeProps} from './styles';

type Props = RectButtonProps & {
  title: string;
  type?: TypeProps;
  source?: ImageSourcePropType;
};

export function ButtonBlack({title, type = 'primary', source, ...rest}: Props) {
  return (
    <Container type={type} {...rest}>
      <ContainerViewIcon source={source} />
      <Title>{title}</Title>
    </Container>
  );
}
