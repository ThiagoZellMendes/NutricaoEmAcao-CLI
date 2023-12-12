import { IMaskTypeReturn } from './IMaskTypeProps';

export function generateMaskRgxPhone(value: string): IMaskTypeReturn {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d{0,1})(\d{4})(\d{4})/, '($1) $2 $3-$4');

  return {
    value,
    maxLength: 16,
  };
}
