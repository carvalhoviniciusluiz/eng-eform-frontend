import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit as EditIcon } from 'react-icons/ai'
import { EditForm } from '~/app/domain/usecases'
import { BarAction, Breadcrumbs } from '~/app/presentation/components'
import { FormTag } from '../components'

type EditFormComponentProps = EditForm.Props & {
  editForm: EditForm
  validation: any
}

export default function EditFormComponent({
  data,
  formId,
  editForm,
  validation
}: EditFormComponentProps) {
  const { control, handleSubmit, formState, setValue } =
    useForm<EditForm.Params>(validation)

  const router = useRouter()

  useEffect(() => {
    setValue('name', data.name)
  }, []) // eslint-disable-line

  async function onSubmit(params: EditForm.Params) {
    editForm
      .edit(formId, params)
      .then(() => {
        router.push('/forms')
      })
      .catch(console.error)
  }

  return (
    <>
      <BarAction>
        <Box>
          <Breadcrumbs>
            <Typography>Editar formulário</Typography>
          </Breadcrumbs>

          <Box
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <EditIcon size={23.16} />

            <Typography
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              Editar formulário
            </Typography>
          </Box>
        </Box>
      </BarAction>

      <FormTag
        title='Formulário'
        isSubmitting={formState.isSubmitting}
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </>
  )
}
