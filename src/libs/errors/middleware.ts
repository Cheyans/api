import {Request, Response, NextFunction} from "express";

/**
 * Sends appropriate message to client depending if 500+ error or not
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status ? err.status : 500;
  res.status(status).json({
    error: status >= 500 ? "Something went wrong" : err.message,
    data: err.data
  });
}