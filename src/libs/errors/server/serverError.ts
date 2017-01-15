import {BaseServerError} from "./baseServerError";

export class ServerError extends BaseServerError {
  constructor(stack?: string) {
    super("Something went wrong", stack);
  }
}
