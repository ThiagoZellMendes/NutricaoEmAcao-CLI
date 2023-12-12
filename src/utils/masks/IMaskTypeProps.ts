export type IMaskTypeProps = {
  cpf(value: string): IMaskTypeReturn;
  cnpj(value: string): IMaskTypeReturn;
  phone(value: string): IMaskTypeReturn;
  cep(value: string): IMaskTypeReturn;
  money(value: string): IMaskTypeReturn;
  date(value: string): IMaskTypeReturn;
  dateTwoNumbers(value: string): IMaskTypeReturn;
  cardNumber(value: string): IMaskTypeReturn;
};

export type IMaskTypeReturn = { value: string; maxLength: number };
