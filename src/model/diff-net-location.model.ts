import {Entity, Column, PrimaryColumn,} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {IDiffNetLocation} from "./diff-net-location.interface";
import {CONFIG} from "../config/main-config";

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

  @Column({name: 'CODE', length: 15, unique: true})
  code: string;

  @Column({name: 'NAME', length: 70})
  name: string;


}


