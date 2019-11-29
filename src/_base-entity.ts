import {BaseEntity, BeforeInsert, Entity, FindConditions, FindManyOptions, ObjectType} from "typeorm";
import {__} from "./globals";
import {connection} from "./db";


export class _BaseEntity extends BaseEntity {
  id: number;
  repo;

  @BeforeInsert()
  async setId() {
    const rowWithMax = await this.repo.query(`SELECT MAX(id) AS max from ${this.repo.metadata.tablePath}`);
    this.id = (rowWithMax[0].MAX || 0) + 1;
  }


  static findById<T/* extends BaseEntity*/>(id: number | string, select?: FindManyOptions<T> | FindConditions<T>): Promise<T/* | BaseEntity*/> {
    return <any>this.findByIds([id], <any>select).then(rows => __.isFilledArray(rows) ? rows[0] : null)
  }

  // SELECT "User"."id" AS "User_id", "User"."login" AS "User_login", "User"."password" AS "User_password", "User"."admin" AS "User_admin" FROM "a_user" "User" WHERE "User"."login" = :where_0_0_0 FETCH NEXT 1 ROWS ONLY -- PARAMETERS: ["nemoy"]
   static  _findOne<T extends BaseEntity>({where/*: Partial<T>*/}) {
     /*console.log("++++++++++++++++++++");
     
      connection.createQueryBuilder().getOne().then((one)=>console.log(one));*/




     return;

    /*return connection.query(
      `SELECT *
   FROM ${this.repo.metadata.tablePath}
   WHERE department_id = :did`,
      [180]

    ).then(resp => resp.rows);*/
    /*return this.query(`SELECT *
       FROM ${this.tableName}
       WHERE ${this.fk} = :${this.fk}`, {[this.fk]: this[<any>this.fk]});*/
  }
}

