import {
  BaseEntity,
  BeforeInsert,
  createQueryBuilder,
  FindConditions,
  FindManyOptions, FindOneOptions, getRepository, ObjectType, SaveOptions,
} from "typeorm";
import {__} from "../util/globals";
import {CONFIG} from "../config/main-config";

interface FindOneCond<T> {
  where?: FindOneOptions<T>['where']
  conditions?: FindConditions<T>,
  select?: (keyof T)[]
}

export class _BaseEntity extends BaseEntity {
  id: number;

  get repo() {
    return getRepository(this.constructor.name, CONFIG.mainConnectionName);
  }

  @BeforeInsert()
  async setId() {
    //const rowWithMax = await this.repo.query(`SELECT MAX("id") AS max from "${this.repo.metadata.tablePath}"`);
    let seq: {NEXTVAL: number}[];
    try {
      seq = await this.repo.query(`SELECT ${this.getSeqNameAddress()}.NEXTVAL FROM all_sequences WHERE sequence_name = '${this.getSeqName()}'`);
    } catch(e) {
      // если последовательность не создана, создаю
      seq = await this.createSequenceForTableId();
    }
    this.id = seq[0].NEXTVAL;
  }

  getSeqNameAddress() {
    return 'SEQ_ID_' + this.repo.metadata.tableName.toUpperCase()
  }

  getSeqName() {
    // для другой схемы это отлично от getSeqNameAddress
    return this.getSeqNameAddress()
  }

  async createSequenceForTableId() {
    // вытаскиваю максимальный id из уже существующей таблички на случай если например sequence был удален а таблиза уже заполнена
    const rowWithMax = await this.repo.query(`SELECT MAX("id") AS MAX from "${this.repo.metadata.tablePath}"`);
    const NEXTVAL = (rowWithMax[0].MAX || 0) + 1;
    this.repo.query(`create sequence ${this.getSeqNameAddress()} start with ${NEXTVAL} increment by 1`);
    return [{NEXTVAL}];
  }

  static _findById<T/* extends BaseEntity*/>(id: number | string, select?: FindManyOptions<T> | FindConditions<T>): Promise<T> {
    return <any>this.findByIds([id], <any>select).then(rows => __.isFilledArray(rows) ? rows[0] : null)
  }

  static  _findOne<T extends BaseEntity>(options: FindManyOptions<T> | FindConditions<T>, raw = true): Promise<T | undefined> {
     return this.find<T>(<any>options).then(rows => this.handleOneRowFromArray(rows, raw))
  }
  static  __findOne<T/* extends BaseEntity*/>({where, select}: FindOneCond<T>, raw = true) {

     // this.name это имя модели
     const qb = createQueryBuilder(this.name, undefined, CONFIG.mainConnectionName)
       .select()
         .where(where);
     if(select) {
       // todo не работает как ожтдается qb.select() не чистит изначальные aliases ;// удаляю изначальный
       select.map(s=> qb.addSelect(`${this.name}.${s}`, <string>s));
     }
     // по сути получается запрос без лимита и вытащит все записи из бд, но тогда вопрос какого фига селектится не уникальная запись?
     return raw ? qb.getRawOne() : qb.getOne();
     //const qP = qb.getQueryAndParameters();
     //return this.query(qP[0].replace('FETCH NEXT 1 ROWS ONLY', 'заменить на аналог для v11'),qP[1])
  }

  static _find<T extends BaseEntity>(options?: FindManyOptions<T> | FindConditions<T>, raw = true): Promise<T[]> {
    return this.find<T>(<any>options).then(rows => this.handleRows(rows, raw))
  }

  /*static async _saveAll<T extends BaseEntity>(entities: T[], options?: SaveOptions): Promise<T[]> {
    /!*for await (let num of options) {
      console.log(num);
    }*!/
    return Promise.all(entities.map(async (ent) => await this.save<T>(ent, options)))
  }*/

  static handleRows(rows: any[], raw: boolean) {
    return rows;
  }

  static handleOneRowFromArray(rows: any, raw: boolean) {
    return __.isFilledArray(rows) ? rows[0] : rows;
  }

}

