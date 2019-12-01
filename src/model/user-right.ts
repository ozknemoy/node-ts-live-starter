import {Entity, Column, PrimaryColumn, BeforeInsert, ManyToOne} from "typeorm";
import {_BaseEntity} from "../_base-entity";
import {User} from "./user";
import {IUserRight} from "./user-right.interface";

@Entity({
  name: 'a_user_right',
  synchronize: true,
})
export class UserRight extends _BaseEntity implements IUserRight {
  //repo = UserRight.getRepository();

  constructor(newUserRight: IUserRight) {
    super();
    if(newUserRight) Object.assign(this, newUserRight)
  }

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true, type: 'number', width: 1, default: 0})
  editable: boolean;

  @ManyToOne(() => User, user => user.rights)
  user: User;
}


