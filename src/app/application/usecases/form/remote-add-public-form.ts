import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
import { AddPublicForm } from '~/app/domain/usecases';

export class RemoteAddPublicForm implements AddPublicForm {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteAddPublicForm.Params,
      RemoteAddPublicForm.Response
    >
  ) {}

  async add(
    params: RemoteAddPublicForm.Params
  ): Promise<RemoteAddPublicForm.Response> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteAddPublicForm.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddPublicForm {
  export type Params = AddPublicForm.Params;
  export type Response = AddPublicForm.Response;
}
