import * as dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import PublicEstablishmentRoutes from '../routes/public/PublicEstablishmentRoutes';
import PrivateEstablishmentRoutes from '../routes/private/PrivateEstablishmentRoutes';
dotenv.config();

const corsOption = {
  origin: [process.env.FRONT_URL as unknown as string],
  credentials: true,
};

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression());
app.use(helmet());

const establishmentRoutes = new PublicEstablishmentRoutes();
const privateestablishmentRoutes = new PrivateEstablishmentRoutes();

app.disable('x-powered-by');
app.use(cookieParser());
app.use(cors(corsOption));
app.use(establishmentRoutes.router);
app.use(privateestablishmentRoutes.router);

export { app };
