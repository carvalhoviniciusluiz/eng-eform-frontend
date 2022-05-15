import { FormModel } from '~/app/domain/models'

export interface AddSurvey {
  add: (params: AddSurvey.Params) => Promise<AddSurvey.Response>
}

export namespace AddSurvey {
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
  }
}
