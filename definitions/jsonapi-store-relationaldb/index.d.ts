declare module "jsonapi-store-relationaldb" {
  import {Handler, RawResource, HandlerRequest, callbackErrOrResult, callbackErrOrNull} from "jsonapi-server";
  import {Schema} from "joi";

  interface Config {
    dialect: string;
    host: string;
    port: string | number;
    database: string;
    username: string;
    password: string;
    logging: boolean | Function;
  }

  namespace JsonApiStoreRelationalDb { }
  class JsonApiStoreRelationalDb implements Handler {
    public ready: boolean;
    constructor(config: Config)
    public initialise(resourceConfig: Schema): void;
    public search(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    public find(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    public create(request: HandlerRequest, newResource: RawResource, callback: callbackErrOrResult<any>): void;
    public delete(request: HandlerRequest, callback: callbackErrOrNull): void;
    public update(request: HandlerRequest, partialResource: RawResource, callback: callbackErrOrResult<any>): void;
  }

  export = JsonApiStoreRelationalDb;
}
