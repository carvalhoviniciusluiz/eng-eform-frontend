import {
  HttpDeleteClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
import { DeleteForm } from '~/app/domain/usecases';

export class RemoteDeleteForm implements DeleteForm {
  constructor(
    private readonly url: string,
    private readonly httpDeleteClient: HttpDeleteClient<RemoteDeleteForm.Response>
  ) {}

  async delete(id: string): Promise<RemoteDeleteForm.Response> {
    const httpResponse = await this.httpDeleteClient.delete({
      url: `${this.url}/${id}`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteDeleteForm.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteDeleteForm {
  export type Response = DeleteForm.Response;
}
