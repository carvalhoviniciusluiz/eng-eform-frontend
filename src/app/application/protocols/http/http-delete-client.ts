import { HttpResponse } from '~/app/application/protocols/http'

export type HttpDeleteParams = {
  url: string
  headers?: any
}

export interface HttpDeleteClient<ResponseType = any> {
  delete: (params: HttpDeleteParams) => Promise<HttpResponse<ResponseType>>
}
