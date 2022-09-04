import express from "express";
import UserRoutes from "../routes/UserRoutes";

const app = express();
const userRoutes = new UserRoutes()

app.use(express.json())
app.use(userRoutes.router)

export { app }