import * as JsonApiQueryParser from "jsonapi-query-parser";
import {Request, Response, NextFunction} from "express";
import {RequestJsonApiParams} from "../../interfaces/requestJsonApiParams";
import {BadRequest} from "../errors/client/badRequest";
import {PaginationParams} from "../../../definitions/bookshelf-jsonapi-params-static/index";

const jsonApiQueryParser = new JsonApiQueryParser();

export function queryParser(req: Request, res: Response, next: NextFunction) {
  const jsonApiQueryParams = jsonApiQueryParser.parseRequest(req.url).queryData;
  const badRequest = verifyPaginationQueryParams(jsonApiQueryParams.page);
  if (badRequest) {
    next(badRequest);
  } else {
    (<RequestJsonApiParams> req).jsonApiParams = jsonApiQueryParams;
    next();
  }
}

function verifyPaginationQueryParams(pageParams: PaginationParams): BadRequest | false {
  const supportedKeys = ["offset", "limit"];
  const unknownKey = Object.keys(pageParams).find((param) => supportedKeys.indexOf(param) < 0);
  const invalidValue = Object.keys(pageParams).find((param) => {
    const parsedValue = Number(pageParams[param]);
    return isNaN(parsedValue) || !Number.isInteger(parsedValue) || parsedValue > 1000 || parsedValue < 1;
  });

  if (unknownKey) {
    return new BadRequest("Unknown pagination key", {parameter: unknownKey});
  } else if (invalidValue) {
    return new BadRequest("Invalid value", {parameter: invalidValue});
  }
  return false;
}
