import {Entity, Column, PrimaryColumn, BeforeInsert, OneToMany} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {UserRight} from "./user-right";
import {IUser} from "./user.interface";
import {BooleanOracleTransformer} from "../transformer/boolean-oracle-transformer";

@Entity({
  name: 'a_user',
  synchronize: true,
})
export class User extends _BaseEntity implements IUser {

  constructor(newUser: IUser) {
    super();
    if(newUser) Object.assign(this, newUser)
  }

  @PrimaryColumn()
  id: number;

  @Column()
  login: string;

  @Column({type: 'varchar', length: 60})
  password: string;

  @OneToMany(
    () => UserRight,
    userRight => userRight.user,
    {cascade: true,}
  )
  rights: UserRight[];

  @Column({nullable: true, type: 'number', width: 1, transformer: new BooleanOracleTransformer()})
  admin: boolean;

}


