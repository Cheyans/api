import {join} from "path";
import * as express from "express";
import {json, urlencoded} from "body-parser";
import {Database} from "./libs/database";
import {requestLogger, errorLogger} from "./libs/logger";
import {errorHandler, unhandledErrorHandler} from "./libs/errors/handlers";
import {OAuthRoute} from "./routes/oauth";
import {AvatarsRoute} from "./routes/avatars";
import {queryParser} from "./libs/jsonApi/queryParser";
import {RequestHandlerParams} from "express-serve-static-core";

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
    this.express.use(urlencoded({extended: false}));
    this.express.use(requestLogger);
    this.express.use(queryParser);
  }

  private configureGlobalStore(): void {
    this.express.locals.bookshelf = Database.Instance.bookshelf;
  }

  private registerRoutes(): void {
    this.registerRoute("/oauth", new OAuthRoute("oauth").router);
    this.registerRoute("/avatars", new AvatarsRoute("avatars").router);
  }

  private registerErrorMiddleware() {
    this.express.use(errorLogger);
    this.express.use(errorHandler);
  }

  private registerRoute(route: string, ...middleware: RequestHandlerParams[]): void {
    this.express.use(route, unhandledErrorHandler, ...middleware);
  }
}
