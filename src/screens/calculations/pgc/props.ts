export enum Sexo {
  'Masculino' = 'Masculino',
  'Feminino' = 'Feminino'
}

export interface DobraCutanea {
  triceps: number;
  biceps: number;
  subescapular: number;
  supraIliaca: number;
}

export interface CalcProps {
  genre: Sexo;
  idade: number;
  dobras: DobraCutanea;
}

export interface ResultadoGordura {
  percentual: number;
  categoria: string;
}
