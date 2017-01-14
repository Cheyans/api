import {BaseModel} from "./baseModel";

export class Avatars extends BaseModel<Avatars> {
  public get tableName(): string {
    return "avatars";
  }
}
