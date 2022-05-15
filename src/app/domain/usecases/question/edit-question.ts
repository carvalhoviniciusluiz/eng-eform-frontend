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

  export type Props = {
    data: Response
    parentForm: FormModel
    parentSurvey: SurveyModel
  }
}
