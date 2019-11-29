import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Connection} from "typeorm/connection/Connection";
import {connection, startDb} from "./db";
import {DiffNetsService} from "./diff-nets";
import {Job} from "./model/_job.model";
import {DiffNetLocation} from "./model/diff-net-location.model";
const fs = require('fs');
const path = require('path');

//let selectDiffNetsSql = fs.readFileSync(path.resolve(__dirname, 'select-diff-nets.sql'), 'utf8');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


async function doS() {
  //await Job.clear();
  const allUsers = await Job.find(/*{where: {JOB_TITLE: 'Timber'}}*/);
  //await Job.remove(allUsers);
  //const timber = await Job.findOne({ JOB_TITLE: '123'});
  console.log('allUsers', allUsers.length);
  const one = await Job.findById<Job>(1);
  //const timber = await Job.findOne({ id: 1});
  console.log('one', one.id);

  /*const newJob: IJob = {
    JOB_TITLE:'5',
    MIN_SALARY: 10,
    MAX_SALARY: 'кену',
    editable: true,
  };


  const _newJob = new Job(newJob);
  await Job.save(_newJob);*/
  DiffNetLocation.save(new DiffNetLocation({
    code: 'test' + Math.floor(Math.random()*1111111),
    name: 'test',
  }))
/*Job.save(new Job({
  id: 1,
  JOB_TITLE:'7777777777',
  MIN_SALARY: 111,
  MAX_SALARY: 222,
  editable: true,
}))*/
  //DiffNetsService.getDN()

}
startDb().then(_connection => {
  doS();
}).catch(error => console.log(error));