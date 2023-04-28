import {Dimensions, Platform} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const ContainerView = styled.View`
  margin: 30px;
  margin-top: 20px;
`;

export const ContainerViewLabel = styled.View``;

export const ContainerViewLogo = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const ContainerViewButton = styled.View``;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
  ${({theme}) => css`
    color: ${theme.COLORS.SHAPE};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  ${({theme}) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TITLE_BOLD};
  `};
`;

export const ResetText = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
  ${({theme}) => css`
    color: ${theme.COLORS.PRIMARY_100};
    font-family: ${theme.FONTS.TITLE_BOLD};
  `};
`;

export const Strong = styled.Text`
  font-size: 14px;
  margin-top: 15px;
  height: 29px;
  text-align: center;
  ${({theme}) => css`
    color: ${theme.COLORS.SHAPE};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const ContainerLoading = styled.KeyboardAvoidingView`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: 'rgba(0,0,0,0.5)';
`;
