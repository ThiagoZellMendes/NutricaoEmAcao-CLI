import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import { BackgroundComponent } from "../../components/Background"

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.shape};
`

export const BackgroundContent = styled(BackgroundComponent)`

`

export const Content = styled.ScrollView`
  margin: 0 ${RFValue(20)}px ;
`

export const ButtonContainer = styled.View`
  width: 100%;
`

export const ContainerLogo = styled.View`
  margin: ${RFValue(33)}px 0;
  align-items: center;
`

export const ContainerForm = styled(View)`
  margin:  16px 0;
`

export const ContainerLink = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})``

export const TextLink = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.Adequado};
  margin-top: ${RFValue(10)}px;
  align-self: center;
`
