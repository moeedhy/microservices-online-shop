import express from "express";
import cookieSession from "cookie-session";
import { signup } from "./routes/signup";
import { NotFoundError } from "@moeed/common";
import { errorHanlder } from "@moeed/common";
import { updateUser } from "./routes/update-user";
import { currentUser } from "@moeed/common";
import { currentUserRoute } from "./routes/current-user";
import { signin } from "./routes/signin";

const app = express();
app.use(express.json());
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// Check current user
app.use(currentUser);
// Routes
app.use("/api/v1/users/", signup, updateUser, currentUserRoute, signin);

// Not found error for missed routes
app.get("*", () => {
  throw new NotFoundError("Route not found 404");
});

// Error handler
app.use(errorHanlder);
export { app };
