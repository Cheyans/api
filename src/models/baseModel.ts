import {Database} from "../libs/database";
import {Model} from "bookshelf";
import {FetchJsonApiOptions} from "../../definitions/bookshelf-jsonapi-params-static/index";

export abstract class BaseModel<T extends Model<T>> extends Database.Instance.bookshelf.Model<T> {
  public abstract get tableName(): string

  // TODO: determine how to define this so we can do preemptive json api query param verification
  // One possibility is https://github.com/bogus34/bookshelf-schema
  // protected abstract schema: {[key: string]: string | number | Date |

  public async findMany(options: FetchJsonApiOptions, type?: string) {
    return this.fetchJsonApi(options, true, type);
  }

  public async findOne(id: number, options: FetchJsonApiOptions, type?: string) {
    return this.where({id}).fetchJsonApi({...options, require: true}, false, type);
  }
}
