import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { InputFormStyles } from "./props";
import { css } from "styled-components";



export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View<InputFormStyles>`
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 4px;
  border: 1px solid;
  flex-direction: row;
  border: 1.5px solid ${({ error, theme }) =>
    error ? theme.colors.attention : theme.colors.text};
  
`;

export const TitleInput = styled.Text<InputFormStyles>`
  padding-top: ${RFValue(12)}px;
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: ${({ error, theme }) =>
    error ? theme.colors.attention : theme.colors.title};
`;