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

  update?() {
    // иначе в js попадет знак вопроса
    return
  }

  getModel?() {
    let ret = {};
    this.enums.map((key) => ret[<string>key] = this[<string>key]);
    return ret
  }

  async save?(db) {
    await db.execute(
      this.update(),
      this.getModel()
    );
    return db.execute(`SELECT *
       FROM ${this.tableName}
       WHERE ${this.fk} = :${this.fk}`, {[this.fk]: this[<any>this.fk]})
  }

}