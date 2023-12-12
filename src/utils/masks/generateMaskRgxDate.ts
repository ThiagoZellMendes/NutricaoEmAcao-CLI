import { IMaskTypeReturn } from './IMaskTypeProps';

export function generateMaskRgxDate(value: string): IMaskTypeReturn {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1');

  return {
    value,
    maxLength: 10,
  };
}
