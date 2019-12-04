import {Entity, Column, PrimaryColumn} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {IDictUserRight} from "./dict-user-right.interface";

@Entity({
  name: 'a_dict_user_right',
  synchronize: true,
})
export class DictUserRight extends _BaseEntity implements IDictUserRight {

  constructor(newDictUserRight: IDictUserRight) {
    super();
    if(newDictUserRight) Object.assign(this, newDictUserRight)
  }

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  code: string;

}


