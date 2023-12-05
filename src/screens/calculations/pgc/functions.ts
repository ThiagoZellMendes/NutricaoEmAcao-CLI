import { DobraCutanea, ResultadoGordura, Sexo } from "./props"

export function calcularGorduraCorporal(
  genre: Sexo,
  idade: number,
  dobras: DobraCutanea
): ResultadoGordura {
  const densidadeCorporal = calcularDensidadeCorporal(genre, dobras, idade)
  const percentualGordura = calcularPercentualGordura(densidadeCorporal)
  const categoria = classificarPercentualGordura(
    genre,
    idade,
    percentualGordura
  )

  return {
    percentual: percentualGordura,
    categoria: categoria,
  }
}

function classificarPercentualGordura(
  genre: Sexo,
  idade: number,
  percentualGordura: number
): string {
  const tabelaClassificacao = obterTabelaClassificacao(genre, idade)

  for (const faixaEtaria of Object.keys(tabelaClassificacao)) {
    const [min, max] = faixaEtaria.split(" a ").map(Number)

    if (idade >= min && idade <= max) {
      const classificacoes = tabelaClassificacao[faixaEtaria]
      for (const [categoria, [minPercentual, maxPercentual]] of Object.entries(
        classificacoes
      )) {
        if (
          percentualGordura >= minPercentual &&
          percentualGordura <= maxPercentual
        ) {
          return categoria
        }
        // Adicionando uma margem de 1% para considerar uma faixa próxima
        if (
          percentualGordura > minPercentual - 1 &&
          percentualGordura < maxPercentual + 1
        ) {
          return categoria
        }
      }
    }
  }

  return "Categoria não encontrada"
}
function obterTabelaClassificacao(
  genre: Sexo,
  idade: number
): Record<string, Record<string, [number, number]>> {
  const tabelaClassificacaoMasculino: Record<
    string,
    Record<string, [number, number]>
  > = {
    "16 a 25": {
      "Muito Baixo": [0, 4],
      Excelente: [4, 6],
      "Muito Bom": [7, 10],
      Bom: [11, 13],
      Adequado: [14, 16],
      "Moderadamente Alto": [17, 20],
      Alto: [21, 24],
      "Muito Alto": [25, Infinity],
    },
    "26 a 35": {
      "Muito Baixo": [0, 8],
      Excelente: [8, 11],
      "Muito Bom": [12, 15],
      Bom: [16, 18],
      Adequado: [19, 20],
      "Moderadamente Alto": [21, 24],
      Alto: [25, 27],
      "Muito Alto": [28, Infinity],
    },
    "36 a 45": {
      "Muito Baixo": [0, 10],
      Excelente: [10, 14],
      "Muito Bom": [15, 18],
      Bom: [19, 21],
      Adequado: [22, 23],
      "Moderadamente Alto": [24, 25],
      Alto: [26, 29],
      "Muito Alto": [30, Infinity],
    },
    "46 a 55": {
      "Muito Baixo": [0, 12],
      Excelente: [12, 16],
      "Muito Bom": [17, 20],
      Bom: [21, 23],
      Adequado: [24, 25],
      "Moderadamente Alto": [26, 27],
      Alto: [28, 30],
      "Muito Alto": [31, Infinity],
    },
    "56 a Infinity": {
      "Muito Baixo": [0, 13],
      Excelente: [13, 18],
      "Muito Bom": [19, 21],
      Bom: [22, 23],
      Adequado: [24, 25],
      "Moderadamente Alto": [26, 27],
      Alto: [28, 30],
      "Muito Alto": [31, Infinity],
    },
  }

  const tabelaClassificacaoFeminino: Record<
    string,
    Record<string, [number, number]>
  > = {
    "16 a 25": {
      "Muito Baixo": [0, 13],
      Excelente: [13, 17],
      "Muito Bom": [17, 19],
      Bom: [20, 22],
      Adequado: [23, 25],
      "Moderadamente Alto": [26, 28],
      Alto: [29, 31],
      "Muito Alto": [32, Infinity],
    },
    "26 a 35": {
      "Muito Baixo": [0, 14],
      Excelente: [14, 16],
      "Muito Bom": [17, 20],
      Bom: [21, 23],
      Adequado: [24, 25],
      "Moderadamente Alto": [26, 29],
      Alto: [30, 33],
      "Muito Alto": [34, Infinity],
    },
    "36 a 45": {
      "Muito Baixo": [0, 16],
      Excelente: [16, 19],
      "Muito Bom": [20, 23],
      Bom: [24, 26],
      Adequado: [27, 29],
      "Moderadamente Alto": [30, 32],
      Alto: [33, 36],
      "Muito Alto": [37, Infinity],
    },
    "46 a 55": {
      "Muito Baixo": [0, 17],
      Excelente: [17, 21],
      "Muito Bom": [22, 25],
      Bom: [26, 28],
      Adequado: [29, 31],
      "Moderadamente Alto": [32, 34],
      Alto: [35, 38],
      "Muito Alto": [39, Infinity],
    },
    "56 a Infinity": {
      "Muito Baixo": [0, 18],
      Excelente: [18, 22],
      "Muito Bom": [23, 26],
      Bom: [27, 29],
      Adequado: [30, 32],
      "Moderadamente Alto": [33, 35],
      Alto: [36, 38],
      "Muito Alto": [39, Infinity],
    },
  }

  return genre === Sexo.masculino
    ? tabelaClassificacaoMasculino
    : tabelaClassificacaoFeminino
}

function calcularDensidadeCorporal(
  genre: Sexo,
  dobras: DobraCutanea,
  idade: number
): number {
  const somaDobras =
    dobras.triceps + dobras.subescapular + dobras.triceps + dobras.supraIliaca

  if (genre === Sexo.masculino) {
    if (idade >= 0 && idade <= 19) {
      return 1.162 - 0.063 * Math.log10(somaDobras)
    } else if (idade >= 20 && idade <= 29) {
      return 1.1631 - 0.0632 * Math.log10(somaDobras)
    } else if (idade >= 30 && idade <= 39) {
      return 1.1422 - 0.0544 * Math.log10(somaDobras)
    } else if (idade >= 40 && idade <= 49) {
      return 1.162 - 0.07 * Math.log10(somaDobras)
    } else {
      return 1.1715 - 0.0779 * Math.log10(somaDobras)
    }
  } else {
    if (idade >= 0 && idade <= 19) {
      return 1.1549 - 0.0678 * Math.log10(somaDobras)
    } else if (idade >= 20 && idade <= 29) {
      return 1.1599 - 0.0717 * Math.log10(somaDobras)
    } else if (idade >= 30 && idade <= 39) {
      return 1.1423 - 0.0632 * Math.log10(somaDobras)
    } else if (idade >= 40 && idade <= 49) {
      return 1.1333 - 0.0612 * Math.log10(somaDobras)
    } else {
      return 1.1339 - 0.0645 * Math.log10(somaDobras)
    }
  }
}

function calcularPercentualGordura(densidadeCorporal: number): number {
  const percentualGordura = (4.95 / densidadeCorporal - 4.5) * 100
  return percentualGordura
}
