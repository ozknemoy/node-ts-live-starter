/**
 * Created by Vakarchuk.DM on 24.10.2017.
 */
import {connection} from "../config/db";
import {BaseEntity, Repository} from "typeorm";
import {DiffNetSet} from "../model/diff-net-set.model";

export interface ColumnsMap {name: string, alias: string}

class Connection {
  callFunctionProcedure(func: string, params?: any[]) {
    return connection.query(`SELECT ${func} from dual`, params)
  }

  getColumnsMap<T>(this: T, entity): ColumnsMap[]  {
    const repo: Repository<T> = entity.getRepository();
    return repo.metadata.columns.map(col => ({name: col.databaseName, alias: col.propertyAliasName}))
  }

  _getAlisesQuery(map: ColumnsMap[], tblAlias: string) {
    return map.map(f => ` "${tblAlias.toUpperCase()}"."${f.name}" AS "${f.alias}"`).join();
  }

  getAlisesQuery(entity, _tblAlias?: string) {
    // tblAlias должен быть в верхнем регистре даже если псевдоним таблицы в нижнем
    const tblAlias: string = _tblAlias || entity.name;
    return this._getAlisesQuery(this.getColumnsMap(entity), tblAlias);
  }

}

export let CONNECTION = new Connection();