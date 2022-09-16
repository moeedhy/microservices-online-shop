import { CustomError } from "./custom-error";

export class AuthError extends CustomError {
  statusCode: number = 422;

  serialize(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
