import { Cnpj } from './Cnpj';
import { Cpf } from './Cpf';

function cleanNationalRegistry(registry: string) {
  return registry.replace(/\D/g, '');
}

export function validateNationalRegistry(rawRegistry: string) {
  const nationalRegistry = cleanNationalRegistry(rawRegistry);
  if (nationalRegistry.length == 11) {
    const cpf = new Cpf();
    return cpf.validate(nationalRegistry);
  }
  if (nationalRegistry.length == 14) {
    const cnpj = new Cnpj();
    return cnpj.validate(nationalRegistry);
  }
  return false;
}
