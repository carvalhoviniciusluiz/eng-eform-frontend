import { AnswerTypeEnum } from '~/app/domain/enums'
import { AnswerModel, FormModel, SurveyModel } from '~/app/domain/models'

export interface AddQuestion {
  add: (params: AddQuestion.FormParams) => Promise<AddQuestion.Response>
}

export namespace AddQuestion {
  export type Props = {
    parentForm: FormModel
    parentSurvey: SurveyModel
  }

  export type FormParams = {
    content: string
    answerType: AnswerTypeEnum
    answers: AnswerModel[]
  }

  export type RequestParams = {
    content: string
    answers: {
      type: AnswerTypeEnum
      data: AnswerApiResponseData[]
    }
  }

  export type AnswerApiResponseData = {
    id?: string
    content: string
    updatedAt?: Date
  }

  export type Response = {
    question: {
      id: string
      type: AnswerTypeEnum
      content: string
      updatedAt: Date
    }
    answers: AnswerApiResponseData[]
  }
}
