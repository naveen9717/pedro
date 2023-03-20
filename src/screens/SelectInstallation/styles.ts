import styled, {css} from 'styled-components/native';

const StyledContainer = styled.View`
  /* flex: 1; */
  /* padding: 20px; */
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

const StyledContainerView = styled.View`
  /* height: 200px; */
`;
const StyledContainerViewList = styled.View`
  /* flex: 1; */
`;

const StyledInstallationView = styled.View``;

const StyledLabel = styled.Text`
  font-size: 14px;
  /* margin-top: 40px; */
  /* margin-bottom: 7px; */
  ${({theme}) => css`
    color: ${theme.COLORS.SHAPE};
    font-family: ${theme.FONTS.TEXT};
  `};
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  /* margin-bottom: 30px; */
  ${({theme}) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TITLE_BOLD};
  `};
`;

const StyledFlatList = styled.FlatList.attrs({
  // paddingVertical: 10,
  showsVerticalScrollIndicator: false,
})``;

const StyledEmptyList = styled.View`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
`;

const StyledEmptyText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.COLORS.SHAPE};
  font-family: ${({theme}) => theme.FONTS.TITLE_BOLD};
`;

export {
  StyledContainer,
  StyledContainerView,
  StyledLabel,
  StyledTitle,
  StyledInstallationView,
  StyledContainerViewList,
  StyledFlatList,
  StyledEmptyList,
  StyledEmptyText,
};
