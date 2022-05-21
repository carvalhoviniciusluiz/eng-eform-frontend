import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const makeNewQuestionValidation = () => {
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),

    numberOfAnswers: Yup.string().required('Answer is required'),
    answers: Yup.array().of(
      Yup.object().shape({
        content: Yup.string().required('Content is required')
      })
    )
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  return formOptions
}
