import {Config} from "../../../definitions/express-oauth-server-static/index";
import {Model} from "./model";

export class ExpressOAuthConfig implements Config {
  public model = Model;
  public accessTokenLifetime = 3600 * 24 * 365;
  public useErrorHandler = true;
  public debug = process.env.NODE_ENV === "development";
  public grants = [
    "authorization_code",
    "client_credentials"
  ];
}
