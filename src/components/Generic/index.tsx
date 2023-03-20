import styled, {css} from 'styled-components/native';
interface GenericProps {
  paddingTop?: number;
  paddingBottom?: number;
}

export const Strong = styled.Text<GenericProps>`
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

export const CustomView = styled.Text<GenericProps>`
  /* font-size: 14px; */
  padding-top: ${({paddingTop}) => (paddingTop ? paddingTop : 15)}px;
  padding-bottom: ${({paddingBottom}) =>
    paddingBottom ? paddingBottom : 15}px;
  /* height: 29px; */
  /* text-align: center;
  ${({theme}) => css`
    color: ${theme.COLORS.SHAPE};
    font-family: ${theme.FONTS.TEXT};
  `}; */
`;
