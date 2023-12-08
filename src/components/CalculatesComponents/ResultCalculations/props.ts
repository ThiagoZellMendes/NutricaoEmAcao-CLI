import { ReactElement } from "react";


export interface PropsResultComponent {
  percentageResult: string | ReactElement | number; 
  tableResult: string
  colorResult:
    | "Muito Baixo"
    | "Excelente"
    | "Muito Bom"
    | "Bom"
    | "Adequado"
    | "Moderadamente Alto"
    | "Alto"
    | "Muito Alto"
    | "Muito abaixo do peso"
    | "Abaixo do peso"
    | "Magreza moderada"
    | "Peso normal"
    | "Acima do peso"
    | "Obesidade Grau I"
    | "Obesidade Grau II"
    | "Obesidade Grau III"
}

export interface PropsResultComponentStyle {
  colorResult:
    | "Muito Baixo"
    | "Excelente"
    | "Muito Bom"
    | "Bom"
    | "Adequado"
    | "Moderadamente Alto"
    | "Alto"
    | "Muito Alto"
    | "Muito abaixo do peso"
    | "Abaixo do peso"
    | "Magreza moderada"
    | "Peso normal"
    | "Acima do peso"
    | "Obesidade Grau I"
    | "Obesidade Grau II"
    | "Obesidade Grau III"
}
