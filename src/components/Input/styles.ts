import styled, {css} from 'styled-components/native';
import {TextInput} from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type Props = {
  type: TypeProps;
  marginBottom?: string;
  editable?: boolean;
};

// export const Container = styled(TextInput).attrs<Props>(({theme, type}) => ({
//   placeholderTextColor:
//     type === 'primary'
//       ? theme.COLORS.TITLE
//       : theme.COLORS.TEXT_COLOR_PLACE_HOLDER,
//   borderTopRightRadius: 4,
//   borderTopLeftRadius: 4,
// }))<Props>`
//   width: 100%;
//   height: 56px;
//   font-size: 14px;
//   padding: 7px 0;
//   padding-left: 20px;
//   /* margin-bottom: 16px; */
//   ${({theme, type}) => css`
//     font-family: ${theme.FONTS.TITLE};
//     background-color: ${theme.COLORS.INPUT_BACKGROUND};
//     color: ${type === 'primary'
//       ? theme.COLORS.SECONDARY_900
//       : theme.COLORS.TITLE};
//   `};
// `;

export const Container = styled(TextInput).attrs<Props>(({theme, type}) => ({
  placeholderTextColor:
    type === 'primary'
      ? theme.COLORS.TITLE
      : theme.COLORS.TEXT_COLOR_PLACE_HOLDER,
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
}))<Props>`
  width: 100%;
  height: 56px;
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;

  /* margin-bottom: 16px; */
  ${({theme, type, marginBottom, editable = true}) => css`
    margin-bottom: ${marginBottom && marginBottom ? marginBottom : 0};
    font-family: ${theme.FONTS.TITLE};
    background-color: ${editable ? theme.COLORS.INPUT_BACKGROUND : '#d9d4d4'};
    color: ${!editable
      ? '#0000004D'
      : type === 'primary'
      ? theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};
  `};
`;
