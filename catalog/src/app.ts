import express from "express";
import cookieSession from "cookie-session";
import { currentUser, errorHanlder, NotFoundError } from "@moeed/common";

const app = express();
app.use(express.json());

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.get("*", () => {
  throw new NotFoundError("404 Route not found");
});

app.use(errorHanlder);

export { app };
