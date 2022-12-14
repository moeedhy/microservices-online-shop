import { body, param } from "express-validator";
import { validationRequest } from "@moeed/common";
import { NextFunction, Request, Response, Router } from "express";
import User from "../models/user";
import { AuthError } from "@moeed/common";
import { requireAuth } from "@moeed/common";
import { isAdmin } from "@moeed/common";

const router = Router();
router.put(
  "/update/:id",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid"),
    body(["name,lastname"]).notEmpty(),
    body(["country", "city"]).isNumeric(),
    body("password").isLength({ min: 8 }),
    param("id").notEmpty(),
  ],
  validationRequest,
  requireAuth,
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user's id from jwt
    const { id } = req.params;
    // find user in DB
    const user = await User.findByPk(id);
    if (!user) throw new AuthError("user not founded");
    // Update user data and save it to DB
    const { email, address, name, lastname, country, city, password } =
      req.body;
    const userUpdated = await User.update(
      {
        email,
        address,
        name,
        lastname,
        country,
        city,
        password,
      },
      {
        where: { id: user.id },
        returning: true,
      }
    );

    res
      .status(200)
      .send({ message: "User updated", data: { result: userUpdated } });
  }
);

export { router as updateUser };
