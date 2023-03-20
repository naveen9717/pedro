import styled, {css} from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeProps;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  height: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;

  flex-direction: row;

  background-color: ${({theme, type}) =>
    type === 'primary'
      ? theme.COLORS.PRIMARY_900
      : theme.COLORS.PRIMARY_RED_900};
`;

export const Title = styled.Text`
  font-size: 14px;
  ${({theme}) => css`
    color: ${theme.COLORS.TITLE_WHITE};
    font-family: ${theme.FONTS.TITLE_BOLD};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({theme}) => ({
  color: theme.COLORS.TITLE,
}))``;

export const ContainerViewIcon = styled.Image.attrs(({theme}) => ({
  margin: 10,
}))``;
