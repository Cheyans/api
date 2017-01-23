import {join} from "path";
import * as express from "express";
import {json, urlencoded} from "body-parser";
import {Database} from "./libs/database";
import {requestLogger, errorLogger} from "./libs/logger";
import {errorHandler} from "./libs/errors/handlers";
import {OAuthRoute} from "./routes/oauth";
import {AvatarsRoute} from "./routes/avatars";
import {queryParser} from "./libs/jsonApi/queryParser";
import {UsersRoute} from "./routes/users";

export class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.configureSettings();
    this.registerMiddleware();
    this.configureGlobalStore();
    this.registerRoutes();
    this.registerErrorMiddleware();
  }

  private configureSettings(): void {
    this.express.set("view engine", "ejs");
    this.express.set("views", join(__dirname, "../views"));
  }

  private registerMiddleware(): void {
    this.express.use(json());
    this.express.use(urlencoded({
      type: ["application/json", "application/vnd.api+json"],
      extended: false
    }));
    this.express.use(requestLogger);
    this.express.use(queryParser);
  }

  private configureGlobalStore(): void {
    this.express.locals.bookshelf = Database.Instance.bookshelf;
  }

  private registerRoutes(): void {
    this.express.use("/oauth", new OAuthRoute("oauth").router);
    this.express.use("/avatars", new AvatarsRoute("avatars").router);
    this.express.use("/users", new UsersRoute("users").router);
  }

  private registerErrorMiddleware() {
    this.express.use(errorLogger);
    this.express.use(errorHandler);
  }
}
