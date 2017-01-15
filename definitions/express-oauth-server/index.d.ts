declare module "express-oauth-server" {
  import * as express from "express";
  import * as oauth2server from "oauth2-server";
  import {Config} from "../express-oauth-server-static/index";

  class ExpressOAuthServer {
    public server: oauth2server.OAuth2Server;
    constructor(config: oauth2server.Config)
    /**
     * Authentication Middleware.
     *
     * Returns a middleware that will validate a token.
     *
     * (See: https://tools.ietf.org/html/rfc6749#section-7)
     */
    public authenticate(options?: Config): express.RequestHandler;

    /**
     * Authorization Middleware.
     *
     * Returns a middleware that will authorize a client to request tokens.
     *
     * (See: https://tools.ietf.org/html/rfc6749#section-3.1)
     */
    public authorize(options?: Config): express.RequestHandler;

    /**
     * Grant Middleware.
     *
     * Returns middleware that will grant tokens to valid requests.
     *
     * (See: https://tools.ietf.org/html/rfc6749#section-3.2)
     */
    public token(options?: Config): express.RequestHandler;
  }
  namespace ExpressOAuthServer {} // TODO: namespace hack is ugly, not sure how to fix this due to module structure
  export = ExpressOAuthServer;
}
