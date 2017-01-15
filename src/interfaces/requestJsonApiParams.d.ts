import {Request} from "express";
import {FetchJsonApiOptions} from "../../definitions/bookshelf-jsonapi-params-static/index";

export interface RequestJsonApiParams extends Request {
  jsonApiParams: FetchJsonApiOptions;
}
