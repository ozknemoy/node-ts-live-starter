import {nonenumerableTS} from "./nonenumerable-ts.decorator";
import {readonly} from "core-decorators";

export default class Model<T> {
  @readonly
  @nonenumerableTS
  fk?;
  @nonenumerableTS
  enums?: (keyof T)[];

  init?() {
    this.enums = <(keyof T)[]>Object.keys(this);
  }

  update?() {
    // иначе в js попадет знак вопроса
    return
  }

  clean?(keys: (keyof T)[]) {
    let ret = {};
    keys.map((key) => ret[<string>key] = this[<string>key]);
    return ret
  }

  async save?(db) {
    await db.execute(
      this.update(),
      this.enums
    );
    return db.execute(`SELECT *
       FROM hr.jobs
       WHERE ${this.fk} = :JOB_ID`, {[this.fk]: this[<any>this.fk]})
  }

}