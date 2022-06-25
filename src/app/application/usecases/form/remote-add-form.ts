import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
import { AddForm } from '~/app/domain/usecases';

export class RemoteAddForm implements AddForm {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteAddForm.Params,
      RemoteAddForm.Response
    >
  ) {}

  async add(params: RemoteAddForm.Params): Promise<RemoteAddForm.Response> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteAddForm.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddForm {
  export type Params = AddForm.Params;
  export type Response = AddForm.Response;
}
