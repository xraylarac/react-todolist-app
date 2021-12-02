import { SuccessResponse } from '../../data/protocols/http/http-response';

export function makeSuccessResponse(message: string, payload: object): SuccessResponse {
  return {
    status: 200,
    message,
    payload
  };
}
