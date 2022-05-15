import { FormModel, SurveyModel } from '~/app/domain/models'

export interface AddQuestion {
  add: (params: AddQuestion.Params) => Promise<AddQuestion.Response>
}

export namespace AddQuestion {
  export type Params = {
    content: string
  }

  export type Response = {
    id: string
    content: string
    updatedAt: Date
  }

  export type Props = {
    parentForm: FormModel
    parentSurvey: SurveyModel
  }
}
