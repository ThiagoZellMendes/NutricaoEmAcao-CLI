import { IMaskTypeReturn } from './IMaskTypeProps';

export function generateMaskRgxCep(value: string): IMaskTypeReturn {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{5})(\d{3})/, '$1-$2');
  return {
    value,
    maxLength: 9,
  };
}
