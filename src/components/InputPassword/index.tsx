import React, {useState} from 'react';
import {useTheme} from 'styled-components/native';
// import Icon from '@expo/vector-icons/Ionicons';
import {StyledInputArea, StyledInput, StyledTouchableImage} from './styles';
import {TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = TextInputProps & {
  placeholder: string;
  valid: boolean;
  type: string;
};

export default function InputPassword({
  placeholder = '',
  valid = false,
  ...rest
}: Props) {
  const [hidePassword, setHidePassword] = useState(true);
  const {COLORS} = useTheme();

  function onHandlePassword() {
    setHidePassword(!hidePassword);
  }

  return (
    <StyledInputArea valid={valid}>
      <StyledInput
        secureTextEntry={hidePassword}
        placeholder={placeholder}
        {...rest}
      />
      <StyledTouchableImage onPress={onHandlePassword}>
        <Icon
          name={hidePassword ? 'eye' : 'eye-slash'}
          size={20}
          color={COLORS.TEXT_PLACE_HOLDER}
        />
      </StyledTouchableImage>
    </StyledInputArea>
  );
}
