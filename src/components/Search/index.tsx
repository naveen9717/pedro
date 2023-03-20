import React from 'react';
import {TextInputProps} from 'react-native';
// import {Feather} from '@expo/vector-icons';

import {Container, Input, Button, InputArea, IconView} from './styles';
import theme from '../../theme';

type Props = TextInputProps & {
  onSearch?: () => void;
  setText: (v: string) => void;
  text?: string;
  width?: any;
  height?: number;
  searchButtonActive?: boolean;
};

export function Search({
  onSearch,
  setText,
  text,
  width,
  height,
  searchButtonActive,
  ...rest
}: Props) {
  const handleChange = (v: string) => {
    setText ? setText(v) : null;
  };
  // const Icon = (
  //   <Feather name="search" size={23} color={theme.COLORS.PRIMARY_800} />
  // );

  return (
    <Container style={{width: width && width, zIndex: 1}}>
      <InputArea>
        <Input
          value={text}
          onChangeText={e => handleChange(e)}
          height={height}
          placeholder={text}
          placeholderTextColor={theme.COLORS.TEXT_PLACE_HOLDER}
          style={{
            fontSize: 16,
            fontFamily: theme.FONTS.TEXT,
          }}
          {...rest}
        />
        {/* {searchButtonActive ? (
          <Button onPress={onSearch ? onSearch : () => {}}>{Icon}</Button>
        ) : (
          <IconView>{Icon}</IconView>
        )} */}
      </InputArea>
    </Container>
  );
}
