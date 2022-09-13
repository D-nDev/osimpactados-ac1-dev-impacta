import { HttpResponse } from '@presentation/controllers/contracts/httpResponse';
import { Request } from 'express';

export interface BaseMiddleware {
  handle: (req: Request) => HttpResponse;
}
