import {Entity, Column, PrimaryColumn} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {BooleanOracleTransformer} from "../transformer/boolean-oracle.transformer";
import {INews} from "./news.interface";
import {TimestampToDateOracleTransformer} from "../transformer/timestamp-date-oracle.transformer";

@Entity({
  name: 'DAT_NEWS',
  synchronize: false,
})
export class News extends _BaseEntity implements INews {

  constructor(newEntity: INews) {
    super();
    if(newEntity) Object.assign(this, newEntity)
  }

  getSeqNameAddress() {
    return 'SEQ_NEWS_ID'
  }

  @PrimaryColumn({name: 'NEWS_ID'})
  id: number;

  @Column({name: 'NEWS_DATE', type: 'timestamp', transformer: new TimestampToDateOracleTransformer()})
  date: number;

  @Column({name: 'NEWS_TITLE', type: 'varchar2', length: 255})
  title: string;

  @Column({name: 'NEWS_BODY', type: 'clob'})
  body: string;

  @Column({name: 'SENDER_ID'})
  senderId: number;

}


