
import {Connection, createConnection} from 'typeorm';
import 'reflect-metadata';
import {User} from "../model/user";
import {UserRight} from "../model/user-right";
import {DiffNetLocation} from "../model/diff-net-location.model";
import {CONFIG} from "./main-config";
import {DictUserRight} from "../model/dict-user-right";
import {DiffNetField} from "../model/diff-net-field.model";
import {IDiffNetField} from "../model/diff-net-field.interface";
import {DiffNetSet} from "../model/diff-net-set.model";
import {Company} from "../model/company";
import {DiffNetSetView} from "../model/diff-net-set.view.model";
import {News} from "../model/news";

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
      Company, News,

      // existed edi-gui-sbr
      DiffNetLocation, DiffNetField, DiffNetSet,

      // dicts
      DictUserRight,

      // вьюшки
      DiffNetSetView,
    ],
    synchronize: true,
    logging: ['query']
  }).then((_connection: Connection) => {
    //console.log(_connection);

    connection = _connection;
    return connection
  })
}
