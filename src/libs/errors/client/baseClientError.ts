import {BaseError} from "../baseError";

export abstract class BaseClientError extends BaseError {
  public logTrace(): boolean {
    return false;
  }
}
