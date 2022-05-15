import { Box, Typography } from '@mui/material'
import { Control } from 'react-hook-form'
import { FaRegSave as SaveIcon } from 'react-icons/fa'
import { FiInfo as InfoIcon } from 'react-icons/fi'
import { TextField } from '~/app/presentation/components'
import makeStyles from './form-styles'

type QuestionFormComponentProps = {
  isSubmitting: boolean
  handleSubmit: any
  control: Control<any, any>
  title: string
}

export default function QuestionFormComponent({
  isSubmitting,
  handleSubmit,
  control,
  title
}: QuestionFormComponentProps) {
  const classes = makeStyles()

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
        onSubmit={handleSubmit}
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
            height: 40 + 78,
            width: 308
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
      </form>
    </Box>
  )
}
