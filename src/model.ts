import {nonenumerableTS} from "./nonenumerable-ts.decorator";
import {readonly} from "core-decorators";

export default class Model<T> {
  @readonly
  @nonenumerableTS
  fk?;
  @nonenumerableTS
  enums?: (keyof T)[];
  @readonly
  @nonenumerableTS
  tableName?: string;

  init?() {
    this.enums = <(keyof T)[]>Object.keys(this);
  }

  getModel?() {
    let ret = {};
    this.enums.map((key) => ret[<string>key] = this[<string>key]);
    return ret
  }

  async save?(db) {
    await db.execute(
      this.updateQuery(),
      this.getModel()
    );
    return this.getOneByFK(db);
  }

  updateQuery?() {
    const set = this.enums
    // fk не обнавлять
      .filter(key => key !== this.fk)
      .map(key => ` ${key} = :${key} `)
      .join();
    return `UPDATE ${this.tableName} SET ${set} WHERE ${this.fk} = :${this.fk}`
  }

  insertQuery?() {
    const values = this.enums
      .map(key => `${key}`)
      .join();
    const set = this.enums
      .map(key => `:${key}`)
      .join();
    return `INSERT INTO ${this.tableName}(${values}) VALUES(${set})`
  }

  async insert?(db) {
    console.log(this.insertQuery(),this.getModel());

    const row = await db.execute(
      this.insertQuery(),
      this.getModel()
    );
    console.log("888",row);


  }

  getOneByFK?(db) {
    return db.execute(`SELECT *
       FROM ${this.tableName}
       WHERE ${this.fk} = :${this.fk}`, {[this.fk]: this[<any>this.fk]});
  }

}