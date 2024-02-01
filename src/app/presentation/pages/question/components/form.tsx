import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Controller,
  UseFormProps,
  useFieldArray,
  useForm
} from 'react-hook-form';
import { BiCopy as DupIcon } from 'react-icons/bi';
import { FaRegSave as SaveIcon } from 'react-icons/fa';
import { FiInfo as InfoIcon } from 'react-icons/fi';
import { HiOutlineTrash as TrashIcon } from 'react-icons/hi';
import { AnswerTypeEnum } from '~/app/domain/enums';
import { EditQuestion } from '~/app/domain/usecases';
import { AlertDialog, TextField } from '~/app/presentation/components';
import { useIsMounted } from '~/app/presentation/hooks';
import makeStyles from './form-styles';

type QuestionFormComponentProps = EditQuestion.ApiResponseData & {
  title: string;
  validation: UseFormProps;
  onSubmit: (params: any) => void;
  onAnswerDelete?: (answerId: string) => void;
};

export default function QuestionFormComponent({
  title,
  validation,
  onSubmit,
  onAnswerDelete,
  question,
  answers
}: QuestionFormComponentProps) {
  const classes = makeStyles();
  const isMounted = useIsMounted();
  const [state, setState] = useState({
    answerType: question?.type ?? AnswerTypeEnum.OBJECTIVE,
    open: false,
    destroy: false,
    answerIndex: -1,
    answerId: ''
  });
  const { control, handleSubmit, formState, setValue } = useForm({
    ...validation,
    defaultValues: {
      content: question?.content
    }
  });
  const { isSubmitting } = formState;
  const { fields, append, remove } = useFieldArray({
    name: 'answers',
    control
  });

  useEffect(() => {
    if (isMounted) {
      answers?.forEach(answer =>
        append({
          answerId: answer.id,
          content: answer.content,
          isDefault: answer.isDefault,
          hasContent: answer.hasContent
        })
      );
    }
  }, [isMounted]); // eslint-disable-line

  useEffect(() => {
    const hasAnswerIndex = !!~state.answerIndex;
    if (state.destroy && hasAnswerIndex) {
      remove(state.answerIndex);
      setState(prevState => ({
        ...prevState,
        destroy: false,
        answerIndex: -1,
        answerId: ''
      }));
      const hasAnswerDelete = !!onAnswerDelete;
      if (hasAnswerDelete) {
        onAnswerDelete(state.answerId);
      }
    }
  }, [state.destroy]); // eslint-disable-line

  useEffect(() => {
    setValue('answerType', state.answerType);
  }, [state.answerType]); // eslint-disable-line

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState(prevState => ({
      ...prevState,
      answerType: event.target.value
    }));
  }

  function handleDestroy(answerIndex: number, answerId: string) {
    setState(prevState => ({
      ...prevState,
      open: true,
      answerIndex,
      answerId
    }));
  }

  function handleAnswerTypeFields() {
    return (
      <FormControl style={{ margin: '22px 60px 60px' }}>
        <FormLabel id='label-radio-buttons'>Tipo de resposta</FormLabel>
        <RadioGroup
          aria-labelledby='label-radio-buttons'
          name='controlled-radio-buttons-group'
          value={state.answerType}
          onChange={handleChange}
        >
          <FormControlLabel
            value={AnswerTypeEnum.MULTIPLE}
            control={<Radio />}
            label='Questão de multipla escolha'
          />
          <FormControlLabel
            value={AnswerTypeEnum.OBJECTIVE}
            control={<Radio />}
            label='Resposta objetiva'
          />
          <FormControlLabel
            value={AnswerTypeEnum.PLAIN_TEXT}
            control={<Radio />}
            label='Resposta escrita'
          />
        </RadioGroup>
      </FormControl>
    );
  }

  function handleCheckboxCustom(params: {
    name: string;
    label: string;
    defaultValue?: boolean;
  }) {
    const { label, name, defaultValue = false } = params;
    return (
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 22
                  }
                }}
                checked={value}
                onChange={e => onChange(e.target.checked)}
              />
            )}
          />
        }
        label={label}
      />
    );
  }

  function handleQuestionAndAnswerFields() {
    return (
      <>
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
              height: 40 + 78,
              marginBottom: 44
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
                    onClick={() => handleDestroy(i, (item as any).answerId)}
                  >
                    <TrashIcon />
                  </InputAdornment>
                )
              }}
            />
            <Box>
              {handleCheckboxCustom({
                name: `answers.${i}.hasContent`,
                label: 'Possui texto na resposta?',
                defaultValue: (item as any).hasContent
              })}
              {handleCheckboxCustom({
                name: `answers.${i}.isDefault`,
                label: 'É a resposta padrão?',
                defaultValue: (item as any).isDefault
              })}
            </Box>
          </Box>
        ))}
      </>
    );
  }

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <AlertDialog title='Confirmar delete?' state={state} setState={setState}>
        Esse registro poderá ser recuperado futuramente caso queira. Deseja
        remove-lo mesmo assim?
      </AlertDialog>
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
        {handleAnswerTypeFields()}
        {handleQuestionAndAnswerFields()}
        <section>
          <button
            type='button'
            className={classes.btnSave}
            style={{
              margin: '40px 0'
            }}
            onClick={() => {
              append({ content: '' });
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
  );
}
