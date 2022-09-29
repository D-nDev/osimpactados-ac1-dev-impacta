import { pinoAdapterInstance } from '@shared/container';
import { RequestHandler } from 'express';
import multer from 'multer';

export const adaptFormDataSingleFile: RequestHandler = (req, res, next) => {
  const upload = multer({
    limits: {
      fileSize: 8000000,
    },
  }).array('files', 1);
  upload(req, res, (error) => {
    if (error !== undefined) {
      pinoAdapterInstance.error('Multer error', error);
      return res.status(500).json({ statusCode: 500, body: 'Unknown Server Error' });
    }
    next();
  });
};
