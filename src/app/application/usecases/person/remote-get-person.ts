import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { BadRequestError, UnexpectedError } from '~/app/domain/errors';
import { GetPerson } from '~/app/domain/usecases';

export class RemoteGetPerson implements GetPerson {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<GetPerson.Response[]>
  ) {}

  async execute(input: GetPerson.Input): Promise<GetPerson.Output> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}/${input.name}`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        const response = httpResponse.body as GetPerson.Output;
        const parseDate = (value?: string) => {
          const data = value?.split('T')[0];
          if (data) {
            return data.split('-').reverse().join('/');
          }
        };
        return response.map(res => ({
          ...res,
          person: {
            ...res.person,
            birthDate: parseDate(res.person.birthDate)
          },
          documents: res.documents.map(document => ({
            ...document,
            shippingDate: parseDate(document.shippingDate)
          }))
        }));
      case HttpStatusCode.badRequest:
        throw new BadRequestError();
      default:
        throw new UnexpectedError();
    }
  }
}
