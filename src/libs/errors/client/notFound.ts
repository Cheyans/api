import {BaseClientError} from "./baseClientError";

export class NotFound extends BaseClientError {
  public status = 404;
  public title = "Not Found";
}
