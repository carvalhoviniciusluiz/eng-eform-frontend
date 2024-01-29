import {
  HttpPostClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import { UnexpectedError } from '~/app/domain/errors';
import { AddQuestion } from '~/app/domain/usecases';

export class RemoteAddQuestion implements AddQuestion {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteAddQuestion.RequestParams,
      RemoteAddQuestion.Response
    >
  ) {}

  async add(
    params: RemoteAddQuestion.FormParams
  ): Promise<RemoteAddQuestion.Response> {
    const options: any = {
      url: this.url,
      body: {
        answerType: params.answerType,
        content: params.content
      }
    };
    const haAnswers = !!params.answers.length;
    if (haAnswers) {
      options.body.answers = {
        type: params.answerType,
        data: params.answers
      };
    }
    const httpResponse = await this.httpPostClient.post(options);
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.created:
        return httpResponse.body as RemoteAddQuestion.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddQuestion {
  export type FormParams = AddQuestion.FormParams;
  export type RequestParams = AddQuestion.RequestParams;
  export type Response = AddQuestion.Response;
}
