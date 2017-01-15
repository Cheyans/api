import {JsonApiErrorSource} from "./jsonApiErrorSource";

export interface JsonApiError {
  id?: number;
  links?: {
    about: string;
  };
  status: number;
  code?: string;
  title: string;
  detail: string;
  source?: JsonApiErrorSource;
  meta?: {[key: string]: any};
}
