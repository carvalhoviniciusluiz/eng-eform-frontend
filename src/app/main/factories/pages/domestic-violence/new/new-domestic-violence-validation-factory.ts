import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const makeNewDomesticViolenceValidation = () => {
  const validationSchema = Yup.object().shape({});
  const formOptions = { resolver: yupResolver(validationSchema) };

  return formOptions;
};
