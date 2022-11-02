import { BaseController } from '@presentation/controllers/contracts/BaseController';
import { Request, Response } from 'express';
import { loginUserControllerFactory } from '../factories/LoginUserControllerFactory';
import opentelemetry from '@opentelemetry/api';

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: { ...(req.body || {}) },
      params: { ...(req.params || {}) },
      query: { ...(req.query || {}) },
      headers: { ...(req.headers || {}) },
      cookies: { ...(req.cookies || {}) },
    };

    try {
      const result = await controller.handle(request);

      if (result.statusCode >= 200 && result.statusCode <= 299) {
        res.status(result.statusCode).json(result.body);
      } else {
        res.status(result.statusCode).json({
          statusCode: result.statusCode || 500,
          error: result.body || 'Unknown error',
        });
      }
    } catch (e: any) {
      const tracer = opentelemetry.trace.getTracer('express');
      const span = tracer.startSpan(e.name ?? 'Unknown Error');
      span.setStatus({ code: 2 });
      span.setAttribute('Error message', e.message ?? 'no message');
      span.end();
      return res.status(503).json({ error: 'Service Unavailable' });
    }
  };
};

export const adaptLoginRoute = () => {
  return async (req: Request, res: Response) => {
    const request = {
      body: { ...(req.body || {}) },
      params: { ...(req.params || {}) },
      query: { ...(req.query || {}) },
      headers: { ...(req.headers || {}) },
      cookies: { ...(req.cookies || {}) },
    };
    const controller: BaseController = loginUserControllerFactory(req);
    try {
      const result = await controller.handle(request);
      if (result.statusCode >= 200 && result.statusCode <= 299) {
        res.status(result.statusCode).json(result.body);
      } else {
        res.status(result.statusCode).json({
          statusCode: result.statusCode || 500,
          error: result.body || 'Unknown error',
        });
      }
    } catch (e: any) {
      const tracer = opentelemetry.trace.getTracer('express');
      const span = tracer.startSpan('error');
      span.recordException(e);
      span.setStatus({ code: 2 });
      res.status(503).json({ error: 'Service Unavailable' });
    }
  };
};
