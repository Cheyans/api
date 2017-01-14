import {Claims} from "./claims";
import {JsonApiParamsRequest} from "./jsonApiParamsRequest";

export interface AuthedRequest extends JsonApiParamsRequest {
  user: Claims;
}
