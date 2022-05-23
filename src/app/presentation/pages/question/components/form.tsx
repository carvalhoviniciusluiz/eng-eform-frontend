import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useFieldArray, useForm, UseFormProps } from 'react-hook-form'
import { BiCopy as DupIcon } from 'react-icons/bi'
import { FaRegSave as SaveIcon } from 'react-icons/fa'
import { FiInfo as InfoIcon } from 'react-icons/fi'
import { HiOutlineTrash as TrashIcon } from 'react-icons/hi'
import { AnswerTypeEnum } from '~/app/domain/enums'
import { EditQuestion } from '~/app/domain/usecases'
import { TextField } from '~/app/presentation/components'
import makeStyles from './form-styles'

type QuestionFormComponentProps = {
  title: string
  validation: UseFormProps
  onSubmit: (params: any) => void
  body?: EditQuestion.ApiResponseData
}

// https://github.com/facebook/react/issues/14927#issuecomment-469878110
function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

export default function QuestionFormComponent({
  title,
  validation,
  onSubmit,
  body
}: QuestionFormComponentProps) {
  const classes = makeStyles()

  const isMounted = useIsMounted()

  const { control, handleSubmit, formState, setValue } = useForm({
    ...validation,
    defaultValues: {
      content: body?.question?.content
    }
  })
  const { isSubmitting } = formState
  const { fields, append, remove } = useFieldArray({
    name: 'answers',
    control
  })

  const [answerType, setAnswerType] = useState<AnswerTypeEnum | string>(
    body?.question?.type ?? AnswerTypeEnum.OBJECTIVE
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerType(event.target.value)
  }

  useEffect(() => {
    if (isMounted) {
      body?.answers?.forEach((answer) =>
        append({ id: answer.id, content: answer.content })
      )
    }
  }, [isMounted]) // eslint-disable-line

  useEffect(() => {
    setValue('answerType', answerType)
  }, [answerType]) // eslint-disable-line

  return (
    <Box
      style={{
        display: 'flex',
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
        {fields.length < 2 && (
          <Alert severity='warning' style={{ marginTop: 72 }}>
            Você deve informar pelo menos duas resposta para sua questão
          </Alert>
        )}

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

        <FormControl style={{ margin: '22px 60px 60px' }}>
          <FormLabel id='label-radio-buttons'>Tipo de resposta</FormLabel>
          <RadioGroup
            aria-labelledby='label-radio-buttons'
            name='controlled-radio-buttons-group'
            value={answerType}
            onChange={handleChange}
          >
            <FormControlLabel
              value={AnswerTypeEnum.MULTIPLE}
              control={<Radio />}
              label='Questão de multiplas escolhas'
            />
            <FormControlLabel
              value={AnswerTypeEnum.OBJECTIVE}
              control={<Radio />}
              label='Resposta objetiva'
            />
          </RadioGroup>
        </FormControl>

        <Box
          style={{
            height: 200
          }}
        >
          <label htmlFor='content'>
            Pergunta
            <span>*</span>
          </label>
          <TextField
            style={{
              marginTop: 7
            }}
            control={control}
            name='content'
            variant='outlined'
            multiline
            rows={4}
          />
        </Box>

        {fields.map((item, i) => (
          <Box
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              height: 40 + 78
            }}
          >
            <label htmlFor='content'>
              Resposta
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
                    onClick={() => remove(i)}
                  >
                    <TrashIcon />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        ))}
        <section>
          <button
            type='button'
            className={classes.btnSave}
            style={{
              margin: '40px 0'
            }}
            onClick={() => {
              append({ content: '' })
            }}
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
        </section>
      </form>
    </Box>
  )
}
