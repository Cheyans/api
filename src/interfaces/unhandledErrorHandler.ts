import {BaseError} from "../libs/errors/baseError";

export interface UnhandledErrorHandler {
  (err: any): BaseError | null;
}
