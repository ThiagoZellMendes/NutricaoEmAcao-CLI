export enum Sexo {
  "masculino" = "M",
  "feminino" = "F",
}

export interface ResultadoIMC {
  imc: number
  diagnostico: string
}

export interface FormDataCalc {
  sexo: Sexo
  idade?: string
  peso: string
  altura: string
}
