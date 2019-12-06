import {Entity, Column, PrimaryColumn, BeforeUpdate,} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {IDiffNetLocation} from "./diff-net-location.interface";
import {CONFIG} from "../config/main-config";
import {IsDefined, IsEmail, IsEmpty, IsNotEmpty, MaxLength} from "class-validator";
import {IsUnique} from "../validator/is-unique";
import {__} from "../util/__.util";
import {IDiffNetField} from "./diff-net-field.interface";

@Entity({
  name: 'DICT_SETS_UI_FIELDS',
  synchronize: false,
  database: CONFIG.secondSchema,
})
export class DiffNetField extends _BaseEntity implements IDiffNetField {

  constructor(newF: IDiffNetField) {
    super();
    Object.assign(this, newF)
  }

  getSeqNameAddress() {
    return CONFIG.secondSchema + '.DICT_SETS_UI_FIELDS_SEQ'
  }

  getSeqName() {
    return 'DICT_SETS_UI_FIELDS_SEQ'
  }

  @PrimaryColumn({name: 'ID'})
  id: number;

  @IsUnique({message: __.constructErrorNotUniqueMessage('Название')})
  @IsNotEmpty({message: __.constructErrorMessage('Название')})
  @MaxLength(50, {message: __.constructErrorMaxLengthMessage('Название', 50)})
  @Column({name: 'CODE', length: 50, unique: true})
  code: string;

  @MaxLength(100, {message: __.constructErrorMaxLengthMessage('Описание', 100)})
  @Column({name: 'NAME', length: 100})
  name: string;

  @MaxLength(50, {message: __.constructErrorMaxLengthMessage('Название представления', 50)})
  @Column({name: 'CODE_VIEW', length: 50, nullable: true})
  codeView: string;

}

