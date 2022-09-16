import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import PublicEstablishmentRoutes from '../routes/public/PublicEstablishmentRoutes';
import PrivateEstablishmentRoutes from '../routes/private/PrivateEstablishmentRoutes';
dotenv.config();

const app = express();
app.use(compression());
app.use(helmet());

const establishmentRoutes = new PublicEstablishmentRoutes();
const privateestablishmentRoutes = new PrivateEstablishmentRoutes();

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(establishmentRoutes.router);
app.use(privateestablishmentRoutes.router);

export { app };
