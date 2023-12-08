import { validateNationalRegistry } from '../../../utils/ValidateCPF-CNPJ';
import * as Yup from 'yup';
import { InputProps } from './props';
import { useRef } from 'react';


export const INPUTS = () =>
  [
    {
      id: 1,
      title: 'Nome',
      name: 'firstName',
      autoCapitalize: 'words',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCorrect: false,
      keyboardType: 'default',
      typePassword: false,
      returnKeyType: 'next',
      placeholder: 'Digite seu nome',
      onChangeText: (value: string) => value,
    },
    {
      id: 2,
      title: 'Sobrenome',
      name: 'lastName',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCapitalize: 'words',
      autoCorrect: false,
      typePassword: false,
      keyboardType: 'default',
      returnKeyType: 'next',
      placeholder: 'Digite seu sobrenome',
      onChangeText: (value: string) => value,
    },
    {
      id: 3,
      title: 'Cpf',
      name: 'cpf',
      type: 'cpf',
      autoCapitalize: 'none',
      autoCorrect: false,
      typePassword: false,
      returnKeyType: 'next',
      keyboardType: 'number-pad',
      placeholder: 'Digite seu cpf',
      onChangeText: (value: string) => value,
    },
    {
      id: 4,
      title: 'Email',
      name: 'email',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCapitalize: 'none',
      autoCorrect: false,
      typePassword: false,
      returnKeyType: 'next',
      keyboardType: 'default',
      placeholder: 'Digite seu email',
      onChangeText: (value: string) => value,
    },
    {
      id: 5,
      title: 'Senha',
      name: 'password',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCapitalize: 'none',
      autoCorrect: false,
      typePassword: true,
      keyboardType: 'default',
      returnKeyType: 'next',
      placeholder: 'Digite sua senha',
      onChangeText: (value: string) => value,
    },
    {
      id: 6,
      title: 'Confirmação de senha',
      name: 'passwordConfirmation',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCapitalize: 'none',
      autoCorrect: false,
      typePassword: true,
      keyboardType: 'default',
      returnKeyType: 'done',
      placeholder: 'Confirme sua senha',
      onChangeText: (value: string) => value,
    },
  ] as InputProps[];
 
 
 export const textInputShapeYup = () =>
 Yup.object().shape({
  firstName: Yup.string().required('digite seu nome').trim(),
  lastName: Yup.string().required('digite seu sobrenome').trim(),
  cpf: Yup.string()
    .required('digite seu CPF')
    .trim()
    .test(
      'cpf',
      'cpf Invalido',
      value => !!value && validateNationalRegistry(value),
    ),
  email: Yup.string()
    .email('email obrigatário')
    .required('digite seu email')
    .trim(),
  password: Yup.string()
    .required('digite sua senha')
    .trim()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  passwordConfirmation: Yup.string()
    .required('confirme sua senha')
    .oneOf([Yup.ref('password')], 'As senhas não coincidem ')
    .trim()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
  })
