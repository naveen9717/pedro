import React from 'react';

import {GestureResponderEvent} from 'react-native';
import CardSearch from '../../components/CardSearch';
import {StyledFlatList, StyledEmptyList, StyledEmptyText} from './styles';

type Props = {
  data: [];
  isLoading: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export default function List({data, isLoading, onPress}: Props) {
  function renderEmptyList() {
    if (isLoading && !data.length) return null;

    return (
      <StyledEmptyList>
        <StyledEmptyText>Não há dados!</StyledEmptyText>
      </StyledEmptyList>
    );
  }

  return (
    <StyledFlatList
      data={data}
      ListEmptyComponent={renderEmptyList}
      renderItem={({item}) => (
        <CardSearch
          key={item?.id}
          status={item?.status}
          title={item?.description}
          code_install={item.code_install}
          address={item?.address}
          onPress={onPress}
        />
      )}
    />
  );
}
