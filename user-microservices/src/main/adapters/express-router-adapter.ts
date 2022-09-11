import { HttpResponse } from '@presentation/controllers/contracts/httpResponse';
import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { Request, Response } from 'express';

const timeout = (): Promise<any> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 10000);
  });
};

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: { ...(req.body || {}) },
      params: { ...(req.body || {}) },
      query: { ...(req.query || {}) },
      headers: { ...(req.headers || {}) },
      cookies: { ...(req.cookies || {}) },
    };
    try {
      const result = await Promise.race<HttpResponse | HttpResponse>([timeout(), controller.handle(request)]);
      if (result.statusCode >= 200 && result.statusCode <= 299) {
        res.status(result.statusCode).json(result.body);
      } else {
        res.status(result.statusCode).json({
          statusCode: result.statusCode || 500,
          error: result.body || 'Unknown error',
        });
      }
    } catch (e: any) {
      res.status(503).json({ error: 'Service Unavailable - Timeout' });
    }
  };
};
