import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const makeLoginValidation = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  return formOptions;
};
