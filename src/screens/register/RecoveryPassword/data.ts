import * as Yup from 'yup';

export const textInputShapeYup = () =>
  Yup.object().shape({
    email: Yup.string().email('email obrigatário').required('digite seu email').trim()
  });
