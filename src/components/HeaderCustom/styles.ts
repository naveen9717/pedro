import styled, { css } from 'styled-components/native';
import { Badge } from 'react-native-paper';
import { View } from 'react-native';

const Container = styled(View).attrs({
  paddingHorizontal: 16,
})`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 4;
`;

const ContainerBadge = styled(View).attrs({
  paddingHorizontal: 0,
})``;

const ContainerBadgeView = styled(Badge).attrs({})`
  top: 7px;
  left: 3px;
`;

export { Container, ContainerBadge, ContainerBadgeView };
