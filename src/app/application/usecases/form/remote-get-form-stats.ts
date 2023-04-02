import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import type { GetFormStats } from '~/app/domain/usecases';

export class RemoteGetFormStats implements GetFormStats {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteGetFormStats.ApiResponse>
  ) {}

  async get(formId: string): Promise<RemoteGetFormStats.Response> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}/${formId}/stats`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteGetFormStats.Response;
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return {} as RemoteGetFormStats.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetFormStats {
  export type ApiResponse = GetFormStats.ApiResponse;
  export type Response = GetFormStats.Response;
}
