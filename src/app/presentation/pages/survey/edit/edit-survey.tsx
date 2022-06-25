import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { AiOutlineEdit as EditIcon } from 'react-icons/ai';
import { MdKeyboardArrowRight as ArrowRightIcon } from 'react-icons/md';
import { EditSurvey } from '~/app/domain/usecases';
import { BarAction, Breadcrumbs, Link } from '~/app/presentation/components';
import { SurveyFormTag } from '~/app/presentation/pages/survey/components';

type EditSurveyComponentProps = EditSurvey.Props & {
  editSurvey: EditSurvey;
  validation: UseFormProps<EditSurvey.Params>;
};

export default function EditSurveyComponent({
  data,
  parentForm,
  editSurvey,
  validation
}: EditSurveyComponentProps) {
  const { control, handleSubmit, formState, setValue } =
    useForm<EditSurvey.Params>(validation);

  const router = useRouter();

  useEffect(() => {
    setValue('name', data.name);
  }, []); // eslint-disable-line

  async function onSubmit(params: EditSurvey.Params) {
    editSurvey
      .edit(data.id, params)
      .then(() => {
        router.push(GO_BACK);
      })
      .catch(console.error);
  }

  const GO_BACK = `/forms/${parentForm.id}/surveys`;

  return (
    <>
      <BarAction>
        <Box>
          <Breadcrumbs>
            <Link
              style={{
                color: '#B5B5B5',
                textDecoration: 'none'
              }}
              href='/forms'
            >
              Gerenciador
            </Link>

            <Link
              style={{
                color: '#B5B5B5',
                textDecoration: 'none'
              }}
              href={GO_BACK}
            >
              Enquetes
            </Link>

            <Typography>Editar enquete</Typography>
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
              display='flex'
              alignItems='center'
              style={{
                fontSize: 24,
                marginLeft: 12
              }}
            >
              {parentForm.name} <ArrowRightIcon /> Editar enquete
            </Typography>
          </Box>
        </Box>
      </BarAction>

      <SurveyFormTag
        title='Enquete'
        isSubmitting={formState.isSubmitting}
        handleSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </>
  );
}
