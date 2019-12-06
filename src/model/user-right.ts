import {Entity, Column, PrimaryColumn, BeforeInsert, ManyToOne} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {User} from "./user";
import {IUserRight} from "./user-right.interface";
import {BooleanOracleTransformer} from "../transformer/boolean-oracle.transformer";

@Entity({
  name: 'a_user_right',
  synchronize: true,
})
export class UserRight extends _BaseEntity implements IUserRight {

  constructor(newUserRight: IUserRight) {
    super();
    if(newUserRight) Object.assign(this, newUserRight)
  }

  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column({nullable: true, type: 'number', width: 1, default: 0, transformer: new BooleanOracleTransformer()})
  editable: boolean;

  @ManyToOne(() => User, user => user.rights)
  user: User;
}


