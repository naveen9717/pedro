import styled, {css} from 'styled-components/native';
import {Title, Paragraph} from 'react-native-paper';

import {handlePixels} from './functions/utils';

const StyledContainer = styled.View`
  flex: ${({flex}) => flex || 1};
  width: ${({width}) => handlePixels(width) || 'auto'};
  ${({paddingTop, paddingRight, paddingLeft, marginLeft, marginRight}) => css`
    padding-top: ${handlePixels(paddingTop || 0)};
    padding-right: ${handlePixels(paddingRight || 30)};
    padding-left: ${handlePixels(paddingLeft || 30)};
    margin-right: ${handlePixels(marginRight || 0)};
    margin-left: ${handlePixels(marginLeft || 0)};
    background-color: ${({theme}) => theme.COLORS.BACKGROUND};
  `}
`;

const Label = styled(Title)`
  color: ${({theme}) => theme.COLORS.SHAPE};
  font-family: ${({theme}) => theme.FONTS.TITLE};
  text-align: left;
`;

const LabelBold = styled(Title)`
  color: ${({theme}) => theme.COLORS.TITLE};
  font-family: ${({theme}) => theme.FONTS.TITLE_BOLD};
  text-align: center;
`;

export {StyledContainer, Label, LabelBold};
