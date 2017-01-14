import {Request} from "express";

export interface JsonApiParamsRequest extends Request {
  jsonApiParams: {
    resourceType: string;
    identifier: string;
    relationships: boolean;
    relationshipType: string;
    queryData: {
      include: [string];
      fields: {[key: string]: string},
      sort: [string];
      page: {[key: string]: string},
      filter: {
        like: {[key: string]: string},
        not: {[key: string]: string},
        lt: {[key: string]: string},
        lte: {[key: string]: string},
        gt: {[key: string]: string},
        gte: {[key: string]: string}
      }
    }
  };
}
