import {readonly} from "core-decorators";
import {nonenumerableTS} from "./nonenumerable-ts.decorator";
import Model from "./model";

export class Job extends Model<Job> {
  JOB_ID: string = null;
  JOB_TITLE?: string = null;
  MIN_SALARY?: number = null;
  MAX_SALARY?: number = null;
  @readonly
  @nonenumerableTS
  fk? = 'JOB_ID';
  @readonly
  @nonenumerableTS
  tableName? = 'hr.jobs';

  constructor(job: Job) {
    super();
    Object.assign(this, job);
    super.init();
  }

  update?() {
    const set = this.enums
      // fk не обнавлять
      .filter(key => key !== this.fk)
      .map(key=> ` ${key} = :${key} `)
      .join();
    return `
      update HR.jobs
        set ${set}
        WHERE JOB_ID = :JOB_ID
    `
  }
}
