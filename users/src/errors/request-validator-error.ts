import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidatorError extends CustomError {
  statusCode: number = 422;
  constructor(public errors: ValidationError[]) {
    super("Request parameters invalid");
    Object.setPrototypeOf(this, RequestValidatorError.prototype);
  }
  serialize(): { message: string; field?: string }[] {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
