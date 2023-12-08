import styled from "styled-components/native"
import { BackgroundComponent } from "../../../components/Background"
import { RFValue } from "react-native-responsive-fontsize"
import { Platform, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
`

export const BackgroundContent = styled(BackgroundComponent)``

export const Content = styled.ScrollView`
  margin: 0 ${RFValue(20)}px;
`

export const ContainerLogo = styled.View`
  align-self: center;
`

export const ContentRegister = styled.View`
  width: 100%;
`

export const ContainerForm = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(16)}px;
`

export const ButtonContainer = styled.View`
  margin-top: ${RFValue(90)}px;
  width: 100%;
  margin-bottom: ${() => (Platform.OS === "android" ? "16px" : "0px")};
`
