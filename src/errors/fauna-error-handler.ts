import { HttpStatusCode } from '../data/protocols/http/http-response';

import {
  AuthenticationFailed,
  InstanceNotFoundError,
  InstanceNotUniqueError,
  PermissionDeniedError,
  UnauthorizedError,
  ServerError
} from '.';

type Errors = {
  code: string;
  description: string;
};

type FaunaRequestResult = {
  requestResult: {
    responseContent: {
      errors: Errors[];
    };
  };
};

export class FaunaErrorHandler {
  httpStatusCode: HttpStatusCode = 500;
  code: string;

  constructor() {}

  handle(error: FaunaRequestResult) {
    const { responseContent } = error.requestResult;
    const { code } = responseContent.errors[0];

    switch (code) {
      case 'instance not unique': {
        return { status: 409, error: new InstanceNotUniqueError() };
      }

      case 'authentication failed': {
        return { status: 401, error: new AuthenticationFailed() };
      }

      case 'unauthorized': {
        return { status: 401, error: new UnauthorizedError() };
      }

      case 'instance not found': {
        return { status: 404, error: new InstanceNotFoundError() };
      }

      case 'permission denied': {
        return { status: 403, error: new PermissionDeniedError() };
      }

      default: {
        return { status: 500, error: new ServerError() };
      }
    }
  }
}
