import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import {
  BadRequestError,
  UnauthorizedError,
  UnexpectedError
} from '~/app/domain/errors';
import { PostFormInputByProcessNumber } from '~/app/domain/usecases';

export class RemotePostFormInputByProcessNumber
  implements PostFormInputByProcessNumber
{
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      PostFormInputByProcessNumber.HttpResponse[]
    >
  ) {}

  async execute(
    input: PostFormInputByProcessNumber.Input
  ): Promise<PostFormInputByProcessNumber.Output> {
    const { processNumber, questions } = input;
    const httpResponse = await this.httpPostClient.post({
      url: `${this.url}/${processNumber}`,
      body: questions
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created: {
        return;
      }
      case HttpStatusCode.badRequest:
        throw new BadRequestError();
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      default:
        throw new UnexpectedError();
    }
  }
}
