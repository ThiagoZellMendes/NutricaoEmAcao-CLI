import { TextInputMask } from "react-native-masked-text";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";



export const Container = styled(TextInputMask)`
  width:87%;
  padding: 15px 16px;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.title_dark};
`;