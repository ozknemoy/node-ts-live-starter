import DocxFile from "../bd/docx-file.model";
import * as moment from "moment";
import {Sequelize} from "sequelize-typescript";
import {IDocxFile} from "../bd/docx-file.interface";
import {join} from "path";
import {__, FILE_DIRECTORY, WORKING_DIRECTORY} from "../algo/helpers";
import {FS} from "../main";
import {logger} from "./winston-logger";


const CronJob = require('cron').CronJob;



//https://crontab.guru/ sqlite 2019-07-14T14:10:49.356Z
FS.readFileAsync(join(WORKING_DIRECTORY, 'test.js')).then(d=> {
  console.log('44444444',d);
});

export class Cron {
  constructor() {
    this.initDelitingOldFiles();
  }

  initDelitingOldFiles() {
    new CronJob('15,30,45,0 * * * * *', async () => {
      console.log('You will see this message every second', new Date());
      const to = moment()
        .subtract(3, 'day')
        .format();
      const filesNeededDelete = await DocxFile.findAll({where: {
          deleted: false,
          updatedAt:{[Sequelize.Op.lt]: to}
        }});
      if(__.isFilledArray(filesNeededDelete)) {
        this.deleteFiles(filesNeededDelete);
        DocxFile.bulkSave
        console.log(to,filesNeededDelete.map(d => d.id));

      }
    }, null, true);
  }

  deleteFiles(files: IDocxFile[]) {
    return Promise.all(
      files.map(file => FS.unlinkAsync(join(FILE_DIRECTORY, file.hash)))
    ).then(
      success => {logger.info('Крон успешно сработал и удалил старые файлы')},
      err => {logger.error('Крон упал на удалении ' + err.toString())}
    )
  }
}
