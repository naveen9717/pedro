import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { TouchableOpacity, Text } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type?: TypeProps;
  marginBottom?: number;
  height?: number;
  bgColor?: String;
  Color?: String;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 30%;
  height: ${({ height }) => (height ? height : 22)}px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : bgColor)};
  
  border-color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.PRIMARY_800 : theme.COLORS.PRIMARY_800};
  border-width: 1px;
  ${({ marginBottom }) => css`
    margin-bottom: ${marginBottom ? marginBottom : 0}px;
  `}
`;

export const Title = styled(Text)<ContainerProps>`
  font-size: 12px;
  color: ${({ Color }) => (Color ? Color : Color)};
  
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE_BOLD};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE,
}))``;
