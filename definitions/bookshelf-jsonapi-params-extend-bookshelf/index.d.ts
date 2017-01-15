import {ModelBase} from "bookshelf";
import * as BlueBird from "bluebird";
import {FetchJsonApiOptions} from "../bookshelf-jsonapi-params-static/index";

declare module "bookshelf" {
  export interface Model<T extends Model<any>> extends ModelBase<T> {
    fetchJsonApi(options: FetchJsonApiOptions, isCollection?: boolean, type?: string): BlueBird<T>;
  }
}
