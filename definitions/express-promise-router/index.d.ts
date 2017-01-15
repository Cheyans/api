declare module "express-promise-router" {
  import {RouterOptions} from "express";
  import {Router} from "express-serve-static-core";
  function ExpressPromiseRouter(routerOptions?: RouterOptions): Router;
  namespace ExpressPromiseRouter {}
  export = ExpressPromiseRouter;
}
