import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  serialize(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
