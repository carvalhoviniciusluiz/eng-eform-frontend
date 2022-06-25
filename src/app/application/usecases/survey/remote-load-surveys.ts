import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import { LoadSurveys } from '~/app/domain/usecases';

export class RemoteLoadSurveys implements LoadSurveys {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveys.Response>
  ) {}

  async loadAll(
    params?: LoadSurveys.Params
  ): Promise<RemoteLoadSurveys.Response> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      params
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteLoadSurveys.Response;
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return {} as RemoteLoadSurveys.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveys {
  export type Response = LoadSurveys.Response;
}
