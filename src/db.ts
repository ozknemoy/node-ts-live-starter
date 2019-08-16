
import {createConnection} from 'typeorm';
import 'reflect-metadata';
import {Job} from './_job.model';


export function startDb () {
  return createConnection({

    type: 'oracle',
    host: 'localhost',
    port: 1521,
    username: 'system',
    password: '15646nemoY',
    sid: 'orcl.esphere.local',
    entities: [
      Job
    ],
    synchronize: true,
    logging: ['query']
  })
}
