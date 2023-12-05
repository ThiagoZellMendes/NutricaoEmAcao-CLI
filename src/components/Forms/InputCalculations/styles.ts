import { TextInput } from "react-native"
import { TextInputMask } from "react-native-masked-text"
import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"

interface ContainerProps {
  isActive: boolean
}

export const Container = styled.View<ContainerProps>`
  height: 70px;
  border-radius: 2px;
  border: 3px;
  border-color: ${({theme}) => theme.colors.success_light};
`

export const Content = styled.View`
  height: 100%;
  justify-content: space-between;
  flex-direction: row;
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
`

export const Input = styled(TextInputMask)`
  width: 100%;
  height: 100%;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding-right: 10px;
  color: ${({theme}) => theme.colors.title_dark};

`
export const TextCalculater = styled.Text`
  position: absolute;
  margin: 5px;
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.title_dark};
`

export const ErrorInput = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.attention};
  margin: ${RFValue(1)}px 0;
`
