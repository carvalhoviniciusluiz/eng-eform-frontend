import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { AccessDeniedError, UnexpectedError } from '~/app/domain/errors';
import type { GetFormByProcessNumber } from '~/app/domain/usecases';

export class RemoteGetFormByProcessNumber implements GetFormByProcessNumber {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<GetFormByProcessNumber.HttpResponse>
  ) {}
  private getPerson(
    persons: GetFormByProcessNumber.Person[],
    personType: GetFormByProcessNumber.PersonType
  ): GetFormByProcessNumber.Person {
    const target = persons.find(p => p.personType === personType);
    return target ?? ({} as any);
  }
  async execute(
    input: GetFormByProcessNumber.Input
  ): Promise<GetFormByProcessNumber.Output> {
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}/${input.processNumber}`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const response =
          httpResponse.body as GetFormByProcessNumber.HttpResponse;
        const victim = this.getPerson(response.input.details, 'VICTIM');
        const aggressor = this.getPerson(response.input.details, 'AGGRESSOR');
        return {
          user: {
            email: response.user.email,
            username: response.user.username,
            company: {
              name: response.user.company.name,
              initials: response.user.company.initials,
              code: response.user.company.code
            }
          },
          input: {
            id: response.input.id,
            number: response.input.number,
            createdDateTime: {
              dateLong: new Date(response.input.createdAt).toLocaleDateString(),
              timeLong: new Date(response.input.createdAt).toLocaleTimeString()
            }
          },
          victim,
          aggressor
        };
      }
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent: {
      }
      default:
        throw new UnexpectedError();
    }
  }
}
