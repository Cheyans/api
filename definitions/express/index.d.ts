import * as Bookshelf from "bookshelf";

declare module "express" {
  export interface GlobalStore {
    bookshelf: Bookshelf;
  }

  export interface Application {
    locals: GlobalStore;
  }

  interface Request {
    app: Application;
  }
}
