import React from "react"
import { RectButtonProps } from "react-native-gesture-handler"
import { ButtonComponent, Container, Icon, Title } from "./styles"

const icons = {
  M: "man",
  F: "woman",
}

interface Props extends RectButtonProps {
  type: "M" | "F"
  isActive: boolean
}
export function GenreButton({ type, isActive, ...rest }: Props) {
  return (
    <Container isActive={isActive} type={type}>
      <ButtonComponent {...rest}>
        <Icon name={icons[type]} type={type} />
      </ButtonComponent>
    </Container>
  )
}
