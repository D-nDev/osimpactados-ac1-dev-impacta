import { BaseController } from '@presentation/controllers/contracts/BaseController';

import { Request, Response } from 'express';

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: { ...(req.body || {}) },
      params: { ...(req.body || {}) },
      query: { ...(req.query || {}) },
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        statusCode: httpResponse.statusCode || 500,
        error: httpResponse.body || 'Unknown error',
      });
    }
  };
};
