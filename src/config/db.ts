
import {Connection, createConnection} from 'typeorm';
import 'reflect-metadata';
import {User} from "../model/user";
import {UserRight} from "../model/user-right";
import {DiffNetLocation} from "../model/diff-net-location.model";
import {CONFIG} from "./main-config";
import {DictUserRight} from "../model/dict-user-right";

export let connection: Connection = null;


export function startDb () {
  return createConnection({
    name: CONFIG.mainConnectionName,
    type: 'oracle',
    host: '172.17.230.107',
    port: 1521,
    username: 'edi',
    password: 'edi#007',
    sid: 'tstsfera',
    entities: [
      User, UserRight,

      // existed edi-gui-sbr
      DiffNetLocation,

      // dicts
      DictUserRight,
    ],
    synchronize: true,
    logging: ['query']
  }).then((_connection: Connection) => {
    //console.log(_connection);

    connection = _connection;
    return connection
  })
}
