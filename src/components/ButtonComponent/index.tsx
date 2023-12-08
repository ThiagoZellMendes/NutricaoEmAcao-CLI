import React from "react"

import { ButtonComponentProps } from "./props"
import { Button, Container, Icon, Text } from "./styles"

export function ButtonComponent({
  title,
  nameIcon,
  onPress,
  type,
  ...rest
}: ButtonComponentProps) {
  return (

    <Container  type={type}>
      <Button onPress={onPress} {...rest}>
        <Text>{title}</Text>
        {nameIcon ?  <Icon name={nameIcon} /> : undefined }
      </Button>
    </Container>
  )
}
