import {Entity, Column, PrimaryColumn, BeforeInsert} from "typeorm";
import {IJob} from "./_job.interface";
import {_BaseEntity} from "../_base-entity";

@Entity({
  name: 'to_drop_test_v',
  synchronize: true,
  //database: 'EDI_GUI_SBR'
})
export class Job extends _BaseEntity implements IJob {
  repo = Job.getRepository();

  constructor(newJob: IJob) {
    super();
    Object.assign(this, newJob)
  }
  @PrimaryColumn()
  id: number;

  @Column()
  JOB_TITLE: string;

  @Column()
  MIN_SALARY: number;

  @Column()
  MAX_SALARY: string;

  @Column({nullable: true, type: 'number', width: 1})
  editable: boolean;

}


