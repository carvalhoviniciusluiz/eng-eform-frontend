import { Alert, Box, InputAdornment, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useFieldArray, useForm, UseFormProps } from 'react-hook-form'
import { BiCopy as DupIcon } from 'react-icons/bi'
import { FaRegSave as SaveIcon } from 'react-icons/fa'
import { FiInfo as InfoIcon } from 'react-icons/fi'
import { HiOutlineTrash as TrashIcon } from 'react-icons/hi'
import { TextField } from '~/app/presentation/components'
import makeStyles from './form-styles'

type QuestionFormComponentProps = {
  validation: UseFormProps
  onSubmit: (data: any) => void
  title: string
}

export default function QuestionFormComponent({
  validation,
  onSubmit,
  title
}: QuestionFormComponentProps) {
  const classes = makeStyles()

  const { control, handleSubmit, setValue, formState, watch } =
    useForm(validation)
  const { errors, isSubmitting } = formState
  const { fields, append, remove } = useFieldArray({
    name: 'answers',
    control: control
  })

  const numberOfAnswers = watch('numberOfAnswers', 0)

  useEffect(() => {
    const newVal = parseInt(numberOfAnswers)
    const oldVal = fields.length

    for (let i = oldVal; i < newVal; i++) {
      append({ content: '' })
    }
    // if (newVal > oldVal) {
    //   for (let i = oldVal; i < newVal; i++) {
    //     append({ content: '' })
    //   }
    // } else {
    //   for (let i = oldVal; i > newVal; i--) {
    //     remove(i - 1)
    //   }
    // }
  }, [numberOfAnswers]) // eslint-disable-line

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <form
        style={{
          width: 571,
          justifyContent: 'center'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          style={{
            margin: '72px 0 73px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            style={{
              fontSize: 24
            }}
          >
            {title}
          </Typography>

          <button className={classes.btnSave} disabled={isSubmitting}>
            <SaveIcon size={20} fill='white' />

            <span
              style={{
                marginLeft: 13,
                color: 'white'
              }}
            >
              Salvar questão
            </span>
          </button>
        </Box>

        {!!errors.numberOfAnswers && (
          <Alert severity='warning'>{errors.numberOfAnswers?.message}</Alert>
        )}

        <Box
          style={{
            marginTop: 57,
            marginBottom: 25,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <InfoIcon width={23.16} />

          <Typography
            style={{
              fontSize: 14,
              marginLeft: 8
            }}
          >
            Informações da questão
          </Typography>
        </Box>

        <Box
          style={{
            height: 40 + 78
          }}
        >
          <label htmlFor='content'>
            Conteúdo da questão
            <span>*</span>
          </label>
          <TextField
            style={{
              marginTop: 7
            }}
            control={control}
            name='content'
            variant='outlined'
          />
        </Box>

        <Box
          style={{
            marginTop: 57,
            marginBottom: 25,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <InfoIcon width={23.16} />

          <Typography
            style={{
              fontSize: 14,
              marginLeft: 8
            }}
          >
            Informações das respostas
          </Typography>
        </Box>

        {fields.map((item, i) => (
          <Box
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              height: 40 + 78
            }}
          >
            <label htmlFor='content'>
              Conteúdo da resposta {i}
              <span>*</span>
            </label>
            <TextField
              style={{
                marginTop: 7
              }}
              control={control}
              name={`answers.${i}.content`}
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    style={{
                      cursor: 'pointer'
                    }}
                    position='end'
                    onClick={() => {
                      remove(i)
                      setValue('numberOfAnswers', Number(numberOfAnswers) - 1)
                    }}
                  >
                    <TrashIcon />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        ))}

        <div>
          <button
            className={classes.btnSave}
            style={{
              margin: '40px 0'
            }}
            onClick={() =>
              setValue('numberOfAnswers', Number(numberOfAnswers | 0) + 1)
            }
            type='button'
            disabled={isSubmitting}
          >
            <DupIcon size={20} fill='white' />

            <span
              style={{
                marginLeft: 13,
                color: 'white'
              }}
            >
              Adicionar resposta
            </span>
          </button>
        </div>
      </form>
    </Box>
  )
}
