import {
  HttpDeleteClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
import { DeleteAnswer } from '~/app/domain/usecases';

export class RemoteDeleteAnswer implements DeleteAnswer {
  constructor(
    private readonly url: string,
    private readonly httpDeleteClient: HttpDeleteClient<RemoteDeleteAnswer.Response>
  ) {}

  async delete(id: string): Promise<RemoteDeleteAnswer.Response> {
    const httpResponse = await this.httpDeleteClient.delete({
      url: `${this.url}/${id}`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteDeleteAnswer.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteDeleteAnswer {
  export type Response = DeleteAnswer.Response;
}
