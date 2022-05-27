import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const makeNewSubSurveyValidation = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  return formOptions
}
