import * as Knex from "knex";
import * as Bookshelf from "bookshelf";
import * as jsonApiParams from "bookshelf-jsonapi-params";

class Database {
  public bookshelf: Bookshelf;

  constructor() {
    this.bookshelf = Bookshelf(Knex({
      client: "mysql",
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
    this.bookshelf.plugin(jsonApiParams);
  }
}

export const bookshelf = new Database().bookshelf;
