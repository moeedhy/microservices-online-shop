import express from "express";
import cookieSession from "cookie-session";

const app = express();
app.use(express.json());
app.set("trust proxy", true);

cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test",
});

export { app };
