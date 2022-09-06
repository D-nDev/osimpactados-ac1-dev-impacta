import express from "express";
import * as dotenv from 'dotenv';
dotenv.config()
import PublicUserRoutes from "../routes/public/PublicUserRoutes";

const app = express();
const userRoutes = new PublicUserRoutes()

app.use(express.json())
app.use(userRoutes.router)

export { app }