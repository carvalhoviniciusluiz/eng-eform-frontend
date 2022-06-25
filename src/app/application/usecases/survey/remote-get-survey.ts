import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import { GetSurvey } from '~/app/domain/usecases';

export class RemoteGetSurvey implements GetSurvey {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteGetSurvey.Response>
  ) {}

  async get(id: string): Promise<RemoteGetSurvey.Response> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}/${id}`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteGetSurvey.Response;
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return {} as RemoteGetSurvey.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetSurvey {
  export type Response = GetSurvey.Response;
}
