import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { BadRequestError, UnexpectedError } from '~/app/domain/errors';
import { GetFormInputProtocols } from '~/app/domain/usecases';

export class RemoteGetFormInputProtocols implements GetFormInputProtocols {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      GetFormInputProtocols.HttpResponse[]
    >
  ) {}

  async execute(
    input: GetFormInputProtocols.Input
  ): Promise<GetFormInputProtocols.Output[]> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as GetFormInputProtocols.Output[];
      case HttpStatusCode.badRequest:
        throw new BadRequestError();
      default:
        throw new UnexpectedError();
    }
  }
}
