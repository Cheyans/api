import {Collection} from "bookshelf";
import {BaseModel} from "./baseModel";
import {AvatarsList} from "./avatarsList";

export class Login extends BaseModel<Login> {
  public hidden = ["password", "ip", "steamid", "email"];

  get tableName() {
    return "login";
  }

  public avatarsList(): Collection<AvatarsList> {
    return this.belongsToMany(AvatarsList, "avatarsList", "idUser", "idAvatar");
  }
}
