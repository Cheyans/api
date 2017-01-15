import {Claims} from "./claims";
import {RequestJsonApiParams} from "./requestJsonApiParams";

export interface RequestAuthed extends RequestJsonApiParams {
  user: Claims;
}
