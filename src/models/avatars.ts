import {BaseModel} from "./baseModel";
import {Login} from "./login";
import {Collection} from "bookshelf";

export class Avatars extends BaseModel<Avatars> {
  public get tableName(): string {
    return "avatars";
  }
  //
  // public logins(): Collection<Login> {
  //   return this.belongsToMany(Login, "avatars_list", "idUser");
  // }
}
