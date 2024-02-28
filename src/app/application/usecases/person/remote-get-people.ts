import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { BadRequestError, UnexpectedError } from '~/app/domain/errors';
import { GetPeople } from '~/app/domain/usecases';

export class RemoteGetPeople implements GetPeople {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<GetPeople.HttpResponse[]>
  ) {}

  async execute(input: GetPeople.Input): Promise<GetPeople.Output[]> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}?personType=${input.personType}`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as GetPeople.Output[];
      case HttpStatusCode.badRequest:
        throw new BadRequestError();
      default:
        throw new UnexpectedError();
    }
  }
}
