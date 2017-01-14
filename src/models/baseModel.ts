import {bookshelf} from "../libs/database";
import {Model} from "bookshelf";
import {Bookshelf} from "@shadowmanu/jsonapi-mapper";

export abstract class BaseModel<T extends Model<T>> extends bookshelf.Model<T> {
  public abstract get tableName(): string
  public static mapper: Bookshelf = new Bookshelf(`${process.env.HOSTNAME}:${process.env.PORT}`);
}
