import {readonly} from "core-decorators";
import {nonenumerableTS} from "./nonenumerable-ts.decorator";
import Model from "./model";

/*CREATE TABLE jobs
(
  JOB_ID VARCHAR(10) PRIMARY KEY NOT NULL,
  JOB_TITLE VARCHAR(60),
  MIN_SALARY INT,
  MAX_SALARY INT
);*/

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
  tableName? = 'jobs';

  constructor(job: Job) {
    super();
    Object.assign(this, job);
    super.init();
  }

}
