import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import { LoadFullForms } from '~/app/domain/usecases';

export class RemoteLoadFullForms implements LoadFullForms {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadFullForms.Response>
  ) {}

  async execute() {
    const httpResponse = await this.httpGetClient.get({
      url: this.url
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as LoadFullForms.Response;
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return {} as LoadFullForms.Response;
      default:
        throw new UnexpectedError();
    }
  }
}
