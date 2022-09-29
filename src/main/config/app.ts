import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import PublicUserRoutes from '../routes/public/PublicUserRoutes';
import PrivateUserRoutes from '../routes/private/PrivateUserRoutes';
dotenv.config();

const corsConfig = {
  origin: true,
  credentials: true,
};

const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression());
app.use(helmet());

const userRoutes = new PublicUserRoutes();
const privateUserRoutes = new PrivateUserRoutes();

app.disable('x-powered-by');

app.use(cookieParser());
app.use(userRoutes.router);
app.use(privateUserRoutes.router);

export { app };
