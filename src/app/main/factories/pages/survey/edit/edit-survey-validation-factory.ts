import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const makeEditSurveyValidation = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(191).required('Name is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  return formOptions;
};
