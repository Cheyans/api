import {Schema} from "joi";

declare module "joi" {
  export interface BelongsToRelation {
    resource: string;
    as: string;
  }

  export function one(resource: string): Schema;
  export function many(resource: string): Schema;
  export function belongsToMany(relation: BelongsToRelation): Schema;
  export function belongsToOne(relation: BelongsToRelation): Schema;
}
