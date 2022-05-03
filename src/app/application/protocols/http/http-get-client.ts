import { HttpResponse } from '~/app/application/protocols/http'

export type HttpGetParams = {
  url: string
  params?: any
  headers?: any
}

export interface HttpGetClient<ResponseType = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ResponseType>>
}
