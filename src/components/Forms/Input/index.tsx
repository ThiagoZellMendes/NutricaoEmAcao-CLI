import React from "react"
import { TextInputProps } from "react-native"

import { Container } from "./styles"
import { TextInputMaskProps } from "react-native-masked-text"

type Props = TextInputMaskProps

export function Input({ ...rest }: Props) {
  return <Container  {...rest} />
}
