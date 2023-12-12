import { masks } from './index';

describe('Masks functions', () => {
  it('should format money', () => {
    const money = '20000';
    const moneyFormatted = masks.money(money);

    expect(moneyFormatted.value).toContain('200,00');
  });
  it('should format CEP', () => {
    const cep = '13225100';
    const cepFormatted = masks.cep(cep);

    expect(cepFormatted.value).toEqual('13225-100');
  });
  it('should format CNPJ', () => {
    const cnpj = '98905088000195';
    const cnpjFormatted = masks.cnpj(cnpj);

    expect(cnpjFormatted.value).toEqual('98.905.088/0001-95');
  });
  it('should format CPF', () => {
    const cpf = '45645688588';
    const cpfFormatted = masks.cpf(cpf);

    expect(cpfFormatted.value).toEqual('456.456.885-88');
  });
  it('should format Date', () => {
    const date = '01012022';
    const dateFormatted = masks.date(date);

    expect(dateFormatted.value).toEqual('01/01/2022');
  });
  it('should format Phone', () => {
    const phone = '11997992729';
    const phoneFormatted = masks.phone(phone);

    expect(phoneFormatted.value).toEqual('(11) 9 9799-2729');
  });
  it('should format date with two numbers', () => {
    const date = '0122';
    const dateFormatted = masks.dateTwoNumbers(date);

    expect(dateFormatted.value).toEqual('01/22');
  });
  it('should format card number', () => {
    const cardNumber = '5555444433332222';
    const cardNumberFormatted = masks.cardNumber(cardNumber);

    expect(cardNumberFormatted.value).toEqual('5555 4444 3333 2222');
  });
});
