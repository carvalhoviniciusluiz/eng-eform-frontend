import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const makeEditQuestionValidation = () => {
  const validationSchema = Yup.object().shape({
    content: Yup.string().max(191).required('Content is required'),
    answers: Yup.array().of(
      Yup.object().shape({
        content: Yup.string().max(191).required('Content is required'),
        hasContent: Yup.boolean(),
        isDefault: Yup.boolean()
      })
    )
    // .min(2)
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  return formOptions;
};
