import {Response, NextFunction} from "express";
import {AvatarsList} from "../models/avatarsList";
import {RequestJsonApiParams} from "../interfaces/requestJsonApiParams";
import {BaseRoute} from "./baseRoute";

export class AvatarsRoute extends BaseRoute {
  constructor(route: string) {
    super(route);
    this.router.get("/", this.getAvatars);
    this.router.get("/:id", this.getAvatar);
  }

  public getAvatars = async(req: RequestJsonApiParams, res: Response, next: NextFunction) => {
    const result = await new AvatarsList().findMany(req.jsonApiParams, "avatars");
    res.send(BaseRoute.mapper.map(result, this.route));
  }

  public getAvatar = async(req: RequestJsonApiParams, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await new AvatarsList().findOne(id, req.jsonApiParams);
    res.send(BaseRoute.mapper.map(result, this.route));
  }
}
