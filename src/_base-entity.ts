import {
  BaseEntity,
  BeforeInsert,
  createQueryBuilder,
  FindConditions,
  FindManyOptions, FindOneOptions, getRepository, ObjectType,
} from "typeorm";
import {__} from "./globals";
import {CONFIG} from "./config/main-config";

interface FindOneCond<T> {
  where?: FindOneOptions<T>['where']
  conditions?: FindConditions<T>,
  select?: (keyof T)[]
}

export class _BaseEntity extends BaseEntity {
  id: number;
  repo = getRepository(this.constructor.name, CONFIG.mainConnectionName);


  @BeforeInsert()
  async setId() {
    const rowWithMax = await this.repo.query(`SELECT MAX("id") AS max from "${this.repo.metadata.tablePath}"`);
    this.id = (rowWithMax[0].MAX || 0) + 1;
  }


  static _findById<T/* extends BaseEntity*/>(id: number | string, select?: FindManyOptions<T> | FindConditions<T>): Promise<T/* | BaseEntity*/> {
    return <any>this.findByIds([id], <any>select).then(rows => __.isFilledArray(rows) ? rows[0] : null)
  }

  static  _findOne<T extends BaseEntity>(options: FindManyOptions<T> | FindConditions<T>): Promise<T | undefined> {
     return this.find<T>(<any>options).then(rows => __.isFilledArray(rows) ? rows[0] : undefined)
  }
  static  __findOne<T/* extends BaseEntity*/>({where, select}: FindOneCond<T>, raw = true) {

     // this.name это имя модели
     const qb = createQueryBuilder(this.name, undefined, CONFIG.mainConnectionName)
         .where(where);
     if(select) qb.select(<string[]>select.map(s=> `${this.name}.${s}`));
     // по сути получается запрос без лимита и вытащит все записи из бд, но тогда вопрос какого фига селектится не уникальная запись?
     return raw ? qb.getRawOne() : qb.getOne();
     //const qP = qb.getQueryAndParameters();
     //return this.query(qP[0].replace('FETCH NEXT 1 ROWS ONLY', 'заменить на аналог для v11'),qP[1])
  }
}

