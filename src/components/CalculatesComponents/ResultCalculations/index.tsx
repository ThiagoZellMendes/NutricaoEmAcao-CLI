import React from "react"

import {
  Container,
  ContainerResult,
  TextResultPercentage,
  TextResultTable,
} from "./styles"
import { PropsResultComponent } from "./props"

export function ResultCalculationsComponent({
  colorResult,
  percentageResult,
  tableResult
}: PropsResultComponent) {
  return (
    <Container>
      <TextResultPercentage>{percentageResult}</TextResultPercentage>
      <ContainerResult colorResult={colorResult}>
        <TextResultTable>{tableResult}</TextResultTable>
      </ContainerResult>
    </Container>
  )
}