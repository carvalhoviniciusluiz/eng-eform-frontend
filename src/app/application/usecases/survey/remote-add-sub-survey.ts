import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
import { AddSubSurvey } from '~/app/domain/usecases';

export class RemoteAddSubSurvey implements AddSubSurvey {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteAddSubSurvey.Params,
      RemoteAddSubSurvey.Response
    >
  ) {}

  async add(
    params: RemoteAddSubSurvey.Params
  ): Promise<RemoteAddSubSurvey.Response> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteAddSubSurvey.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddSubSurvey {
  export type Params = AddSubSurvey.Params;
  export type Response = AddSubSurvey.Response;
}
