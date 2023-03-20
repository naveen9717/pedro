import React from 'react';
import {TextInputProps} from 'react-native';

import {Container, TypeProps} from './styles';
// import { Input } from 'native-base'
import {Masks, useMaskedInputProps} from 'react-native-mask-input';
import {DataInputType} from '../../models/components/input/inputData';

type Props = TextInputProps & {
  type?: TypeProps;
  name?: string;
  placeholder?: string;
  dataType?: DataInputType;
  editable?: boolean;
  marginBottom?: string;
};

export function Input({
  type = 'primary',
  name,
  placeholder,
  dataType,
  editable = true,
  marginBottom,
  ...rest
}: Props) {
  let mask;
  switch (dataType) {
    case 'cpf':
      mask = Masks.BRL_CPF;
      break;
    case 'cnpj':
      mask = Masks.BRL_CNPJ;
      break;
    case 'cpf-cnpj':
      mask = Masks.BRL_CPF_CNPJ;
      break;
    case 'phone':
      mask = Masks.BRL_PHONE;
      break;
    case 'zipCode':
      mask = Masks.ZIP_CODE;
      break;
    case 'date':
      mask = Masks.DATE_DDMMYYYY;
      break;
    default:
      break;
  }

  const maskedInputProps = useMaskedInputProps({
    // value: phone,
    // onChangeText: setPhone,
    mask: mask,
    ...rest,

    // showObfuscatedValue: true
  });

  return (
    <Container
      {...maskedInputProps}
      // editable={false}
      marginBottom={marginBottom}
      name={name}
      type={type}
      placeholder={placeholder || maskedInputProps.placeholder}
      editable={editable}
    />
  );
}
