import styled, {css} from 'styled-components/native';

interface ContainerProps {
  height?: number;
  paddingBottom?: number;
  paddingTop?: number;
  marginTop?: number;
}

export const Container = styled.View<ContainerProps>`
  /* flex: 1; */
  display: flex;
  height: ${({height}) => height && height}px;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;


export const ContainerView = styled.View`
  margin: 30px;
  margin-top: 40px;
`;

export const ContainerViewLogo = styled.View<ContainerProps>`
  align-items: center;
  justify-content: center;
  padding-bottom: ${({paddingBottom}) => (paddingBottom ? paddingBottom : 0)}px;
  padding-top: ${({paddingTop}) => (paddingTop ? paddingTop : 0)}px;
`;

export const ContainerViewLabel = styled.View<ContainerProps>`
  height: ${({height}) => (height ? height : 0)}px;
  /* height: 70px; */
`;

export const ContainerViewButton = styled.View<ContainerProps>`
  margin-top: ${({marginTop}) => (marginTop ? marginTop : 0)}px;
  /* padding-top: 0px; */
`;

export const Label = styled.Text<ContainerProps>`
  font-size: 16px;
  text-align: left;
  padding-top:15px;
  padding-bottom: ${({paddingBottom}) => (paddingBottom ? paddingBottom : 0)}px;
  /* margin-bottom: 10px; */
  ${({theme}) => css`
    color: ${theme.COLORS.SHAPE};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

export const Title = styled.Text<ContainerProps>`
  font-size: 20px;
  padding-bottom: ${({paddingBottom}) => (paddingBottom ? paddingBottom : 0)}px;
  /* margin-bottom: 10px; */
  ${({theme}) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TITLE_BOLD};
  `};
`;

interface StrongProps {
  paddingTop?: number;
  paddingBottom?: number;
}

export const Strong = styled.Text<StrongProps>`
  font-size: 14px;
  padding-top: ${({paddingTop}) => (paddingTop ? paddingTop : 15)}px;
  padding-bottom: ${({paddingBottom}) =>
    paddingBottom ? paddingBottom : 15}px;
  /* height: 29px; */
  text-align: center;
  ${({theme}) => css`
    color: ${theme.COLORS.SHAPE};
    font-family: ${theme.FONTS.TEXT};
  `};
`;
