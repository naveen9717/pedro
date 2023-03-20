import styled from 'styled-components/native';
import {Card, Paragraph, Title} from 'react-native-paper';
import theme from '../../theme';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const StyledCardBoxShadow = styled(Card)`
  /* flex: 1; */
  border-radius: 10px;
  /* margin-bottom: 20px; */
  /* margin-right: 6px; */
  /* margin-top: 6px; */
`;
interface StyledCardContentProp {
  status?: string;
}
const StyledCardContent = styled.View<StyledCardContentProp>`
  width: 100%;
  padding: ${height * 0.01949}px ${width * 0.0467}px ${height * 0.01731}px
    ${width * 0.0257}px;
  border-radius: 10px;
  justify-content: center;
  border-left-width: ${width * 0.0257}px;
  border-left-color: ${({status}) =>
    status && status === 'ATIVA'
      ? theme.COLORS.SUCCESS_900
      : theme.COLORS.PRIMARY_RED_900};
`;

const StyledViewStatus = styled.View`
  width: 71px;
  height: 20px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({status}) =>
    status === 'ATIVA'
      ? theme.COLORS.SUCCESS_900
      : theme.COLORS.PRIMARY_RED_900};
`;

const StyledContentStatus = styled.View`
  width: 100%;
  margin-bottom: 8px;
  justify-content: flex-end;
  flex-direction: row;
`;

const StyledTextStatus = styled(Paragraph)`
  font-size: 12px;
  text-align: left;
  color: ${({theme}) => theme.COLORS.BACKGROUND};
  font-family: ${({theme}) => theme.FONTS.TITLE_BOLD};
  line-height: 12px;
  min-height: 12px;
`;

const StyledTitle = styled(Title)`
  font-size: 14px;
  text-align: left;
  color: ${({theme}) => theme.COLORS.TITLE};
  font-family: ${({theme}) => theme.FONTS.TITLE_BOLD};
  line-height: 18px;
  min-height: 18px;
`;

const StyledText = styled(Title)`
  font-size: 14px;
  text-align: left;
  margin-bottom: 8px;
  color: ${({theme}) => theme.COLORS.TITLE};
  font-family: ${({theme}) => theme.FONTS.TEXT};
  line-height: 18px;
  min-height: 18px;
`;

const StyledAddress = styled(Paragraph)`
  font-size: 14px;
  text-align: left;
  color: ${({theme}) => theme.COLORS.TITLE};
  font-family: ${({theme}) => theme.FONTS.TEXT};
  line-height: 18px;
  min-height: 18px;
`;

const StyledInstallCode = styled(Paragraph)`
  font-size: 14px;
  text-align: left;
  color: ${({theme}) => theme.COLORS.PRIMARY_800};
  font-family: ${({theme}) => theme.FONTS.TEXT};
  line-height: 18px;
  min-height: 18px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity``;

export {
  StyledCardContent,
  StyledViewStatus,
  StyledContentStatus,
  StyledCardBoxShadow,
  StyledTextStatus,
  StyledTitle,
  StyledInstallCode,
  StyledAddress,
  StyledText,
  StyledTouchableOpacity,
};
