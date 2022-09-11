import express from 'express';
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
const userRoutes = new PublicUserRoutes();
const privateUserRoutes = new PrivateUserRoutes();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(userRoutes.router);
app.use(privateUserRoutes.router);
export { app };
