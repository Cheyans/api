import {Request, Response, NextFunction} from "express";
import * as ExpressOAuthServer from "express-oauth-server";
import {ExpressOAuthConfig} from "../libs/oauth/config";
import {BaseRoute} from "./baseRoute";
import {AuthedRequest} from "../interfaces/authedRequest";

export class OAuthRoute extends BaseRoute {
  private oauth: ExpressOAuthServer;

  constructor(route: string) {
    super(route);
    this.oauth = new ExpressOAuthServer(new ExpressOAuthConfig());
    this.router.get("/authorize", this.getAuthorize);
    this.router.post("/authorize", this.postAuthorize);
    this.router.post("/token", this.oauth.token());
  }

  public getAuthorize(req: Request, res: Response, next: NextFunction) {
    return res.render("authorize", {
      client_id: req.query.client_id,
      redirect_uri: req.query.redirect_uri
    });
  }

  public postAuthorize(req: Request) {
    return this.oauth.authorize();
  }

  public postToken(req: AuthedRequest, res: Response) {
    const {client_id, redirect_uri, response_type} = req.query;
    res.render("authorize", {
      username: req.user.username,
      scopes: req.query.scope.split(" "),
      client_id, redirect_uri, response_type
    });
  }
}
