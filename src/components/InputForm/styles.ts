import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  /* padding: 0 45px; */
`;

export const Content = styled.View`
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors};
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.text};
  flex-direction: row;
`;

export const ErrorInput = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.attention};
  /* margin: 2px 0; */
`;
