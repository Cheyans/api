import {Collection} from "bookshelf";
import {Avatars} from "./avatars";
import {BaseModel} from "./baseModel";

export class AvatarsList extends BaseModel<Avatars> {
  public get tableName() {
    return "avatars_list";
  }

  public avatars(): Collection<Avatars> {
    return this.hasMany(Avatars, "idAvatar");
  }
}
