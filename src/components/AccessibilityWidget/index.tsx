import React, {useCallback, useState} from 'react';
import {Dimensions, Image, useWindowDimensions} from 'react-native';
import {useAnimationState} from 'moti';
import {
  StyledContainer,
  StyledContainerView,
  StyledImage,
  StyledMotiViewButton,
  StyledTextAccessibility,
  StyledViewImage,
  StyledViewPressable,
} from './styles';

type Props = {
  marginTop?: number;
};

export const AccessibilityWidget: React.FC<Props> = ({marginTop}) => {
  const icAccessibility = require('../../assets/images/icAccessibility.png');
  const icCircle = require('../../assets/images/icCircle.png');
  const icNews = require('../../assets/images/icNews.png');
  const icNewsPlus = require('../../assets/images/icNewsPlus.png');
  const icNewsLess = require('../../assets/images/icNewsLess.png');

  const widthScreen = useWindowDimensions().width;
  const [toggleIsOpen, setToggleIsOpen] = useState(false);

  const animateState = useAnimationState({
    closed: {
      width: 70,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
    },
    opened: {
      width: widthScreen,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  });

  const handleToggle = () => {
    animateState.transitionTo(toggleIsOpen ? 'closed' : 'opened');
    setToggleIsOpen(!toggleIsOpen);
  };
  const {width} = Dimensions.get('window');
  return (
    <StyledContainer>
      <StyledContainerView  onPress={handleToggle}>
        <StyledMotiViewButton
          state={animateState}
          style={{width: width * 0.17289}}>
          <StyledViewPressable>
            <Image source={icAccessibility} />

            <StyledTextAccessibility toggleIsOpen={toggleIsOpen}>
              {toggleIsOpen ? 'Opções de acessbilidade' : ''}
            </StyledTextAccessibility>
          </StyledViewPressable>

          <StyledViewImage toggleIsOpen={toggleIsOpen}>
            <StyledImage source={icCircle} />

            <StyledImage source={icNewsPlus} />
            <StyledImage source={icNews} />

            <StyledImage source={icNewsLess} />
          </StyledViewImage>
        </StyledMotiViewButton>
      </StyledContainerView>
    </StyledContainer>
  );
};
// export default AccessibilityWidget;
