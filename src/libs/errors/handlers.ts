import {Request, Response, NextFunction} from "express";
import {BaseError} from "./baseError";
import {logger} from "../logger";
import {ServerError} from "./server/serverError";
import {JsonApiErrors} from "../../interfaces/jsonApiErrors";
import {UnhandledErrorHandler} from "../../interfaces/unhandledErrorHandler";
import {notFoundError} from "./unhandledErrorHandlers/notFound";
import {JsonApiError} from "../../interfaces/jsonApiError";

const handlers: UnhandledErrorHandler[] = [
  notFoundError
];

/**
 * @summary Handles errors and sends response to client
 *
 * @description Logs any additional error information and sends appropriate message to client depending if internal
 * error or not
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let errors: JsonApiErrors = {errors: []};
  let status = 500;

  if (err instanceof Array) {
    [status, errors.errors] = getBaseErrorArrayResponse(err);
  } else if (err instanceof BaseError) {
    if (err.stack) {
      logger.error(err.stack);
    }
    errors.errors.push(err.toJSON());
  } else {
    const error = getErrors(err);
    status = error[0];
    errors.errors = error[1];
  }
  res.status(status).json(errors);
}

function getBaseErrorArrayResponse(errors: BaseError[]): [number, JsonApiError[]] {
  if (errors.length < 0) {
    return [500, [new ServerError().toJSON()]];
  }
  let status = errors[0].status;

  const serializedErrors = errors.map((error) => {
    if (error.logTrace() && error.stack !== undefined) {
      logger.error(error.stack);
    }
    if (status !== error.status) {
      status = 400;
    }
    return error.toJSON();
  });
  return [status, serializedErrors];
}

function getErrors(error: any): [number, BaseError[]] {
  let result: [number, BaseError[]] = [500, [new ServerError()]];
  handlers.find((handler) => {
    const handlerResult = handler(error);
    if (handlerResult !== null) {
      result = handlerResult;
      return true;
    }
    return false;
  });
  return result;
}
