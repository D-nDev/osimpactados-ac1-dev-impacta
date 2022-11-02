import { Request, Response } from 'express';

export interface InterceptMiddleware {
  handle: (req: Request, res: Response) => void;
}
