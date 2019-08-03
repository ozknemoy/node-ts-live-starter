import {
  Table, Column, Model, PrimaryKey, Unique, AutoIncrement,
} from 'sequelize-typescript';



@Table({
  modelName: 'docx-file'
})
export default class DocxFile extends Model<DocxFile> {

  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column id: number;

  @Column({unique: true}) hash: string;
  @Column name: string;
  @Column email: string;
  @Column payed: boolean;
  @Column parsed: number;
  @Column deleted: boolean;
  @Column lastEdit: number;

}