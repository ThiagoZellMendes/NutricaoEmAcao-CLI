import * as Yup from 'yup';
import { InputProps } from './props';

export const INPUTS = () =>
  [
    {
      id: 1,
      title: 'Email',
      name: 'email',
      autoCapitalize: 'none',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCorrect: false,
      keyboardType: 'default',
      placeholder: ' Digite seu email',
      typePassword: false,
      onChangeText: (value: string) => value,
    },
    {
      id: 2,
      title: 'Senha',
      name: 'password',
      type: 'custom',
      options: {
        mask: '*******************************************************',
      },
      autoCapitalize: 'none',
      autoCorrect: false,
      keyboardType: 'default',
      placeholder: ' Digite sua senha',
      typePassword: true,
      onChangeText: (value: string) => value,
    },
  ] as InputProps[];

export const textInputShapeYup = () =>
  Yup.object().shape({
    email: Yup.string().required('digite seu email').trim(),
    password: Yup.string().required('Campo obrigatório'),
  });
