import * as JsonApiQueryParser from "jsonapi-query-parser";
import {Request, Response, NextFunction} from "express";
import {JsonApiParamsRequest} from "../../interfaces/jsonApiParamsRequest";

const jsonApiQueryParser = new JsonApiQueryParser();

export function middleware(req: Request, res: Response, next: NextFunction) {
  (<JsonApiParamsRequest> req).jsonApiParams = jsonApiQueryParser.parseRequest(req.url);
  next();
}
