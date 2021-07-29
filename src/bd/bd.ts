import {Sequelize} from 'sequelize-typescript';
import DocxFile from "./docx-file.model";
//import './bd2'

export const DB = new Sequelize({
  database: '2',
  dialect: 'sqlite',
  storage: './src/bd/2.db',
  username: '1',
  password: '1',
  port: 5432,
  define: {
    timestamps: true,
    freezeTableName: true
  },
  operatorsAliases: false,
});

DB.addModels([DocxFile]);

DocxFile.sync();
