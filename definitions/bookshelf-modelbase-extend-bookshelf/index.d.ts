// import {ModelBase, Collection, SaveOptions, DestroyOptions, FetchOptions} from "bookshelf";
// import * as BlueBird from "bluebird";
//
// declare module "a" {
//   export interface Model<T extends Model<any>> extends ModelBase<T> {
//     /**
//      * Naive add - create and save a model based on data
//      * @param {Object} data
//      * @param {SaveOptions} options (optional)
//      * @return {Promise(Model)} single Model
//      */
//     create(data: any, options?: SaveOptions): BlueBird<T>;
//
//     /**
//      * Naive destroy
//      * @param {DestroyOptions} options
//      * @return {Promise(Model)} empty Model
//      */
//     destroy(options?: DestroyOptions): BlueBird<T>;
//
//     /**
//      * Naive findAll - fetches all data for `this`
//      * @param {FetchOptions} options (optional)
//      * @return {Promise(Collection)} Bookshelf Collection of all Models
//      */
//     findAll(options?: FetchOptions): BlueBird<Collection<T>>;
//
//     /**
//      * Find a model based on it's ID
//      * @param {String} id The model's ID
//      * @param {FetchOptions} [options] Options used of model.fetch
//      * @return {Promise(Model)}
//      */
//     findById(id: string, options?: FetchOptions): BlueBird<T>;
//
//     /**
//      * Naive findOne - fetch data for `this` matching data
//      * @param {Object} data
//      * @param {FetchOptions} options (optional)
//      * @return {Promise(Model)} single Model
//      */
//     findOne(data: any, options?: FetchOptions): BlueBird<T>;
//
//     /**
//      * Find or create - try and find the model, create one if not found
//      * @param {Object} data
//      * @param {FetchOptions & SaveOptions} options
//      * @return {Promise(Model)} single Model
//      */
//     findOrCreate(data: any, options?: FetchOptions & SaveOptions): BlueBird<T>;
//
//     /**
//      * Naive update - update a model based on data
//      * @param {Object} data
//      * @param {FetchOptions & SaveOptions} options
//      * @return {Promise(Model)} edited Model
//      */
//     update(data: any, options?: FetchOptions & SaveOptions): BlueBird<T>;
//
//     /**
//      * Upsert - select a model based on data and update if found, insert if not found
//      * @param {Object} selectData Data for select
//      * @param {Object} updateData Data for update
//      * @param {Object} [options] Options for model.save
//      * @return {Promise(Model)} edited Model
//      */
//     upsert(selectData: any, updateData: any, options?: SaveOptions): BlueBird<T>;
//   }
// }
