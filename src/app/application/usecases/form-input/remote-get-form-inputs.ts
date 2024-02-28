import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { BadRequestError, UnexpectedError } from '~/app/domain/errors';
import { GetFormInputs } from '~/app/domain/usecases';

export class RemoteGetFormInputs implements GetFormInputs {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<GetFormInputs.HttpResponse[]>
  ) {}
  private qsParser(params?: GetFormInputs.Input) {
    if (!params) return new URLSearchParams();
    const { aggressorId, protocolNumber, victimId } = params;
    const filter: Record<string, any> = {};
    if (aggressorId) {
      filter.aggressorId = aggressorId;
    }
    if (protocolNumber) {
      filter.protocolNumber = protocolNumber;
    }
    if (victimId) {
      filter.victimId = victimId;
    }
    const searchParams = new URLSearchParams(filter);
    return searchParams;
  }
  async execute(input: GetFormInputs.Input): Promise<GetFormInputs.Output[]> {
    const { aggressorId, protocolNumber, victimId } = input;
    if (!aggressorId && !protocolNumber && !victimId) {
      throw new Error('Not found params');
    }
    const searchParams = this.qsParser(input);
    const queryString = searchParams.toString();
    const url = queryString ? `${this.url}?${queryString}` : this.url;
    const httpResponse = await this.httpGetClient.get({
      url
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as GetFormInputs.Output[];
      case HttpStatusCode.badRequest:
        throw new BadRequestError();
      default:
        throw new UnexpectedError();
    }
  }
}
