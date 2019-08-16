import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {IJob} from "./_job.interface";

@Entity()
export class Job extends BaseEntity implements IJob {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  JOB_TITLE: string;

  @Column()
  MIN_SALARY: number;

  @Column()
  MAX_SALARY: number;

  @Column({nullable: true, type: 'number', width: 1})
  editable: boolean;

}


