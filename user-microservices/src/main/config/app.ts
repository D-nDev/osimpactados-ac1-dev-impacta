import express from "express";
import * as dotenv from 'dotenv';
dotenv.config()
import cookieParser from 'cookie-parser';
import PublicUserRoutes from "../routes/public/PublicUserRoutes";
import PrivateUserRoutes from "../routes/private/PrivateUserRoutes";

const app = express();
const userRoutes = new PublicUserRoutes()
const privateUserRoutes = new PrivateUserRoutes();

app.use(express.json());
app.use(cookieParser());
app.use(userRoutes.router);
app.use(privateUserRoutes.router);

export { app }