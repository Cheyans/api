import {Response, NextFunction} from "express";
import {AvatarsList} from "../models/avatarsList";
import {JsonApiParamsRequest} from "../interfaces/jsonApiParamsRequest";
import {BaseRoute} from "./baseRoute";

export class AvatarsRoute extends BaseRoute {
  constructor(route: string) {
    super(route);
    this.router.get("/", this.getAvatars);
  }

  public getAvatars = async (req: JsonApiParamsRequest, res: Response, next: NextFunction) => {
    const result = await new AvatarsList().fetchJsonApi(req.jsonApiParams);
    res.send(AvatarsList.mapper.map(result, this.route));
  }
}
