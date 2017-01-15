import {Response, NextFunction} from "express";
import {AvatarsList} from "../models/avatarsList";
import {RequestJsonApiParams} from "../interfaces/requestJsonApiParams";
import {BaseRoute} from "./baseRoute";
import {handleNotFoundIfNecessary} from "../libs/utils/jsonApi";

export class AvatarsRoute extends BaseRoute {
  constructor(route: string) {
    super(route);
    this.router.get("/", this.getAvatars);
    this.router.get("/:id", this.getAvatar);
  }

  public getAvatars = async(req: RequestJsonApiParams, res: Response, next: NextFunction) => {
    const result = await new AvatarsList().findMany(req.jsonApiParams);
    res.send(AvatarsList.mapper.map(result, this.route));
  }

  public getAvatar = async(req: RequestJsonApiParams, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await new AvatarsList().findOne(id, req.jsonApiParams);
    if (handleNotFoundIfNecessary(this.route, result, next)) { return; }
    res.send(AvatarsList.mapper.map(result, this.route));
  }
}
