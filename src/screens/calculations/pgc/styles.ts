import { Platform, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import { BackgroundComponent } from "../../../components/Background"

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
`

export const BackgroundContent = styled(BackgroundComponent)``

export const Content = styled.ScrollView`
  align-self: center;
  padding: 0 ${RFValue(16)}px;
  margin-bottom: ${() => (Platform.OS === "android" ? "20px" : "30px")};
  margin-top: ${RFValue(15)}px;
`
export const ContainerPatient = styled.View`
  align-items: flex-start;
  flex-direction: row;
`;
export const PatientTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.title_dark};
`

export const PatientName = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.success};
`;

export const Containergenre = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${RFValue(30)}px;
  margin-bottom: ${RFValue(30)}px;
`

export const ContainerAge = styled(View)`
  align-self: center;
  width: 100%;
  margin-bottom: ${RFValue(15)}px;
`
export const ContainerSkinFolds = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${RFValue(15)}px;
`

export const ContainerCalculaters = styled.View`
`

export const ContainerInputsdoubles = styled.View`
  width: 47%;
`

export const ButtonContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const ButtonContainerSave = styled.View`
  margin-top: ${RFValue(10)}px;
`

