import { Router } from "express";

import { requireAuth } from "@moeed/common";

import User from "../models/user";
import { AuthError } from "@moeed/common";

/*
 Get current user's information
 */
const router = Router();

router.get("/currentuser", requireAuth, async (req, res, next) => {
  try {
    const userID = req.currentUser?.id;
    const user = await User.findByPk(userID);
    if (!user) throw new AuthError("User not found");
    const { id, phone, name, lastname, country, city, address, email, role } =
      user;

    res.status(200).send({
      message: "User Founded",
      data: {
        user: {
          id,
          phone,
          name,
          lastname,
          country,
          city,
          address,
          email,
          role,
        },
      },
    });
  } catch (e) {
    next(e);
  }
});

export { router as currentUserRoute };
