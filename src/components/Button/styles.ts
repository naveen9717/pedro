import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { TouchableOpacity, Text } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type?: TypeProps;
  marginBottom?: number;
  height?: number;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : 50)}px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.TITLE_WHITE : theme.COLORS.PRIMARY_800};
  border-color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.PRIMARY_800 : theme.COLORS.PRIMARY_800};
  border-width: 1px;
  ${({ marginBottom }) => css`
    margin-bottom: ${marginBottom ? marginBottom : 0}px;
  `}
`;

export const Title = styled(Text)<ContainerProps>`
  font-size: 12px;
  color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.PRIMARY_800 : theme.COLORS.TITLE_WHITE};
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE_BOLD};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE,
}))``;
