import { FormModel, SurveyModel } from '~/app/domain/models'

export interface AddSubSurvey {
  add: (params: AddSubSurvey.Params) => Promise<AddSubSurvey.Response>
}

export namespace AddSubSurvey {
  export type Params = {
    name: string
  }

  export type Response = {
    id: string
    name: string
    updatedAt: Date
  }

  export type Props = {
    parentForm: FormModel
    parentSurvey: SurveyModel
  }
}
