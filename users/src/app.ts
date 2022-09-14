import express from "express";
import cookieSession from "cookie-session";
import { signup } from "./routes/signup";

const app = express();
app.use(express.json());
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use("/api/users/", signup);

export { app };
