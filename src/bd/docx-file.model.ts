import {
  Table, Column, Model, PrimaryKey, Unique, AutoIncrement, HasMany, HasOne,
  DefaultScope, Is, DataType, Default, NotEmpty
} from 'sequelize-typescript';
import {IDocxFile} from "./docx-file.interface";



@Table({
  tableName: 'docx-file',
  timestamps: true
})
export default class DocxFile extends Model<DocxFile> implements IDocxFile {

  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column id: number;

  @Column({type: DataType.UUID}) uuid;
  @Column email: string;
  @Column payed: boolean;

}
