import { IMaskTypeReturn } from './IMaskTypeProps';

/* eslint-disable @typescript-eslint/ban-ts-comment */
export function generateMaskMoneyReal(value: string): IMaskTypeReturn {
  value = value.replace(/\D/g, '');
  value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    // @ts-ignore: Object is possibly 'null'.
  }).format(value / 100);

  return {
    value,
    maxLength: 9999999,
  };
}
