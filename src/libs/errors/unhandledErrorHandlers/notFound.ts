import {BaseError} from "../baseError";
import {NotFound} from "../client/notFound";

/**
 * @summary Handles unknown resources from db
 */
export function notFoundError(err: any): BaseError | null {
  if (err instanceof Error && err.message === "EmptyResponse") {
    return new NotFound("Resource not found");
  }
  return null;
}
