import {Response, NextFunction} from "express";
import {RequestJsonApiParams} from "../interfaces/requestJsonApiParams";
import {BaseRoute} from "./baseRoute";
import {Login} from "../models/login";

export class UsersRoute extends BaseRoute {
  constructor(route: string) {
    super(route);
    this.router.get("/", this.getUsers);
  }

  public getUsers = async(req: RequestJsonApiParams, res: Response, next: NextFunction) => {
    console.log(req.jsonApiParams);
    const result = await new Login().findMany(req.jsonApiParams, this.route);
    res.send(BaseRoute.mapper.map(result, this.route));
  }

  // public getAvatars = async(req: RequestJsonApiParams, res: Response, next: NextFunction) => {
  //   const result = await new AvatarsList().findMany(req.jsonApiParams);
  //   res.send(BaseRoute.mapper.map(result, this.route));
  // }
  //
  // public getAvatar = async(req: RequestJsonApiParams, res: Response, next: NextFunction) => {
  //   const id = req.params.id;
  //   const result = await new AvatarsList().findOne(id, req.jsonApiParams);
  //   res.send(BaseRoute.mapper.map(result, this.route));
  // }
}
