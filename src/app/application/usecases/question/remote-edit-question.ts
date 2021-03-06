import {
  HttpPatchClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
import { EditQuestion } from '~/app/domain/usecases';

export class RemoteEditQuestion implements EditQuestion {
  constructor(
    private readonly url: string,
    private readonly httpPatchClient: HttpPatchClient<
      RemoteEditQuestion.RequestParams,
      RemoteEditQuestion.Response
    >
  ) {}

  async edit(
    id: string,
    params: RemoteEditQuestion.FormParams
  ): Promise<RemoteEditQuestion.Response> {
    const httpResponse = await this.httpPatchClient.patch({
      url: `${this.url}/${id}`,
      body: {
        content: params.content,
        answers: {
          type: params.answerType,
          data: params.answers
        }
      }
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteEditQuestion.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteEditQuestion {
  export type FormParams = EditQuestion.FormParams;
  export type RequestParams = EditQuestion.RequestParams;
  export type Response = EditQuestion.Response;
}
