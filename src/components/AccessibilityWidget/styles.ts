import styled, {css} from 'styled-components/native';
import {Pressable} from 'react-native';
import {MotiView} from 'moti';

const StyledContainer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

interface StyledContainerViewProps {
  marginTop?: any;
}

const StyledContainerView = styled(Pressable)<StyledContainerViewProps>`
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: ${({marginTop}) => (marginTop ? marginTop : 0)}px;
`;

const StyledMotiViewButton = styled(MotiView)`
  /* width: 70px; */
  height: 50px;
  flex-direction: row;
  background-color: ${({theme}) => theme.COLORS.PRIMARY_800};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  margin-left: 20px;
`;
interface StyledTextAccessibilityProps {
  toggleIsOpen: boolean;
}
const StyledTextAccessibility = styled.Text<StyledTextAccessibilityProps>`
  font-size: 13px;
  text-align: left;
  color: ${({theme}) => theme.COLORS.TITLE_WHITE};
  margin-left: ${({toggleIsOpen}) => (toggleIsOpen ? '15px' : 0)};
`;

const StyledViewPressable = styled.View`
  width: 55%;
  height: 50px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
interface StyledViewImageProps {
  toggleIsOpen: boolean;
}

const StyledViewImage = styled.View<StyledViewImageProps>`
  width: ${({toggleIsOpen}) => (toggleIsOpen ? '45%' : 0)};
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export {
  StyledContainer,
  StyledContainerView,
  StyledMotiViewButton,
  StyledTextAccessibility,
  StyledViewImage,
  StyledImage,
  StyledViewPressable,
};
