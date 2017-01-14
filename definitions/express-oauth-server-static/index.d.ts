import * as oauth2server from "oauth2-server";

export interface Config extends oauth2server.Config {
  useErrorHandler?: boolean;
  continueMiddleware?: boolean;
}
