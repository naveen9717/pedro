import styled from 'styled-components/native';
import theme from '../../theme';

interface StyledInputAreaProps {
  valid: boolean;
}

const StyledInputArea = styled.View<StyledInputAreaProps>`
  width: 100%;
  height: 56px;
  flex-direction: row;
  border-radius: 4px;
  /* margin-bottom: 20px; */
  background-color: ${theme.COLORS.INPUT_BACKGROUND};
  border-width: 1px;
  border-color: ${({valid}) =>
    valid ? theme.COLORS.SUCCESS_900 : 'transparent'};
`;

const StyledInput = styled.TextInput`
  width: 85%;
  font-size: 16px;
  background-color: ${theme.COLORS.INPUT_BACKGROUND};
  color: ${({theme}) => theme.COLORS.TITLE};
  font-family: ${({theme}) => theme.FONTS.TITLE};
  padding: 16px;
`;

const StyledTouchableImage = styled.TouchableOpacity`
  width: 15%;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.INPUT_BACKGROUND};
`;

export {StyledInput, StyledInputArea, StyledTouchableImage};
