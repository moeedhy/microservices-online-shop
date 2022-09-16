import express from "express";
import cookieSession from "cookie-session";
import { signup } from "./routes/signup";
import { NotFoundError } from "./errors/not-found-error";
import { errorHanlder } from "./middlewares/error-hanlder";

const app = express();
app.use(express.json());
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// Routes
app.use("/api/v1/users/", signup);

// Not found error for missed routes
app.get("*", () => {
  throw new NotFoundError("Route not found 404");
});

// Error handler
app.use(errorHanlder);
export { app };
