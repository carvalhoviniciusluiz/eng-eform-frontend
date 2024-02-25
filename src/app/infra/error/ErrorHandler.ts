import { UnexpectedError, ValueError } from '~/app/domain/errors';

function errorHandler(error: Error) {
  switch (true) {
    case error instanceof UnexpectedError:
      return {
        title: 'Desculpe, aldo deu errado',
        message: 'Um erro inesperado aconteceu.'
      };
    case error instanceof ValueError: {
      const [, type] = error.message.split('::');
      const output = {
        title: 'Erro',
        message: 'Este agressor já está cadastrado.'
      };
      if (type === 'VICTIM') {
        output.message = 'Esta vítima já está cadastrada.';
      }
      return output;
    }
    default:
      return {
        title: 'Desculpe, aldo deu errado',
        message: 'Verifique os parâmetros repassados e tente novamente.'
      };
  }
}

export default errorHandler;
