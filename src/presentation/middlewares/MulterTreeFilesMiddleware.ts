import { pinoAdapterInstance } from '@shared/container';
import { RequestHandler } from 'express';
import multer from 'multer';

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().array('files', 3);
  upload(req, res, (error) => {
    if (error !== undefined) {
      pinoAdapterInstance.error('Multer error', error);
      return res.status(500).json({ statusCode: 500, body: 'Unknown Server Error' });
    }
    next();
  });
};
