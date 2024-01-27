import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import type { GetForm } from '~/app/domain/usecases';

export class RemoteGetForm implements GetForm {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteGetForm.Response>
  ) {}
  private qsParser(questionsShow?: boolean) {
    const filter: Record<string, any> = {};
    if (questionsShow) {
      filter.questionsShow = questionsShow;
    }
    const searchParams = new URLSearchParams(filter);
    return searchParams;
  }
  async get(
    id: string,
    questionsShow?: boolean
  ): Promise<RemoteGetForm.Response> {
    const searchParams = this.qsParser(questionsShow);
    const queryString = searchParams.toString();
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}${id}?${queryString}`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteGetForm.Response;
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return {} as RemoteGetForm.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetForm {
  export type Response = GetForm.Response;
}
