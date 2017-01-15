import {BaseError} from "../libs/errors/baseError";

export interface UnhandledErrorHandler {
  (reason: any, promise: Promise<any>): BaseError | null;
}
