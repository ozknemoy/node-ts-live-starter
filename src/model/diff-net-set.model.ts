import {Entity, Column, PrimaryColumn, BeforeUpdate, ManyToOne, JoinColumn,} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {IDiffNetLocation} from "./diff-net-location.interface";
import {CONFIG} from "../config/main-config";
import {IsDefined, IsEmail, IsEmpty, IsNotEmpty, IsNumberString, IsOptional, Max, MaxLength} from "class-validator";
import {IsUnique} from "../validator/is-unique";
import {__} from "../util/__.util";
import {IBackFields} from "./diff-nets-set.model";
import {BooleanOracleTransformer} from "../transformer/boolean-oracle.transformer";
import {User} from "./user";
import {DiffNetField} from "./diff-net-field.model";
import {Company} from "./company";
import {DiffNetLocation} from "./diff-net-location.model";
import {ICompany} from "./company.interface";

@Entity({
  name: 'DICT_SETS_UI_SETS',
  synchronize: false,
  database: CONFIG.secondSchema,
})
export class DiffNetSet extends _BaseEntity implements IBackFields {

  constructor(newEntity: IBackFields) {
    super();
    Object.assign(this, newEntity);
  }

  getSeqNameAddress() {
    return CONFIG.secondSchema + '.DICT_SETS_UI_SETS_SEQ'
  }

  getSeqName() {
    return 'DICT_SETS_UI_SETS_SEQ'
  }

  @PrimaryColumn({name: 'ID'})
  id: number = null;

  @Column({name: 'SELLER_ID', nullable: true})
  sellerId?: number = null;

  @ManyToOne(() => Company, com => com.sellerDNF)
  @JoinColumn({name: 'SELLER_ID'})
  seller: Company;

  @Column({name: 'BUYER_ID', nullable: true})
  buyerId?: number = null;

  @ManyToOne(() => Company, com => com.buyerDNF)
  @JoinColumn({name: 'BUYER_ID'})
  buyer: ICompany;

  @IsNotEmpty({message: __.constructErrorMessage('Тип документа')})
  @Column({name: 'DOC_TYPE_ID'})
  documentTypeId: number = null;

  @IsNotEmpty({message: __.constructErrorMessage('Поле')})
  @Column({name: 'FIELD_ID'})
  propId: number = null;

  @Column({name: 'FIELD_NAME', type: 'varchar2', length: 250})
  name: string = null;

  @IsNotEmpty({message: __.constructErrorMessage('Расположение')})
  @Column({name: 'LOCATION_ID', width: 9, type: 'number'})
  locationId: number = null;

  @ManyToOne(() => DiffNetLocation, f => f.dnf)
  @JoinColumn({name: 'LOCATION_ID'})
  locationRef: IDiffNetLocation;

  @Column({name: 'IS_DISPLAY', nullable: true, type: 'number', width: 1, default: 0, transformer: new BooleanOracleTransformer()})
  display: boolean = null;

  @Column({name: 'IS_REQUIRE', nullable: true, type: 'number', width: 1, default: 0, transformer: new BooleanOracleTransformer()})
  required: boolean = null;

  @IsOptional()
  @Max(9999, {message: __.constructErrorMaxLengthMessage('Длина', 4)})
  @Column({name: 'VALUE_SIZE', width: 4, type: 'number', nullable: true})
  maxLength?: number = null;

  @IsOptional()
  @Max(999, {message: __.constructErrorMaxLengthMessage('Порядковый номер', 3)})
  @Column({name: 'ORDINAL', type: 'number', width: 3, nullable: true})
  ordinal: number = null;

  @Column({name: 'UI_GROUP', type: 'varchar2', length: 100, nullable: true})
  group?: string = null;

  @Column({name: 'IS_XLS_READ_ONLY', nullable: true, type: 'number', width: 1, default: 0, transformer: new BooleanOracleTransformer()})
  xlsReadOnly: boolean = null;
}

