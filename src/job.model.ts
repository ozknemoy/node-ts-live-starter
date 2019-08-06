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
  fk?: keyof this = 'JOB_ID';

  constructor(job: Job) {
    super();
    Object.assign(this, job);
    super.init();
  }

  update?() {
    const set = this.enums.map(key=> ` ${key} = :${key} `).join();
    console.log('set',set);
    return `
      update HR.jobs
        set ${set}
        WHERE JOB_ID = :JOB_ID
    `
  }
}
