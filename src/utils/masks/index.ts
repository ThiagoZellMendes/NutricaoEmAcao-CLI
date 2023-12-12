import { IMaskTypeProps } from './IMaskTypeProps';
import { generateMaskRgxCep } from './generateMaskRgxCep';
import { generateMaskRgxCpf } from './generateMaskRgxCpf';
import { generateMaskRgxCnpj } from './generateMaskRgxCnpj';
import { generateMaskRgxPhone } from './generateMaskRgxPhone';
import { generateMaskMoneyReal } from './generateMaskMoneyReal';
import { generateMaskRgxDate } from './generateMaskRgxDate';
import { generateMaskRgxDateWithTwoNumbers } from './generateMaskRgxDateWithTwoNumbers';
import { generateMaskRgxCardNumber } from './generateMaskRgxCardNumber';

export const masks: IMaskTypeProps = {
  cpf: generateMaskRgxCpf,
  cnpj: generateMaskRgxCnpj,
  cep: generateMaskRgxCep,
  phone: generateMaskRgxPhone,
  money: generateMaskMoneyReal,
  date: generateMaskRgxDate,
  dateTwoNumbers: generateMaskRgxDateWithTwoNumbers,
  cardNumber: generateMaskRgxCardNumber,
};
