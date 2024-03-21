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
  private qsParser(params?: LoadFullForms.Params) {
    const { except, only } = params ?? {};
    const filter: Record<string, any> = {};
    if (except) {
      filter.except = except;
    }
    if (only) {
      filter.only = only;
    }
    const searchParams = new URLSearchParams(filter);
    return searchParams;
  }
  async execute(params?: LoadFullForms.Params) {
    const searchParams = this.qsParser(params);
    const queryString = searchParams.toString();
    const url = queryString ? `${this.url}?${queryString}` : this.url;
    const httpResponse = await this.httpGetClient.get({ url });
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
