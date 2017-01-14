declare module "jsonapi-server" {
  import * as express from "express";
  import * as j from "joi";
  type Schema = j.Schema;
  export const Joi: typeof j;

  /**
   * Configure the jsonapi server
   * @param {Config} config
   */
  export function setConfig(config: Config): void;

  /**
   * This function will be invoked on every request, as soon as the HTTP
   * request has been parsed into a "request" object.
   * If you callback with an error, the client will receive a HTTP 401 Unauthorised
   * If you callback with no error, the request will continue onwards
   * @param {function} authHandler
   */
  export function authenticate(authHandler: (request: express.Request, callback: callbackErrOrNull) => void): void;
  export function define(resourceConfig: Resource): void;
  export function onUncaughtException(errHandler: (request: express.Request, error: any) => void): void;
  export function getExpressServer(): express.Application;

  /**
   * Starts the server, should only be called after setConfig is called
   */
  export function start(): void;

  /**
   * Stops the server
   */
  export function close(): void;

  export interface Config {
    /**
     * An express Router to bind to instead of building a new Express server
     */
    router?: express.Router;
    /**
     * An alias of the absolute portion of URLs generated in a response file
     * eg http://localhost:16006/some-resource/ -> https://www.example.com/my-api/some-resource/
     */
    urlPrefixAlias?: string;
    /**
     * @default: "http"
     */
    protocol?: "http" | "https";
    /**
     * The hostname the API will be sat behind, from the customer's perspective
     */
    hostname?: string;
    /**
     * The port the customer will be using
     */
    port: number;
    /**
     * Define a url prefix for the apiConfig
     * eg http://-----/rest/
     */
    base?: string;
    /**
     * meta block to appear in the root of every response
     * meta can be a function to be invoked at the end of every request
     * | (express.Request) => {[key: string]: string}
     */
    meta?: {[key: string]: string} | Function;
    //
    /**
     * Should the interactive GraphQL HTTP interface be served up?
     * @default: false
     */
    graphiql?: boolean;
  }

  export interface Resource {
    namespace?: string;
    resource: string;
    description?: string;
    handlers: any;
    searchParams: {
      relationships?: Schema,
      sort?: Schema,
      filter?: Schema,
      fields?: Schema,
      include?: Schema
    };
    attributes: {[key: string]: Schema};
    examples?: any;
  }

  /**
   * Format for all requests are presented to handlers
   */
  export interface HandlerRequest {
    /**
     * All request parameters get combined into this object. Query params, body params, etc.
     */
    params: {[key: string]: string};
    /**
     * All HTTP request headers
     */
    headers: {[key: string]: string};
    /**
     * Routing information
     */
    route: {
      host: string;
      path: string;
      query: string;
      combined: string;
    };
  }

  export interface RawResource {
    id: string;
    type: string;
  }

  export class MemoryHandler implements Handler {
    public ready: boolean;
    public initialise(resourceConfig: Schema): void;
    public search(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    public find(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    public create(request: HandlerRequest, newResource: RawResource, callback: callbackErrOrResult<any>): void;
    public delete(request: HandlerRequest, callback: callbackErrOrNull): void;
    public update(request: HandlerRequest, partialResource: RawResource, callback: callbackErrOrResult<any>): void;
  }

  export class ChainHandler implements Handler {
    public ready: boolean;
    public initialise(resourceConfig: Schema): void;
    public search(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    public find(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    public create(request: HandlerRequest, newResource: RawResource, callback: callbackErrOrResult<any>): void;
    public delete(request: HandlerRequest, callback: callbackErrOrNull): void;
    public update(request: HandlerRequest, partialResource: RawResource, callback: callbackErrOrResult<any>): void;
    public chain(handler: Handler): this;
  }

  export interface Handler {
    /**
     * Property indicating the handler is ready to process requests.
     * The ready property should be set to a truthy value once the handler is ready to process requests (which will usually happen at the end of initialise).
     * If the handler is temporarily unable to process requests this property should be set to a falsy value during the down period.
     */
    ready: boolean;
    /**
     * When jsonapi-server loads, this is invoked once for every resource using this handler.
     * Its an opportunity to allocate memory, connect to databases, etc.
     * @param resourceConfig - the complete configuration object passed in to jsonApi.define().
     */
    initialise(resourceConfig: Schema): void;
    /**
     * For cleaning up upon jsonApi.close() (optional)
     */
    close?(): void;
    /**
     * Search for a list of resources, given a resource type.
     * @param request
     * @param callback
     */
    search(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    /**
     * Find is invoked with a request object
     * @param request
     * @param callback
     */
    find(request: HandlerRequest, callback: callbackErrOrResult<[any]>): void;
    /**
     * @param request
     * @param newResource
     * @param callback
     */
    create(request: HandlerRequest, newResource: RawResource, callback: callbackErrOrResult<any>): void;
    delete(request: HandlerRequest, callback: callbackErrOrNull): void;
    update(request: HandlerRequest, partialResource: RawResource, callback: callbackErrOrResult<any>): void;
  }

  type callbackErrOrResult<T> = (err: Error | null, result: T) => void;
  type callbackErrOrNull = (err: Error | null) => void;
}
