import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');
interface ContainerProps {
  height?: number;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
`;

export const InputArea = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  ${({ theme }) => css`
    background-color: ${theme.COLORS.BACKGROUND};
    border: 1px solid ${theme.COLORS.BORDER};
  `};
`;

export const Input = styled(TextInput)<ContainerProps>`
  flex: 1;
  height: ${({ height }) => (height ? height : 56)}px;
  min-height: ${height * 0.06}px;
  padding: 0 ${width * 0.028}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const Button = styled.TouchableOpacity`
  margin-right: ${width * 0.0365}px;
`;

export const IconView = styled.View`
  margin-right: ${width * 0.0365}px;
`;
