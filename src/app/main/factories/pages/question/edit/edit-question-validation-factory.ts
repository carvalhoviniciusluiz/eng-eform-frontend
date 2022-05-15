import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const makeEditQuestionValidation = () => {
  const validationSchema = Yup.object().shape({
    Content: Yup.string().required('Content is required')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  return formOptions
}
