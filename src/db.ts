import {Job} from "./job.model";


const oracledb = require('oracledb');


oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

async function transac(callback) {
  console.time('1');
  let db;
  try {
    db = await oracledb.getConnection({
        user: 'system',
        password: '15646nemoY',
        connectString: 'localhost/orcl.esphere.local',
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
  /*const result = await db.execute(
    `SELECT *
       FROM jobs
       WHERE JOB_ID = :JOB_ID`,
    {JOB_ID: 'PU_MAN'}
  );*/
  const JobEditedRow = new Job({
    JOB_ID: 'qwert',
    MIN_SALARY: 1114,
    JOB_TITLE: 'President3',
    MAX_SALARY: 40003
  });
  const up = await JobEditedRow.insert(db);
  console.log(up);

});
