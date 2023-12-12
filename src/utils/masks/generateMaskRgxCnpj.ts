import { IMaskTypeReturn } from './IMaskTypeProps';

export function generateMaskRgxCnpj(value: string): IMaskTypeReturn {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');
  return {
    value,
    maxLength: 18,
  };
}
