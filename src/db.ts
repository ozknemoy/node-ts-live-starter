import {nonenumerable, readonly} from "core-decorators";
import {Model} from "./model";

var sworm = require('sworm');
var oracledb = require('oracledb');


oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
/*var db = sworm.db({
  driver: 'oracle',
  config: {
    user: 'system',
    password: '1564615646',
    connectString: 'localhost/XE',
    pool: true,
    options: {
      // options to set on `oracledb`
      maxRows: 1000
    },
    log: true
  }
});

var jobs = db.model({table: 'hr.jobs'});


db.connect(function () {
  // connected
  var ad_vp = jobs.get({job_id: 'AD_VP'});
  console.log(ad_vp);
  /!*return bob.save().then(function () {

  });*!/
}).then(function () {

  // disconnected

});*/
async function transac(callback) {
  console.time('1');
  let db;
  try {
    db = await oracledb.getConnection({
        user: 'system',
        password: '1564615646',
        connectString: 'localhost/XE',
      });
    return await callback(db);
  } catch (err) {
    console.error(err);
  } finally {
    console.timeEnd('1');
    if (db) {
      try {
        await db.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

transac(async (db) => {
  const result = await db.execute(
    `SELECT *
       FROM hr.jobs
       WHERE JOB_ID = :JOB_ID`,
    {JOB_ID: 'PU_MAN'}
  );
  const JobEditedRow = new Job({
    JOB_ID: 'qwer',
    MIN_SALARY: 111,
    JOB_TITLE: 'President',
    MAX_SALARY: 40000
  });
  const up = await JobEditedRow.save(db);
  /*const newRow = new Job({
    JOB_ID: 'qwertyuiop',
    JOB_TITLE: 'President',
    MAX_SALARY: 40000
  });
  await db.execute(`
      insert into HR.jobs
        values (:JOB_ID, :JOB_TITLE, :MIN_SALARY, :MAX_SALARY)
        
    `, newRow//returning JOB_ID, JOB_TITLE INTO v_a
  );*/
  console.log(up);
});

class Job extends Model<Job> {
  JOB_ID: string = null;
  JOB_TITLE?: string = null;
  MIN_SALARY?: number = null;
  MAX_SALARY?: number = null;
  @readonly
  @nonenumerable
  fk?: keyof this = 'JOB_ID';

  constructor(job: Job) {
    super();
    Object.assign(this, job);
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