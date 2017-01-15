import {BaseError} from "../baseError";
import {NotFound} from "../client/notFound";

/**
 * @summary Handles unknown resources from db
 */
export function notFoundError(reason: any, promise: Promise<any>): BaseError | null {
  if (reason instanceof Error && reason.message === "EmptyResponse") {
    return new NotFound("Resource not found");
  }
  return null;
}
