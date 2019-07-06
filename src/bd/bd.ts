import {Sequelize} from 'sequelize-typescript';
import DocxFile from "./docx-file.model";

export const docxParserDB = new Sequelize({
  database: 'docxparser',
  dialect: 'postgres',
  username: 'postgres',
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

DocxFile.sync({force: true});
