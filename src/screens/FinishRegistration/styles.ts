import styled, {css} from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const ContainerView = styled.View`
  margin: 30px;
  margin-top: 30px;
`;

export const ContainerViewLabel = styled.View``;

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
  margin-bottom: ${({marginBottom}) =>
    marginBottom && marginBottom ? marginBottom : 0};
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
