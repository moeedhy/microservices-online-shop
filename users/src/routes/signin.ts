import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { validationRequest } from "@moeed/common";
import User from "../models/user";
import { AuthError } from "@moeed/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
Sign in with phone number
- api: /api/v1/users/signin/password
- api: /api/v1/users/signin/code
 */

const router = Router();

router.post(
  "/signin/password",
  [
    body("phone")
      .trim()
      .isMobilePhone("any")
      .withMessage("Mobile phone is not valid"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  validationRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Find user in DB
      const { phone, password } = req.body;
      const user = await User.findOne({ where: { phone } });
      if (!user) throw new AuthError("User not found");
      // Check the user has a password
      if (user.password === null)
        throw new AuthError("The user has not set a password");
      // Compare password
      const passCheck = await bcrypt.compare(password, user.password);
      if (!passCheck) throw new AuthError("Username or password is wrong!");

      // Set JWT data
      const jwtData = jwt.sign(
        { id: user.id, phone: user.phone , role: user.role},
        process.env.JWT_SECRET!
      );
      // Set cookie
      req.session = { jwt: jwtData };

      // send response
      res.status(200).send({
        message: "User logged in",
        data: { id: user.id, phone: user.phone },
      });
    } catch (e) {
      next(e);
    }
  }
);

// todo: Sign in with phone number and send sms code

export { router as signin };
