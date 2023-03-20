import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');
interface ContainerProps {
  height?: number;
}

export const MainGenericContainer = styled.View<ContainerProps>`
  z-index: -1;
  padding-left: ${width * 0.0934}px;
  padding-right: ${width * 0.0981}px;
  // background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;
