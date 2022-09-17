import { body } from "express-validator";
import { validationRequest } from "../middlewares/validation-request";
import { NextFunction, Request, Response, Router } from "express";
import User from "../models/user";
import { AuthError } from "../errors/auth-error";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();
router.put(
  "/update",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid"),
  ],
  validationRequest,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user's id from jwt
    const id = req.currentUser?.id;
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
      }
    );
    console.log(userUpdated);
    // Set update needing to false
    res.status(200).send({ message: "User updated", data: { id: user.id } });
  }
);

export { router as updateUser };
