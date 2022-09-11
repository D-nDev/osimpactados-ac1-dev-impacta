import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();
if(process.env.NODE_ENV == "production") {
  require('module-alias/register')
}
import cookieParser from 'cookie-parser';
import PublicEstablishmentRoutes from "../routes/public/PublicEstablishmentRoutes";
import PrivateEstablishmentRoutes from "../routes/private/PrivateEstablishmentRoutes";

const app = express();
const establishmentRoutes = new PublicEstablishmentRoutes()
const privateestablishmentRoutes = new PrivateEstablishmentRoutes();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(establishmentRoutes.router);
app.use(privateestablishmentRoutes.router);

export { app }