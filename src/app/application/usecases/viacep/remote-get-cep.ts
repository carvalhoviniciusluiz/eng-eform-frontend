import {
  HttpGetClient,
  HttpStatusCode
} from '~/app/application/protocols/http';
import {
  AccessDeniedError,
  CepError,
  UnexpectedError
} from '~/app/domain/errors';
import type { GetCep } from '~/app/domain/usecases';

export class RemoteGetCep implements GetCep {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<GetCep.Response>
  ) {}
  async get(cep: string): Promise<GetCep.Address> {
    if (!cep) {
      throw new CepError();
    }
    const httpResponse = await this.httpGetClient.get({
      url: `${this.url}/${cep}/json/`
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const response = httpResponse.body as GetCep.Response;
        return {
          neighborhood: response.bairro,
          neighborhoodComplement: response.complemento,
          zipCode: response.cep,
          ddd: response.ddd,
          city: response.localidade,
          county: response.uf,
          publicPlace: response.logradouro
        };
      }
      case HttpStatusCode.unauthorized:
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.noContent:
        return {} as GetCep.Address;
      default:
        throw new UnexpectedError();
    }
  }
}
