import { AddQuestion } from '~/app/domain/usecases'
import { makeRemoteAddQuestion } from '~/app/main/factories/usecases'
import { NewQuestionTag } from '~/app/presentation/pages'
import { makeNewQuestionValidation } from './new-question-validation-factory'

export const makeNewQuestion = (props: AddQuestion.Props) => {
  return (
    <NewQuestionTag
      {...props}
      addQuestion={makeRemoteAddQuestion(props.parentSurvey.id)}
      validation={makeNewQuestionValidation()}
    />
  )
}
