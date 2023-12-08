import * as Yup from 'yup';
import { validateNationalRegistry } from '../../../utils/ValidateCPF-CNPJ';
import { InputProps } from './props';


export const INPUTS = () =>
  [
    {
      id: 1,
      title: 'Cpf',
      name: 'cpf',
      autoCapitalize: 'words',
      type: 'cpf',
      autoCorrect: false,
      keyboardType: 'default',
      typePassword: false,
      returnKeyType: 'next',
      placeholder: 'Cpf do paciente',
      onChangeText: (value: string) => value,
    },
    {
      id: 2,
      title: 'Nome Completo',
      name: 'fullName',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCapitalize: 'words',
      autoCorrect: false,
      typePassword: false,
      keyboardType: 'default',
      returnKeyType: 'next',
      placeholder: 'Nome completo do paciente',
      onChangeText: (value: string) => value,
    },
    {
      id: 3,
      title: 'Idade',
      name: 'age',
      type: 'custom',
      options: {
        mask: '999',
      },
      autoCapitalize: 'none',
      autoCorrect: false,
      typePassword: false,
      returnKeyType: 'done',
      keyboardType: 'number-pad',
      placeholder: 'Idade do paciente',
      onChangeText: (value: string) => value,
    }
  ] as InputProps[];
 
 
 export const textInputShapeYup = () =>
 Yup.object().shape({
  fullName: Yup.string().required('digite seu sobrenome').trim(),
  cpf: Yup.string()
    .required('digite seu CPF')
    .trim()
    .test(
      'cpf',
      'cpf Invalido',
      value => !!value && validateNationalRegistry(value),
    ),
  age: Yup.string()
    .required('digite seu email')
    .trim(),
  })
