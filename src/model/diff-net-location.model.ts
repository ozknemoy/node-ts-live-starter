import {Entity, Column, PrimaryColumn, BeforeUpdate, OneToMany,} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {IDiffNetLocation} from "./diff-net-location.interface";
import {CONFIG} from "../config/main-config";
import {IsDefined, IsEmail, IsEmpty, IsNotEmpty, MaxLength} from "class-validator";
import {IsUnique} from "../validator/is-unique";
import {__} from "../util/__.util";
import {DiffNetSet} from "./diff-net-set.model";
import {IBackFields} from "./diff-nets-set.model";

@Entity({
  name: 'DICT_SETS_UI_LOCATIONS',
  synchronize: false,
  database: CONFIG.secondSchema,
})
export class DiffNetLocation extends _BaseEntity implements IDiffNetLocation {

  constructor(newJob: IDiffNetLocation) {
    super();
    Object.assign(this, newJob)
  }

  getSeqNameAddress() {
    return CONFIG.secondSchema + '.DICT_SETS_UI_LOCATIONS_SEQ'
  }

  getSeqName() {
    return 'DICT_SETS_UI_LOCATIONS_SEQ'
  }

  @PrimaryColumn({name: 'ID'})
  id: number;

  @IsUnique({message: __.constructErrorNotUniqueMessage('Название')})
  @IsNotEmpty({message: __.constructErrorMessage('Название')})
  @MaxLength(15, {message: __.constructErrorMaxLengthMessage('Название', 15)})
  @Column({name: 'CODE', length: 15, unique: true})
  code: string;

  @MaxLength(70, {message: __.constructErrorMaxLengthMessage('Описание', 70)})
  @Column({name: 'NAME', length: 70})
  name: string;

  @OneToMany(() => DiffNetSet, dnS => dnS.buyer)
  dnf: IBackFields[];
}

