import { FormModel, SurveyModel } from '~/app/domain/models'

export interface EditQuestion {
  edit: (
    id: string,
    params: EditQuestion.Params
  ) => Promise<EditQuestion.Response>
}

export namespace EditQuestion {
  export type Params = {
    content: string
  }

  export type Response = {
    id: string
    content: string
    updatedAt: Date
  }

  export type AnswerApiResponseData = {
    id: string
    content: string
    updatedAt: string
  }

  export type ApiResponseData = {
    question: {
      id: string
      type: string
      content: string
      updatedAt: Date
    }
    answers: AnswerApiResponseData[]
  }

  export type Props = {
    body: ApiResponseData
    parentForm: FormModel
    parentSurvey: SurveyModel
  }
}
