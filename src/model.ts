import {nonenumerable} from "core-decorators";

export class Model<T> {

  @nonenumerable
  fk?;
  //https://github.com/jayphelps/core-decorators#nonenumerable
  @nonenumerable
  enums?: (keyof T)[];

  constructor() {
    this.enums = <(keyof T)[]>Object.keys(this)
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

  /*enums?() {
    return
  }*/

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