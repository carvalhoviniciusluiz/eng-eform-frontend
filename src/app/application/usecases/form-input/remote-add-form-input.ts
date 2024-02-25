import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError, ValueError } from '~/app/domain/errors';
import { AddFormInput } from '~/app/domain/usecases';

export class RemoteAddFormInput implements AddFormInput {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddFormInput.Input,
      AddFormInput.Response
    >
  ) {}

  async execute(input: AddFormInput.Input): Promise<AddFormInput.Output> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: input
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as AddFormInput.Response;
      case HttpStatusCode.badRequest: {
        const { body } = httpResponse.body as any;
        throw new ValueError(body.errors);
      }
      default:
        throw new UnexpectedError();
    }
  }
}
