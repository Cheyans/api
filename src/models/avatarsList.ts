import {Collection} from "bookshelf";
import {BaseModel} from "./baseModel";
import {Login} from "./login";

export class AvatarsList extends BaseModel<AvatarsList> {
  public get tableName() {
    return "avatars_list";
  }

  public users(): Collection<Login> {
    return this.belongsToMany(Login, "avatars", "idUser", "idAvatar");
  }
}
