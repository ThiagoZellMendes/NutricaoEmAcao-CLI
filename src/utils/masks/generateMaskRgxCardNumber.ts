import { IMaskTypeReturn } from './IMaskTypeProps';

export function generateMaskRgxCardNumber(value: string): IMaskTypeReturn {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 ')
    .replace(/(\d{4})(\d)/, '');

  return {
    value,
    maxLength: 5,
  };
}
