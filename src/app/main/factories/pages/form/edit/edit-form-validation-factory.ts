import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const makeEditFormValidation = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  return formOptions
}
