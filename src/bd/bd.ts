import {Sequelize} from 'sequelize-typescript';
import DocxFile from "./docx-file.model";
import {isDev} from "../algo/helpers";

console.log('isDev',isDev);
export const docxParserDB = new Sequelize({
  database: '2',
  dialect: 'sqlite',
  storage: isDev ? 'C:/sqlite/2.db' : './.data/sqlite.db',
  username: '1',
  password: '1',
  port: 5432,
  define: {
    timestamps: true,
    // prevent sequelize from pluralizing table names
    freezeTableName: true
  },
  operatorsAliases: false,
  // storage: ':memory:',
});

docxParserDB.addModels([DocxFile]);

DocxFile.sync(/*{force: true}*/);
