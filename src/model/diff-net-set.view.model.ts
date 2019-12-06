import {Entity, Column, PrimaryColumn, BeforeUpdate, ManyToOne, JoinColumn, SaveOptions, RemoveOptions,} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {IDiffNetLocation} from "./diff-net-location.interface";
import {CONFIG} from "../config/main-config";
import {IsDefined, IsEmail, IsEmpty, IsNotEmpty, MaxLength} from "class-validator";
import {IsUnique} from "../validator/is-unique";
import {__} from "../util/__.util";
import {IBackFields} from "./diff-nets-set.model";
import {BooleanOracleTransformer} from "../transformer/boolean-oracle.transformer";
import {User} from "./user";
import {DiffNetField} from "./diff-net-field.model";
import {Company} from "./company";
import {DiffNetLocation} from "./diff-net-location.model";
import {ICompany} from "./company.interface";
import {DiffNetSet} from "./diff-net-set.model";

@Entity({
  name: 'DICT_SETS_UI_SETS_VW',
  synchronize: /*не вздумай ставить true*/false,
  database: CONFIG.secondSchema,
})
export class DiffNetSetView extends DiffNetSet implements IBackFields {

  save(options?: SaveOptions): Promise<this> {
    return Promise.reject('Нельзя делать это во вьюхе')
  }
  remove(options?: RemoveOptions): Promise<this> {
    return Promise.reject('Нельзя делать это во вьюхе')
  }
  getSeqNameAddress() {
    return ''
  }
  getSeqName() {
    return ''
  }
  @Column({name: 'FIELD_CODE', nullable: true})
  propName: string = null;

  @Column({name: 'SELLER_NAME'})
  sellerName?: string = null;

  @Column({name: 'LOCATION_CODE'})
  location: string = null;

  @Column({name: 'BUYER_NAME'})
  buyerName: string = null;

  @Column({name: 'FIELD_CODE_VIEW'})
  codeView?: string = null;
}

