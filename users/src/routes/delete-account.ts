import { Router } from "express";
import { NotFoundError, requireAuth } from "@moeed/common";
import { isAdmin } from "@moeed/common";
import User from "../models/user";

const router = Router();

router.delete("/delete:id", requireAuth, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new NotFoundError("User not found");
    await user.destroy();
    res
      .status(200)
      .send({ message: "User deleted", data: { user: { id: user.id } } });
  } catch (e) {
    next(e);
  }
});
