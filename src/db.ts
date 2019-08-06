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

});
