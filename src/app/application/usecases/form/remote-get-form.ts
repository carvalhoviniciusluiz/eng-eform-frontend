import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import { GetForm } from '~/app/domain/usecases';

export class RemoteGetForm implements GetForm {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteGetForm.Response>
  ) {}

  async get(id: string): Promise<RemoteGetForm.Response> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}${id}`
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
