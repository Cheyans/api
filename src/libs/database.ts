import * as Knex from "knex";
import * as Bookshelf from "bookshelf";
import * as jsonApiParams from "bookshelf-jsonapi-params";
import {valueToBoolean} from "../utils/miscellaneous";

export class Database {
  private static instance: Database;
  public bookshelf: Bookshelf;

  public static get Instance() {
    return this.instance || (this.instance = new Database());
  }

  private constructor() {
    this.bookshelf = Bookshelf(Knex({
      client: "mysql",
      debug: process.env.NODE_ENV === "development" && valueToBoolean(process.env.DEBUG_QUERIES),
      connection: {
        host: process.env.DB_PORT_3306_TCP_ADDR,
        port: 3306,
        user: process.env.FAF_DB_LOGIN,
        password: process.env.FAF_DB_PASSWORD,
        database: process.env.FAF_DB_NAME
      }
    }));
    this.registerPlugins();
  }

  private registerPlugins(): void {
    // this.bookshelf.plugin("registry");
    this.bookshelf.plugin(jsonApiParams, {
      pagination: {
        limit: 1000
      }
    });
    this.bookshelf.plugin("visibility");
  }
}
