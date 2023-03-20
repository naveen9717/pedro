// export interface GenericButtonProps {
//     onClick?: () => void;
//     children: React.ReactNode;
//     type?: "button" | "submit" | "reset" | undefined;
//     disabled?: boolean;
//   }

//   export const CleanButton = styled.button<GenericButtonProps>`
//     background-color: #fff;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: flex-start;
//     padding: 6px 16px;
//     gap: 10px;
//     background-color: "none";

//     border: 1px solid #e6e6e6;
//     border-radius: 6.72px;

//     font-family: "Poppins";
//     font-style: normal;
//     font-weight: 400;
//     font-size: 13px;
//     line-height: 20px;

//     color: #666666;

//     cursor: pointer;
//   `;

import styled, { css } from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type?: TypeProps;
};

const CleanButtonContainer = styled(TouchableOpacity)<ContainerProps>`
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 6px 16px;
  /* gap: 10px; */
  /* background-color: 'none'; */
  border-width: 1px;
  border-color: #e6e6e6;
  border-radius: 6.72px;
`;

const ClenButtonTitle = styled(Text)<ContainerProps>`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  /* line-height: 20px; */

  color: #666666;
`;

export { CleanButtonContainer, ClenButtonTitle };
