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
  let baseError = (err instanceof BaseError) ? err : new ServerError(err.stack);
  if (baseError.logTrace() && baseError.stack !== undefined) {
    logger.error(baseError.stack);
  }
  res.status(baseError.status).json(baseError.toJSON());

}

/**
 * @summary Catches and handles unhandled promise rejects.
 *
 * @description This is an end all be all catcher so the client isn't exposed to a stack trace. Since the handler
 * is not exposed to the context of the error it is limited in its logging capabilities and a result <b>as many errors
 * as possible should be caught by preceding functions</b>
 */
export function unhandledErrorHandler(req: Request, res: Response, next: NextFunction) {
  const handlers: UnhandledErrorHandler[] = [
    notFoundError
  ];

  function handlerIterator(reason: any, promise: Promise<any>) {
    let baseError = new ServerError();
    handlers.find((handler) => {
      const error = handler(reason, promise);
      if (error !== null) {
        baseError = error;
        return true;
      }
      return false;
    });

    if (!res.headersSent) {
      next(baseError);
    }

    process.removeListener("unhandledRejection", handlerIterator);
  }

  process.on("unhandledRejection", handlerIterator);
  next();
}
