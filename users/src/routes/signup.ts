import { Router } from "express";
import User from "../models/user";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name, phone, role } = req.body;
    const user = await User.create({ email, password, name, phone, role });
    console.log(user);
    res.send(user).status(201);
  } catch (e) {
    console.log(e);
  }
});

export { router as signup };
