import {NextFunction} from "express";
import {Model} from "bookshelf";
import {NotFound} from "../errors/client/notFound";
import {ServerError} from "../errors/server/serverError";

/**
 * Handles generic internal errors
 */
export function handleInternalError(next: NextFunction, err: Error): void {
  next(new ServerError(err.stack));
}

/**
 * Handles null model and passes the correct error to the next function
 * @returns if model was handled or not
 */
export function handleNotFoundIfNecessary<T extends Model<T>>(resource: string, result: T | null | void,
                                                              next: NextFunction): boolean {
  if (result == null) {
    next(new NotFound(`The resource '${resource}' could not be found`));
    return true;
  }
  return false;
}
