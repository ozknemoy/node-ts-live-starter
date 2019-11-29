import {Entity, Column, PrimaryColumn, BeforeInsert, OneToMany} from "typeorm";
import {_BaseEntity} from "../_base-entity";
import {UserRight} from "./user-right";
import {IUser} from "./user.interface";

@Entity({
  name: 'a_user',
  synchronize: true,
})
export class User extends _BaseEntity implements IUser {
  repo = User.getRepository();

  constructor(newUser: IUser) {
    super();
    if(newUser) Object.assign(this, newUser)
  }

  @PrimaryColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: number;

  @OneToMany(() => UserRight, userRight => userRight.user)
  rights: UserRight[];

  @Column({nullable: true, type: 'number', width: 1})
  admin: boolean;

}


