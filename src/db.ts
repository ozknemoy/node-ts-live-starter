
import {Connection, createConnection} from 'typeorm';
import 'reflect-metadata';
import {Job} from "./model/_job.model";
import {User} from "./model/user";
import {UserRight} from "./model/user-right";
import {DiffNetLocation} from "./model/diff-net-location.model";

export let connection: Connection;

export function startDb () {
  return createConnection({
    type: 'oracle',
    host: '172.17.230.107',
    port: 1521,
    username: 'edi',
    password: 'edi#007',
    sid: 'tstsfera',
    entities: [
      Job, User, UserRight,

      // existed edi-gui-sbr
      DiffNetLocation
    ],
    synchronize: true,
    logging: ['query']
  }).then((_connection: Connection) => {
    //console.log(_connection);

    connection = _connection;
    return connection
  })
}
