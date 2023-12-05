import { GestureHandlerRootView } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import { BackgroundComponent } from "../../components/Background"
import { Text, View } from "react-native"

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
`

export const BackgroundContent = styled(BackgroundComponent)`
`

export const ContainerTitle = styled(View)`
  width: 100%;
  align-items: flex-start;
  margin: ${RFValue(20)}px;
`

export const Title = styled(Text)`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.title_dark };
`

export const ContainerLogo = styled.View`
  align-self: center;
`

export const ButtonContainer = styled.View`
  width: 100%;
  padding: ${RFValue(10)}px ${RFValue(20)}px ;

`
