import { BaseMiddleware } from '@presentation/middlewares/contracts/BaseMiddleware';
import { NextFunction, Request, Response } from 'express';

export const adaptMiddleware = (middleware: BaseMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const middlewareResponse = middleware.handle(req);
    if (middlewareResponse.statusCode >= 200 && middlewareResponse.statusCode <= 299) {
      next();
    } else {
      res.status(middlewareResponse.statusCode).json({
        statusCode: middlewareResponse.statusCode || 500,
        error: middlewareResponse.body || 'Unknown error',
      });
    }
  };
};
