import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import { LoadQuestions } from '~/app/domain/usecases';

export class RemoteLoadQuestions implements LoadQuestions {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadQuestions.Response>
  ) {}

  async loadAll(
    params?: LoadQuestions.Params
  ): Promise<RemoteLoadQuestions.Response> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      params
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteLoadQuestions.Response;
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return {} as RemoteLoadQuestions.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadQuestions {
  export type Response = LoadQuestions.Response;
}
