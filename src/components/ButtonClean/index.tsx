import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';

import {CleanButtonContainer, ClenButtonTitle} from './styles';

type Props = RectButtonProps & {
  title: string;

  // type?: TypeProps;
  // isLoading?: boolean;
};

export function CleanButton({title, ...rest}: Props) {
  return (
    <CleanButtonContainer {...rest}>
      <ClenButtonTitle>{title}</ClenButtonTitle>
    </CleanButtonContainer>
  );
}
