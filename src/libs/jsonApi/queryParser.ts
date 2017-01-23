import * as JsonApiQueryParser from "jsonapi-query-parser";
import {Request, Response, NextFunction} from "express";
import {RequestJsonApiParams} from "../../interfaces/requestJsonApiParams";
import {BadRequest} from "../errors/client/badRequest";
import {PaginationParams} from "../../../definitions/bookshelf-jsonapi-params-static/index";
import {BaseError} from "../errors/baseError";

const jsonApiQueryParser = new JsonApiQueryParser();

export function queryParser(req: Request, res: Response, next: NextFunction) {
  const jsonApiQueryParams = jsonApiQueryParser.parseRequest(req.url).queryData;
  const badRequest = getPaginationErrorsIfAny(jsonApiQueryParams.page);
  if (badRequest.length > 0) {
    next(badRequest);
  } else {
    (<RequestJsonApiParams> req).jsonApiParams = jsonApiQueryParams;
    next();
  }
}

function getPaginationErrorsIfAny(pageParams: PaginationParams): BadRequest[] {
  const supportedKeys = ["offset", "limit"];
  const pageParamKeys = Object.keys(pageParams);
  let errors: BaseError[] = [];

  pageParamKeys.forEach((param) => {
    if (supportedKeys.indexOf(param) < 0) {
      errors.push(new BadRequest("Unknown pagination key", {parameter: param}));
    }
  });
  pageParamKeys.forEach((param) => {
    const parsedValue = Number(pageParams[param]);
    if (isNaN(parsedValue) || !Number.isInteger(parsedValue) || parsedValue > 1000 || parsedValue < 1) {
      errors.push(new BadRequest("Invalid value", {parameter: param}));
    }
  });

  return errors;
}
