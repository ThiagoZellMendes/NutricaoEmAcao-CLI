export enum Sexo {
  'Masculino' = 'Masculino',
  'Feminino' = 'Feminino'
}

export interface ResultadoIMC {
  imc: number;
  diagnostico: string;
}

export interface FormDataCalc {
  sexo: Sexo;
  idade?: string;
  peso: string;
  altura: string;
}
