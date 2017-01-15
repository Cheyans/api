import {JsonApiError} from "../../interfaces/jsonApiError";
import {JsonApiErrorSource} from "../../interfaces/jsonApiErrorSource";

export abstract class BaseError extends Error {
  public abstract status: number;
  public abstract title: string;
  constructor(public detail: string, public source?: JsonApiErrorSource) {
    super(detail);
  };

  public abstract logTrace(): boolean;

  public toJSON(): JsonApiError {
    return {
      status: this.status,
      title: this.title,
      detail: this.detail,
      source: this.source
    };
  }
}
