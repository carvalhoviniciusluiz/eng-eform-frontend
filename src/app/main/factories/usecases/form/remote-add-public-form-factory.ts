import { RemoteAddPublicForm } from '~/app/application/usecases';
import { AddPublicForm } from '~/app/domain/usecases';
import { makeAxiosHttpClient } from '~/app/main/factories/http';

export const makeRemoteAddPublicForm = (formId: string): AddPublicForm => {
  return new RemoteAddPublicForm(`/${formId}`, makeAxiosHttpClient());
};
