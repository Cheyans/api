import {Request, Response, NextFunction} from "express";
import {BaseError} from "./baseError";
import {logger} from "../logger";
import {ServerError} from "./server/serverError";
import {UnhandledErrorHandler} from "../../interfaces/unhandledErrorHandler";
import {notFoundError} from "./unhandledErrorHandlers/notFound";

/**
 * @summary Handles errors and sends response to client
 *
 * @description Logs any additional error information and sends appropriate message to client depending if internal
 * error or not
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let baseError = (err instanceof BaseError) ? err : buildAppropriateError(err);

  if (baseError.logTrace() && baseError.stack !== undefined) {
    logger.error(baseError.stack);
  }
  res.status(baseError.status).json(baseError.toJSON());

}

function buildAppropriateError(err: any): BaseError {
  const handlers: UnhandledErrorHandler[] = [
    notFoundError
  ];

  let baseError = new ServerError();
  handlers.find((handler) => {
    const error = handler(err);
    if (error !== null) {
      baseError = error;
      return true;
    }
    return false;
  });

  return baseError;
}