import {BaseClientError} from "./baseClientError";

export class BadRequest extends BaseClientError {
  public status = 400;
  public title = "Bad Request";
}
