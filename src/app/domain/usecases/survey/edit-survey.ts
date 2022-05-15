import { FormModel } from '~/app/domain/models'

export interface EditSurvey {
  edit: (id: string, params: EditSurvey.Params) => Promise<EditSurvey.Response>
}

export namespace EditSurvey {
  export type Params = {
    name: string
  }

  export type Response = {
    id: string
    name: string
    updatedAt: Date
  }

  export type Props = {
    data: EditSurvey.Response
    parentForm: FormModel
  }
}
