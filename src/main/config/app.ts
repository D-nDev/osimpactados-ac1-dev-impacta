import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import PublicUserRoutes from '../routes/public/PublicUserRoutes';
import PrivateUserRoutes from '../routes/private/PrivateUserRoutes';
dotenv.config();
if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

const app = express();
app.use(compression());
app.use(helmet());
const userRoutes = new PublicUserRoutes();
const privateUserRoutes = new PrivateUserRoutes();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(userRoutes.router);
app.use(privateUserRoutes.router);
export { app };
