import {Collection} from "bookshelf";
import {bookshelf} from "../libs/database";
import {Avatars} from "./avatars";

export class Login extends bookshelf.Model<Login> {
  get tableName() {
    return "login";
  }

  public avatars(): Collection<Avatars> {
    return this.hasMany(Avatars, "idUser");
  }
}
