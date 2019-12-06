import {Entity, Column, PrimaryColumn, BeforeInsert, OneToMany, JoinColumn} from "typeorm";
import {_BaseEntity} from "./_base-entity";
import {ICompany} from "./company.interface";
import {DiffNetSet} from "./diff-net-set.model";
import {IBackFields} from "./diff-nets-set.model";

@Entity({
  name: 'COMPANYS',
  synchronize: false,
})
export class Company extends _BaseEntity implements ICompany {


  @PrimaryColumn({name: 'COMPANY_ID'})
  id: number;

  @Column({name: 'COMPANY_NAME'})
  name: string;

  @OneToMany(() => DiffNetSet, dnS => dnS.seller)
  sellerDNF: IBackFields[];

  @OneToMany(() => DiffNetSet, dnS => dnS.buyer)
  buyerDNF: IBackFields[];

}


