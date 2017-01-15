export interface Options {
  pagination: {
    limit: number;
  };
}

export interface PaginationParams {
  limit: string;
  offset: string;
  [key: string]: string;
}

export interface FetchJsonApiOptions {
  include: string[];
  fields: {[key: string]: string};
  sort: string[];
  page: PaginationParams;
  filter: {
    like: {[key: string]: string},
    not: {[key: string]: string},
    lt: {[key: string]: string},
    lte: {[key: string]: string},
    gt: {[key: string]: string},
    gte: {[key: string]: string}
  };
}

export interface JsonApiQueryParams {
  resourceType: string;
  identifier: string;
  relationships: boolean;
  relationshipType: string;
  queryData: FetchJsonApiOptions;
}
