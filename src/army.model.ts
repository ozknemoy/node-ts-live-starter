import {
  Table, Column, Model, PrimaryKey, Unique, AutoIncrement, ForeignKey, BelongsTo,
  NotEmpty
} from 'sequelize-typescript';

@Table({
  tableName: 'army'
})
export default class Army extends Model<Army> {

  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column id: number;

  @Column personnelId: number;
  @Column reserveCategory: string;
  @Column rank: string;
  @Column profile: string;
  @Column code: string;
  @Column healthCategory: string;
  @Column commissariatName: string;
  @Column militaryAccount: string;
  @Column militaryAccountSpecial: string;
  @Column checkMilitaryAccount: string;


}
