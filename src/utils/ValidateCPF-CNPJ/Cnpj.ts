export class Cnpj {
  FIRST_DIGIT_FACTORS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  SECOND_DIGIT_FACTORS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  LIMIT_ARR_INDEX_FIRST_VERIFIER_DIGIT = 12;
  LIMIT_ARR_INDEX_SECOND_VERIFIER_DIGIT = 13;
  NUMBER_TO_DIVIDE_TOTAL = 11;

  validate(cnpj: string) {
    if (this.areAllDigitsEqual(cnpj)) return false;
    const firstVerifierDigit = this.calculateDigit(
      cnpj,
      this.FIRST_DIGIT_FACTORS,
      this.LIMIT_ARR_INDEX_FIRST_VERIFIER_DIGIT,
    );
    const secondVerifierDigit = this.calculateDigit(
      cnpj,
      this.SECOND_DIGIT_FACTORS,
      this.LIMIT_ARR_INDEX_SECOND_VERIFIER_DIGIT,
    );
    const verifierDigit = this.extractVerifierDigit(cnpj);
    const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`;
    return verifierDigit === calculatedVerifiedDigit;
  }

  areAllDigitsEqual(cnpj: string) {
    const [firstDigit] = cnpj;
    return [...cnpj].every(c => c === firstDigit);
  }

  calculateDigit(cnpj: string, factors: number[], limit: number) {
    const cnpjAsArray = cnpj.split('');
    const result = cnpjAsArray.reduce((total, digit, index) => {
      if (index >= limit) {
        return total;
      }
      const currentMultiplication = parseInt(digit) * factors[index];
      return total + currentMultiplication;
    }, 0);
    const rest = result % this.NUMBER_TO_DIVIDE_TOTAL;
    if (rest < 2) {
      return 0;
    }
    return this.NUMBER_TO_DIVIDE_TOTAL - rest;
  }

  extractVerifierDigit(cnpj: string) {
    return cnpj.slice(12);
  }
}
