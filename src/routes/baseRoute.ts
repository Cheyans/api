import * as PromiseRouter from "express-promise-router";
import {Router} from "express";

export class BaseRoute {
  public router: Router;

  constructor(public route: string) {
    this.router = PromiseRouter();
  }
}
