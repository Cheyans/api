import * as PromiseRouter from "express-promise-router";
import {Router} from "express";
import {Bookshelf} from "@shadowmanu/jsonapi-mapper";

export abstract class BaseRoute {
  public static readonly mapper: Bookshelf = new Bookshelf(`${process.env.HOSTNAME}:${process.env.PORT}`);
  public router: Router;
  // public abstract relationships: BaseRoute[];

  constructor(public route: string) {
    this.router = PromiseRouter();
  }
}
