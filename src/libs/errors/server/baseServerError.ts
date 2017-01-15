import {BaseError} from "../baseError";

export abstract class BaseServerError extends BaseError {
  public title = "Internal Error";
  public status = 500;

  constructor(detail: string, stack?: string) {
    super(detail);
    this.stack = stack;
  }

  public logTrace() {
    return true;
  }
}
