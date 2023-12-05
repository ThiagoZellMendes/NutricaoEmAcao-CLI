export class Cpf {
  CPF_VALID_LENGTH = 11;
  FACTOR_FIRST_VERIFIER_DIGIT = 10;
  FACTOR_SECOND_VERIFIER_DIGIT = 11;
  NUMBER_TO_DIVIDE_TOTAL = 11;

  validate(cpf: string) {
    if (this.areAllDigitsEqual(cpf)) return false;
    const firstVerifierDigit = this.calculateDigit(
      cpf,
      this.FACTOR_FIRST_VERIFIER_DIGIT,
    );
    const secondVerifierDigit = this.calculateDigit(
      cpf,
      this.FACTOR_SECOND_VERIFIER_DIGIT,
    );
    const verifierDigit = this.extractVerifierDigit(cpf);
    const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`;
    return verifierDigit === calculatedVerifiedDigit;
  }

  areAllDigitsEqual(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every(c => c === firstDigit);
  }

  calculateDigit(cpf: string, factor: number) {
    const cpfAsArray = cpf.split('');
    const result = cpfAsArray.reduce((total, digit) => {
      if (factor <= 1) {
        return total;
      }
      const currentMultiplication = parseInt(digit) * factor--;
      return total + currentMultiplication;
    }, 0);
    const rest = result % this.NUMBER_TO_DIVIDE_TOTAL;
    if (rest < 2) {
      return 0;
    }
    return this.NUMBER_TO_DIVIDE_TOTAL - rest;
  }

  extractVerifierDigit(cpf: string) {
    return cpf.slice(9);
  }
}
