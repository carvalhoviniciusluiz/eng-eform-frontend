import { HttpResponse } from '~/app/application/protocols/http'

export type HttpPatchParams<BodyType = any> = {
  url: string
  body?: BodyType
  headers?: any
}

export interface HttpPatchClient<BodyType = any, ResponseType = any> {
  patch: (
    params: HttpPatchParams<BodyType>
  ) => Promise<HttpResponse<ResponseType>>
}
