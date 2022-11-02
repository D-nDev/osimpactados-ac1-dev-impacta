import { NextFunction, Request, Response } from 'express';
import opentelemetry from '@opentelemetry/api';
import { InterceptMiddleware } from './contracts/InterceptMiddleware';

export const adaptObservabilityMiddleware = (middleware: InterceptMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    middleware.handle(req, res);
    next();
  };
};

export default class StartObservabilityMiddleware implements InterceptMiddleware {
  public handle(req: Request, res: Response) {
    const tracer = opentelemetry.trace.getTracer('express');
    const spanReq = tracer.startSpan('request', { kind: 1 });

    spanReq.setAttribute('originalRequestBody', JSON.stringify(req.body));
    spanReq.setAttribute('originalRequestQuery', JSON.stringify(req.query));
    spanReq.setAttribute('originalRequestParams', JSON.stringify(req.params));
    spanReq.setAttribute('originalRequestHeaders', JSON.stringify(req.headers));
    spanReq.setAttribute('originalRequestCookies', JSON.stringify(req.cookies));

    const oldRes = res.send;

    let currentResponseBody: Response;

    res.send = (body: any) => {
      spanReq.end();
      if (typeof body === 'string') {
        currentResponseBody = JSON.parse(body);
      } else {
        currentResponseBody = body;
      }
      return oldRes.call(res, body);
    };

    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode <= 499) {
        const spanRes = tracer.startSpan('response', { kind: 1 });
        spanRes.setAttribute('response', JSON.stringify(currentResponseBody) ?? '');
        spanRes.end();
      } else if (res.statusCode === 503) {
        const spanRes = tracer.startSpan('response', { kind: 1 });
        spanRes.setAttribute('response', JSON.stringify(currentResponseBody) ?? '');
        spanRes.end();
      }
    });
  }
}
