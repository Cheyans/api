declare module "bookshelf-jsonapi-params" {
  import {Options} from "../bookshelf-jsonapi-params-static/index";

  function BookshelfJsonApiParams(options: Options): any;

  namespace BookshelfJsonApiParams {} // TODO: namespace hack is ugly, not sure how to fix this due to module structure
  export = BookshelfJsonApiParams;
}
