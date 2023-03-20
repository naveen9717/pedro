import {View} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  max-width: 380px;
  flex: 1;
  background-color: #f0f0f0;
`;

export const ContainerBottom = styled.TouchableOpacity`
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 30px;
  margin-right: 20px;
`;

export const ContainerMenuForm = styled.View`
  width: 100%;
`;

export const ContainerMenu = styled.View`
  background-color: #00ade1;
  height: 167px;
  margin-bottom: 60px;
`;

export const ContainerMenuTitle = styled.Text`
  font-size: 20px;
  ${({theme}) => css`
    font-family: ${theme.FONTS.TITLE_BOLD};
    color: ${theme.COLORS.TITLE_WHITE};
  `};
`;

export const ContainerMenuFormLabel = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
  height: 48px;
`;

export const ContainerMenuLabel = styled.Text`
  font-size: 14px;
  ${({theme}) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE_WHITE};
  `};
`;

export const ContainerMenuText = styled.Text`
  font-size: 14px;
  ${({theme}) => css`
    font-family: ${theme.FONTS.TEXT_BACK};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const Footer = styled.View`
  background-color: #f0f0f0;
`;

export const IconMenu = styled.Image`
  width: 24px;
  height: 24px;
`;

export const FooterIcon = styled.View``;

export const ContainerMenuBottom = styled(View).attrs({})`
  align-items: flex-start;
  justify-content: flex-start;
  margin: 30px;
`;
