import * as njwt from "njwt";
import {ResponseErrors} from "../errors/errors";
import TokenExpired = ResponseErrors.TokenExpired;
import UnauthorizedAccess = ResponseErrors.UnauthorizedAccess;
import NotFound = ResponseErrors.NotFound;

export const SIGNING_KEY = process.env.SIGNING_KEY;

export function generateUserJwt(user: any): string {
  const claims = {
    iss: "FAF",
    sub: user.id,
    username: user.username,
    banned: Boolean(user.banned),
  };
  return createAndCompact(claims);
}

/**
 * Creates a jwt token for the given claims
 * @param claims - user claims
 * @returns {string}
 */
export function createAndCompact(claims: any): string {
  const token = njwt.create(claims, SIGNING_KEY);
  token.setExpiration(new Date().getTime() + 3600 * 24 * 7);
  return token.compact();
}
