import {Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity} from "typeorm";
import {IJob} from "./_job.interface";
import {_BaseEntity} from "../_base-entity";
import {IDiffNetLocation} from "./diff-net-location.interface";
import {__} from "../globals";

@Entity({
  name: 'DICT_SETS_UI_LOCATIONS',
  synchronize: false,
  database: 'EDI_GUI_SBR'
})
export class DiffNetLocation extends _BaseEntity implements IDiffNetLocation {
  repo = DiffNetLocation.getRepository();

  constructor(newJob: IDiffNetLocation) {
    super();
    Object.assign(this, newJob)
  }
  @PrimaryColumn({name: 'ID'})
  id: number;

  @Column({name: 'CODE', length: 15, unique: true})
  code: string;

  @Column({name: 'NAME', length: 70})
  name: string;

  //@BeforeInsert()


}


