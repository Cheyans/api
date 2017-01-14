import * as njwt from "njwt";
import {Request, Response, NextFunction} from "express";
import {ResponseErrors} from "../errors/errors";
import {AuthedRequest} from "../../interfaces/authedRequest";
import {Claims} from "../../interfaces/claims";
import TokenExpired = ResponseErrors.TokenExpired;
import UnauthorizedAccess = ResponseErrors.UnauthorizedAccess;

const SIGNING_KEY: string = process.env.SIGNING_KEY;

export function verifier(req: Request, res: Response, next: NextFunction) {
  const token: string = req.headers.authorization;
  if (token) {
    njwt.verify(token, SIGNING_KEY, (err, jwt) => {
      if (err) {
        next(new TokenExpired());
      } else {
        (<AuthedRequest> req).user = (<Claims> jwt.body.toJSON());
        next();
      }
    });
  } else {
    // token not sent
    next(new UnauthorizedAccess());
  }
}
