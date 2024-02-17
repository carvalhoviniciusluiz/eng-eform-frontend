import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
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
      default:
        throw new UnexpectedError();
    }
  }
}
