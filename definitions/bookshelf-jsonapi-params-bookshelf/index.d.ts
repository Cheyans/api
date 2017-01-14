import {ModelBase, Events, Collection} from "bookshelf";
import * as BlueBird from "bluebird";

declare module "bookshelf" {
  export interface Model<T extends Model<any>> extends ModelBase<T> {
    fetchJsonApi(options: any): BlueBird<T>;
  }
}
