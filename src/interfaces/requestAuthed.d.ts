import {JwtClaims} from "./jwtClaims";
import {RequestJsonApiParams} from "./requestJsonApiParams";

export interface RequestAuthed extends RequestJsonApiParams {
  user: JwtClaims;
}
