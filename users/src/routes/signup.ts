import { NextFunction, Request, Response, Router } from "express";
import User from "../models/user";
import { body } from "express-validator";
import { validationRequest } from "@moeed/common";
import { AuthError } from "@moeed/common";
import jwt from "jsonwebtoken";

/*
SignUp: signup user with phone number
 - api: /api/v1/user/signup
 
 */
const router = Router();

router.post(
  "/signup",
  [
    body("phone")
      .trim()
      .isMobilePhone("any", { strictMode: true })
      .withMessage("Phone number is incorrect"),
    body(["name", "lastname"])
      .notEmpty()
      .withMessage("Name or lastname is not valid"),
  ],
  validationRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check user exists on the database
      const { phone, name, lastname } = req.body;
      const user = await User.findOne({ where: { phone } });
      if (user) throw new AuthError("User with this phone or email is existed");

      // todo: send event to verification service

      // todo: receive and check event from the verification service

      // create new user
      const newUser = await User.create({
        phone,
        email: null,
        lastname,
        name,
        password: null,
      });

      // Sign data in jsonwebtoken and session
      const jwtData = jwt.sign(
        { id: newUser.id, phone: newUser.phone , role:newUser.role},
        process.env.JWT_KEY!
      );
      req.session = { jwt: jwtData };

      // Send response to client service
      res.status(201).send({
        message: "User created",
        data: { id: newUser.id, phone: newUser.phone },
      });
    } catch (e) {
      next(e);
    }
  }
);

export { router as signup };
